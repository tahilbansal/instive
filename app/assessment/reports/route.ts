import { NextRequest, NextResponse } from 'next/server';
import { buildReport, STORAGE_NOTICE } from '@/lib/assessment/report';
import { ReportRecord, connect, allow, clientKey, digest, fail, readBody, validIdentity } from '@/lib/assessment/storage';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  let body, report;
  try { body = await readBody(req); if (!validIdentity(body) || !Number.isSafeInteger(body.revision) || body.revision < 1 || body.storageNotice !== STORAGE_NOTICE) return fail(400,'Invalid report submission'); report = buildReport(body); } catch { return fail(400,'Please check the assessment answers'); }
  try {
    await connect();
    if (!await allow('save:'+clientKey(req),120)) return fail(429,'Too many requests. Please retry later.');
    const tokenHash = digest(body.token);
    const existing = await ReportRecord.findById(body.id).select('+tokenHash');
    if (existing && existing.tokenHash !== tokenHash) return fail(403,'Invalid report access');
    if (!existing) {
      await ReportRecord.create({ _id:body.id,tokenHash,revision:body.revision,report,notice:STORAGE_NOTICE,generatedAt:new Date(),updatedAt:new Date() });
    } else {
      await ReportRecord.updateOne({ _id:body.id,tokenHash,revision:{$lt:body.revision} },{$set:{revision:body.revision,report,updatedAt:new Date()}});
    }
    return NextResponse.json({ ok:true,id:body.id },{headers:{'Cache-Control':'no-store'}});
  } catch (error: any) { return fail(error?.code === 11000 ? 409 : 503,'Unable to save report. Please retry.'); }
}
