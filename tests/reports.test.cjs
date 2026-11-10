const { test } = require('node:test');
const assert = require('node:assert/strict');
const { NextRequest } = require('next/server');
const load = require('./load-ts.cjs');
const fixture = require('./report-fixture.cjs');
const { buildReport, STORAGE_NOTICE } = load('lib/assessment/report.ts');
const realStorage = load('lib/assessment/storage.ts');
const request = (body, route='/assessment/reports', cookie) => new NextRequest('https://instiveai.com'+route,{method:'POST',headers:{origin:'https://instiveai.com','content-type':'application/json',...(cookie?{cookie}:{})},body:JSON.stringify(body)});
test('canonical snapshot includes all filled questions, assumptions and server-calculated results',()=>{ const f=fixture(); f.results=[{value:9999999}]; f.answers.otherRole='Hidden stale answer'; const report=buildReport(f); assert.equal(report.results[1].value,11289.6); assert.ok(report.questions.some(q=>q.question==='Your name' && q.answer==='Alex Rivera')); assert.match(report.text,/30 USD\/hour \(illustrative assumption/); assert.equal(report.answers.otherRole,undefined); assert.equal(report.answers.hours,undefined); assert.ok(!report.text.includes('Hidden stale answer')); });
test('snapshot rejects unknown workflows, incomplete answers and malformed assumptions',()=>{for(const mutate of [f=>f.answers.workflow='__proto__',f=>f.answers.systems=[],f=>f.assumptions[0].suitable=[],f=>f.answers.detail='',f=>f.selected=7]){const f=fixture();mutate(f);assert.throws(()=>buildReport(f));}});
test('admin session is signed, expires, rejects tampering, and fails closed without configuration',()=>{
  const original=process.env.ASSESSMENT_ADMIN_PASSWORD; process.env.ASSESSMENT_ADMIN_PASSWORD='test1234';
  try { assert.equal(realStorage.checkPassword('bad'),false);assert.equal(realStorage.checkPassword(process.env.ASSESSMENT_ADMIN_PASSWORD),true);const token=realStorage.sessionToken();const req=new NextRequest('https://instiveai.com/admin/assessments/data',{headers:{cookie:'instive_assessment_admin='+token}});assert.equal(realStorage.isAdmin(req),true);const bad=new NextRequest(req.url,{headers:{cookie:'instive_assessment_admin=1.'+token.split('.')[1]}});assert.equal(realStorage.isAdmin(bad),false);delete process.env.ASSESSMENT_ADMIN_PASSWORD;assert.equal(realStorage.isAdmin(req),false); } finally { if(original)process.env.ASSESSMENT_ADMIN_PASSWORD=original;else delete process.env.ASSESSMENT_ADMIN_PASSWORD; }
});
test('saving creates once, updates by revision, checks ownership, and reports DB failures',async()=>{
  let row=null,created=0,offline=false;
  const db={findById:()=>({select:async()=>row}),create:async data=>{row=data;created++;},updateOne:async(filter,update)=>{if(row.revision<filter.revision.$lt)Object.assign(row,update.$set);}};
  const storage={...realStorage,ReportRecord:db,connect:async()=>{if(offline)throw Error();},allow:async()=>true};
  const {POST}=load('app/assessment/reports/route.ts',{'@/lib/assessment/storage':storage});
  const f={...fixture(),storageNotice:STORAGE_NOTICE};assert.equal((await POST(request(f))).status,200);assert.equal(created,1);assert.equal(row.report.results[1].value,11289.6);
  assert.equal((await POST(request({...f,revision:2}))).status,200);assert.equal(row.revision,2);await POST(request(f));assert.equal(row.revision,2);assert.equal(created,1);
  assert.equal((await POST(request({...f,token:'33333333-3333-4333-8333-333333333333'}))).status,403);
  assert.equal((await POST(request({...f,storageNotice:''}))).status,400);offline=true;assert.equal((await POST(request(f))).status,503);
});
test('admin read routes deny anonymous access before database queries',async()=>{let touched=false;const {GET}=load('app/admin/assessments/data/route.ts',{'@/lib/assessment/storage':{...realStorage,isAdmin:()=>false,connect:async()=>{touched=true;}}});assert.equal((await GET(new NextRequest('https://instiveai.com/admin/assessments/data'))).status,401);assert.equal(touched,false);});
test('email requires ownership and consent, attaches a PDF, and records failures honestly',async()=>{
  const env={user:process.env.SMTP_USER,pass:process.env.SMTP_PASS};process.env.SMTP_USER='mock@example.com';process.env.SMTP_PASS='mock';
  let owner=true, sent, status, failMail=false;
  const record={report:buildReport(fixture())};
  const db={findOne:async()=>owner?record:null,findOneAndUpdate:async()=>record,updateOne:async(_,u)=>{status=u.$set.emailStatus;}};
  const {POST}=load('app/assessment/reports/email/route.ts',{'@/lib/assessment/storage':{...realStorage,ReportRecord:db,connect:async()=>{},allow:async()=>true},'@/lib/assessment/pdf':{reportPdf:async()=>new Uint8Array([37,80,68,70])},nodemailer:{createTransport:()=>({sendMail:async message=>{if(failMail)throw Error();sent=message;}})}});
  try { const f={...fixture(),email:'person@example.com',consent:true}; const req=()=>request({id:f.id,token:f.token,email:f.email,consent:f.consent},'/assessment/reports/email');
    f.consent=false;assert.equal((await POST(req())).status,400);f.consent=true;owner=false;assert.equal((await POST(req())).status,404);owner=true;assert.equal((await POST(req())).status,200);assert.equal(sent.attachments[0].contentType,'application/pdf');assert.equal(status,'sent');failMail=true;assert.equal((await POST(req())).status,502);assert.equal(status,'failed');
  } finally {for(const [key,v] of [['SMTP_USER',env.user],['SMTP_PASS',env.pass]])if(v)process.env[key]=v;else delete process.env[key];}
});

test('admin password minimum is eight characters',()=>{
 const original=process.env.ASSESSMENT_ADMIN_PASSWORD;
 try {
  process.env.ASSESSMENT_ADMIN_PASSWORD='1234567';assert.equal(realStorage.adminConfigured(),false);
  process.env.ASSESSMENT_ADMIN_PASSWORD='test1234';assert.equal(realStorage.adminConfigured(),true);assert.equal(realStorage.checkPassword('test1234'),true);
 } finally {if(original)process.env.ASSESSMENT_ADMIN_PASSWORD=original;else delete process.env.ASSESSMENT_ADMIN_PASSWORD;}
});
