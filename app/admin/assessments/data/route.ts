import { NextRequest, NextResponse } from 'next/server';
import { connect, ReportRecord, isAdmin, fail } from '@/lib/assessment/storage';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return fail(401,'Sign in to view assessments');
  try {
    await connect();
    const id = req.nextUrl.searchParams.get('id');
    if (id) { if (!/^[a-f0-9-]{36}$/.test(id)) return fail(400,'Invalid report ID'); const row = await ReportRecord.findById(id).select('-tokenHash').lean(); return row ? NextResponse.json({report:row},{headers:{'Cache-Control':'no-store'}}) : fail(404,'Report not found'); }
    const rawPage = Number(req.nextUrl.searchParams.get('page') || 1); const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? Math.min(rawPage,100000) : 1;
    const q = (req.nextUrl.searchParams.get('q') || '').trim().slice(0,100);
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const query = q ? {$or:['report.answers.name','report.answers.industry','report.answers.otherIndustry','report.answers.workflow','emailAddress','_id'].map(key=>({[key]:{$regex:escaped,$options:'i'}}))} : {};
    const [reports,total] = await Promise.all([ReportRecord.find(query).select('_id generatedAt updatedAt emailAddress emailStatus report.answers.name report.answers.industry report.answers.otherIndustry report.answers.workflow report.results report.selected').sort({generatedAt:-1,_id:-1}).skip((page-1)*25).limit(25).lean(),ReportRecord.countDocuments(query)]);
    return NextResponse.json({reports,total,page},{headers:{'Cache-Control':'no-store'}});
  } catch { return fail(503,'Unable to load assessments'); }
}
