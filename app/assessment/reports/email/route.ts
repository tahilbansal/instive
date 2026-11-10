import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { reportPdf } from '@/lib/assessment/pdf';
import { ReportRecord, connect, allow, clientKey, digest, fail, readBody, validIdentity } from '@/lib/assessment/storage';
const nodemailer = require('nodemailer');
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  let body;
  try { body = await readBody(req,2000); if (!validIdentity(body) || body.consent !== true || typeof body.email !== 'string' || body.email.length > 254 || !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9.-]*[A-Z0-9])?\.[A-Z]{2,}$/i.test(body.email)) return fail(400,'Enter a valid email and confirm delivery'); } catch { return fail(400,'Invalid email request'); }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return fail(503,'Email delivery is not configured. Download the PDF instead.');
  try {
    await connect();
    const record = await ReportRecord.findOne({_id:body.id,tokenHash:digest(body.token)});
    if (!record) return fail(404,'Report not found');
    if (!await allow('mail-ip:'+clientKey(req),20) || !await allow('mail-address:'+body.email.toLowerCase(),3)) return fail(429,'Email limit reached. Please try later.');
    const reserved = await ReportRecord.findOneAndUpdate({_id:body.id,emailRequests:{$lt:3}},{$inc:{emailRequests:1},$set:{emailAddress:body.email.toLowerCase(),emailStatus:'sending'}},{new:true});
    if (!reserved) return fail(429,'This report has reached its email limit. Download the PDF instead.');
    try {
      const font = await readFile(path.join(process.cwd(),'public/fonts/NotoSans-Regular.ttf'));
      const pdf = await reportPdf(record.report.text,font);
      const port = Number(process.env.SMTP_PORT || 465);
      const transport = nodemailer.createTransport({host:process.env.SMTP_HOST||'smtp.gmail.com',port,secure:port===465,requireTLS:true,disableFileAccess:true,disableUrlAccess:true,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},connectionTimeout:8000,socketTimeout:15000});
      await transport.sendMail({from:process.env.SMTP_USER,to:{address:body.email,name:''},subject:'Your Instive operations assessment',text:'Your requested operations assessment is attached as a PDF. It includes your answers, scenario assumptions, and planning estimates. Capacity value is not guaranteed cash savings.\n\nInstive AI\ncontact@instiveai.com',attachments:[{filename:'instive-operations-assessment.pdf',content:Buffer.from(pdf),contentType:'application/pdf'}]});
      await ReportRecord.updateOne({_id:body.id},{$set:{emailStatus:'sent',emailedAt:new Date()}});
      return NextResponse.json({ok:true});
    } catch { await ReportRecord.updateOne({_id:body.id},{$set:{emailStatus:'failed'}}); return fail(502,'Email could not be sent. Try again or download the PDF.'); }
  } catch { return fail(503,'Email service unavailable'); }
}
