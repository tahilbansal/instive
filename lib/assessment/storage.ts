import mongoose from 'mongoose';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
export const ReportRecord = mongoose.models.GeneratedAssessment || mongoose.model('GeneratedAssessment', new mongoose.Schema({
  _id: String, tokenHash: { type: String, select: false }, revision: Number,
  report: mongoose.Schema.Types.Mixed, notice: String, generatedAt: Date, updatedAt: Date,
  emailRequests: { type: Number, default: 0 }, emailAddress: String, emailStatus: String, emailedAt: Date,
}));
const Bucket = mongoose.models.ReportRateLimit || mongoose.model('ReportRateLimit', new mongoose.Schema({ _id: String, count: Number, expiresAt: { type: Date, expires: 0 } }));
export const digest = (text: string) => createHash('sha256').update(text).digest('hex');
export const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function connect() {
  if (!process.env.MONGODB_URI) throw new Error('Database unavailable');
  if (mongoose.connection.readyState !== 1) await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
}
export function sameOrigin(req: NextRequest) { return req.headers.get('origin') === req.nextUrl.origin; }
export async function readBody(req: NextRequest, limit = 24000) {
  if (!sameOrigin(req) || !req.headers.get('content-type')?.includes('application/json')) throw new Error('Invalid request');
  if (Number(req.headers.get('content-length')) > limit) throw new Error('Request too large');
  const reader = req.body?.getReader(); if (!reader) throw new Error('Invalid request');
  const parts: Uint8Array[] = []; let size = 0;
  while (true) { const {done,value} = await reader.read(); if (done) break; size += value.byteLength; if (size > limit) { await reader.cancel(); throw new Error('Request too large'); } parts.push(value); }
  return JSON.parse(Buffer.concat(parts).toString('utf8'));
}
export function clientKey(req: NextRequest) {
  // Vercel sets this header. Self-hosted deployments must provide edge abuse protection.
  return process.env.VERCEL ? req.headers.get('x-vercel-forwarded-for') || 'unknown' : 'local';
}
export async function allow(key: string, max: number) {
  const id = digest(key) + ':' + Math.floor(Date.now()/3600000);
  const row = await Bucket.findOneAndUpdate({ _id:id }, { $inc:{count:1}, $setOnInsert:{expiresAt:new Date(Date.now()+7200000)} }, {upsert:true,new:true});
  return row.count <= max;
}
export const validIdentity = (body: any) => body && /^[a-f0-9-]{36}$/.test(body.id) && /^[a-f0-9-]{36}$/.test(body.token);
const cookieName = 'instive_assessment_admin';
function secret() { const value = process.env.ASSESSMENT_ADMIN_PASSWORD; return value && value.length >= 24 ? value : null; }
export const adminConfigured = () => Boolean(secret());
export const checkPassword = (value: unknown) => typeof value === 'string' && !!secret() && timingSafeEqual(Buffer.from(digest(value)), Buffer.from(digest(secret()!)));
export function sessionToken() { const expires = String(Date.now()+8*3600000); return `${expires}.${createHmac('sha256',secret()!).update(expires).digest('hex')}`; }
export function isAdmin(req: NextRequest) {
  if (!secret()) return false;
  const [expires,signature] = (req.cookies.get(cookieName)?.value || '').split('.');
  if (!expires || !signature || !/^\d+$/.test(expires) || Number(expires) <= Date.now() || !/^[a-f0-9]{64}$/.test(signature)) return false;
  return timingSafeEqual(Buffer.from(signature), Buffer.from(createHmac('sha256',secret()!).update(expires).digest('hex')));
}
export function setSession(res: NextResponse, value: string) { res.cookies.set(cookieName,value,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/admin/assessments',maxAge:value?8*3600:0}); return res; }
