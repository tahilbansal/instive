import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createHash } from 'node:crypto';
const nodemailer = require('nodemailer');
export const runtime = 'nodejs';
const Inquiry = mongoose.models.AssessmentInquiry || mongoose.model('AssessmentInquiry', new mongoose.Schema({ name: String, email: String, company: String, report: String, partnership: Boolean, consentText: String, consentAt: Date, notificationStatus: String, createdAt: { type: Date, default: Date.now } }));
const Limit = mongoose.models.AssessmentLimit || mongoose.model('AssessmentLimit', new mongoose.Schema({ _id: String, count: Number, expiresAt: { type: Date, expires: 0 } }));
const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });
export async function POST(req: NextRequest) {
    if (req.headers.get('origin') !== req.nextUrl.origin)
        return fail(403, 'Invalid origin');
    if (!req.headers.get('content-type')?.includes('application/json'))
        return fail(415, 'JSON required');
    let body;
    try {
        if (Number(req.headers.get('content-length')) > 24000) return fail(413, 'Request too large');
        const reader = req.body?.getReader();
        if (!reader) return fail(400, 'Invalid request');
        const chunks: Uint8Array[] = [];
        let bytes = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            bytes += value.byteLength;
            if (bytes > 24000) { await reader.cancel(); return fail(413, 'Request too large'); }
            chunks.push(value);
        }
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    }
    catch {
        return fail(400, 'Invalid request');
    }
    const validText = (v: unknown, max: number) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
    if (!body || body.website || body.consent !== true || !validText(body.name, 100) || !validText(body.company, 160) || !validText(body.report, 18000) || !validText(body.email, 254) || !/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(body.email))
        return fail(400, 'Valid contact details and consent are required');
    if (!process.env.MONGODB_URI)
        return fail(503, 'Follow-up is currently unavailable');
    try {
        if (mongoose.connection.readyState !== 1)
            await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        // Durable per-email hourly throttle. The bucket stores a digest, never the email.
        const bucket = createHash('sha256').update(body.email.trim().toLowerCase()).digest('hex') + ':' + Math.floor(Date.now() / 3600000);
        const limit = await Limit.findOneAndUpdate({ _id: bucket }, { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(Date.now() + 7200000) } }, { upsert: true, new: true });
        if (limit.count > 3)
            return fail(429, 'Please try again later');
        const doc = await Inquiry.create({ name: body.name.trim(), email: body.email.trim().toLowerCase(), company: body.company.trim(), report: body.report, partnership: body.partnership === true, consentText: 'I agree to send my contact details and assessment to Instive for email follow-up about this request.', consentAt: new Date(), notificationStatus: 'pending' });
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const port = Number(process.env.SMTP_PORT || 465);
                const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.gmail.com', port, secure: port === 465, requireTLS: true, disableFileAccess: true, disableUrlAccess: true, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }, connectionTimeout: 8000, socketTimeout: 10000 });
                await transport.sendMail({ from: process.env.SMTP_USER, to: process.env.NOTIFY_EMAIL || 'contact@instiveai.com', replyTo: doc.email, subject: 'New operations assessment review request', text: `${doc.name}\n${doc.company}\n${doc.email}\nPartnership: ${doc.partnership}\n\nUser-supplied planning report (not independently verified):\n${doc.report}` });
                await Inquiry.updateOne({ _id: doc._id }, { notificationStatus: 'sent' });
            }
            catch {
                await Inquiry.updateOne({ _id: doc._id }, { notificationStatus: 'failed' });
            }
        }
        else
            await Inquiry.updateOne({ _id: doc._id }, { notificationStatus: 'not-configured' });
        return NextResponse.json({ ok: true }, { status: 201 });
    }
    catch {
        return fail(503, 'Unable to save request');
    }
}
