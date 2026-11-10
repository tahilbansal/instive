import { NextRequest, NextResponse } from 'next/server';
import { adminConfigured, checkPassword, connect, allow, clientKey, fail, readBody, sameOrigin, sessionToken, setSession } from '@/lib/assessment/storage';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  if (!adminConfigured()) return fail(503,'Admin access needs ASSESSMENT_ADMIN_PASSWORD (at least 8 characters) configured on the server.');
  let body; try { body = await readBody(req,1000); } catch { return fail(400,'Invalid request'); }
  try {
    await connect();
    if (!await allow('admin-login:'+clientKey(req),10)) return fail(429,'Too many login attempts. Try again later.');
    if (!checkPassword(body.password)) return fail(401,'Incorrect password');
    return setSession(NextResponse.json({ok:true}),sessionToken());
  } catch { return fail(503,'Login service unavailable'); }
}
export async function DELETE(req: NextRequest) { if (!sameOrigin(req)) return fail(403,'Invalid origin'); return setSession(NextResponse.json({ok:true}),''); }
