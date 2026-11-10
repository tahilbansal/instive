'use client';
import { useEffect, useRef, useState } from 'react';
import type { AssessmentReport } from '@/lib/assessment/report';
import '../../assessment/assessment.css';
import './admin.css';
type Row = { _id: string; generatedAt: string; updatedAt: string; emailAddress?: string; emailStatus?: string; report: AssessmentReport; notice?: string };
export default function ReportsAdmin() {
  const [rows,setRows] = useState<Row[]>([]), [total,setTotal] = useState(0), [page,setPage] = useState(1), [query,setQuery] = useState('');
  const [authenticated,setAuthenticated] = useState(false), [loading,setLoading] = useState(true), [error,setError] = useState(''), [detail,setDetail] = useState<Row|null>(null), [busy,setBusy] = useState(false);
  const request = useRef(0);
  async function load(p = 1, q = query) {
    const current = ++request.current;
    setLoading(true); setError('');
    try {
      const response = await fetch(`/admin/assessments/data?page=${p}&q=${encodeURIComponent(q)}`,{cache:'no-store'});
      if (current !== request.current) return;
      if (response.status === 401) { setAuthenticated(false); setRows([]); setDetail(null); return; }
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Unable to load reports');
      setAuthenticated(true); setRows(data.reports); setTotal(data.total); setPage(data.page);
    } catch (e) { if (current === request.current) setError((e as Error).message); }
    finally { if (current === request.current) setLoading(false); }
  }
  useEffect(() => { void load(1,''); return () => { request.current++; }; }, []);
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; setBusy(true); setError('');
    try { const res = await fetch('/admin/assessments/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:new FormData(form).get('password')})}); const data = await res.json(); if (!res.ok) throw new Error(data.error); form.reset(); await load(1,''); }
    catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  async function open(id: string) {
    setBusy(true); setError('');
    try { const res = await fetch(`/admin/assessments/data?id=${id}`,{cache:'no-store'}); if (res.status === 401) { setAuthenticated(false); setRows([]); setDetail(null); throw new Error('Session expired. Please sign in again.'); } const data = await res.json(); if (!res.ok) throw new Error(data.error); setDetail(data.report); window.scrollTo({top:0}); }
    catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  async function download(row: Row) {
    setBusy(true);
    try { const { reportPdf } = await import('@/lib/assessment/pdf'); const response = await fetch('/fonts/NotoSans-Regular.ttf'); if (!response.ok) throw new Error(); const bytes = await reportPdf(row.report.text,new Uint8Array(await response.arrayBuffer())); const url = URL.createObjectURL(new Blob([bytes as BlobPart],{type:'application/pdf'})); const a = document.createElement('a'); a.href=url;a.download=`instive-assessment-${row._id}.pdf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
    catch { setError('Unable to generate PDF. Please retry.'); } finally { setBusy(false); }
  }
  return <main className="assessment admin-assessments"><header className="as-nav"><a href="/" className="as-brand"><img className="as-logo-dark" src="/logo/Instive_light_logo_dark_tp_crop.png" alt="Instive" width={192} height={24}/><img className="as-logo-light" src="/logo/Instive_light_logo_tp_crop.png" alt="" aria-hidden="true" width={192} height={24}/></a><span className="as-nav-label">ASSESSMENT REPORTS</span><a href="/assessment">Open assessment ↗</a></header><section className="as-results">
    <div className="result-heading"><div><span className="eyebrow">INTERNAL WORKSPACE</span><h1>Operations assessments</h1><p>Generated reports, complete answers, and delivery status.</p></div>{authenticated && <button className="secondary" onClick={async()=>{const res=await fetch('/admin/assessments/session',{method:'DELETE'});if(res.ok){request.current++;setAuthenticated(false);setRows([]);setDetail(null);}else setError('Unable to sign out. Please retry.');}}>Sign out</button>}</div>
    {error && <p className="error" role="alert">{error}</p>}
    {!authenticated ? <form className="panel admin-login" onSubmit={login}><h2>Sign in to view reports</h2><p>Only authorized Instive team members can view submitted answers.</p><label className="field">Admin password<input name="password" type="password" required maxLength={256} autoComplete="current-password"/></label><button className="primary" disabled={busy || loading}>{busy?'Signing in…':'Sign in'}</button>{loading && <p role="status">Checking session…</p>}</form> : detail ? <><div className="report-actions"><button onClick={()=>setDetail(null)}>← All reports</button><button disabled={busy} onClick={()=>download(detail)}>Download PDF</button></div><article className="panel"><span className="eyebrow">{detail._id}</span><h2>{detail.report.answers.name || 'Anonymous respondent'}</h2><p>Generated {new Date(detail.generatedAt).toLocaleString()} · Updated {new Date(detail.updatedAt).toLocaleString()}</p><p>Email: {detail.emailAddress || 'Not requested'} · Delivery: {detail.emailStatus || 'Not requested'}</p><h3>Every question and answer</h3><dl className="answer-list">{detail.report.questions.map(q=><div key={q.question}><dt>{q.question}</dt><dd>{q.answer}</dd></div>)}</dl></article><article className="panel"><h2>Complete generated report</h2><pre className="report-text">{detail.report.text}</pre><p className="micro">Storage notice shown: {detail.notice}</p></article></> : <><form className="admin-search" onSubmit={e=>{e.preventDefault();void load(1);}}><label className="field">Search name, business type, workflow, email, or report ID<input value={query} maxLength={100} onChange={e=>setQuery(e.target.value)} placeholder="Search assessments"/></label><button className="primary" disabled={loading}>Search</button><button className="secondary" type="button" disabled={loading} onClick={()=>load(page)}>Refresh</button></form><p className="micro" role="status">{loading?'Loading reports…':`${total} saved assessments`}</p><div className="admin-table"><table><thead><tr><th>Generated</th><th>Respondent</th><th>Operation</th><th>Bottleneck</th><th>Recovered h/week</th><th>Email status</th><th>Report</th></tr></thead><tbody>{rows.map(row=><tr key={row._id}><td>{new Date(row.generatedAt).toLocaleString()}</td><td>{row.report.answers.name || 'Anonymous'}</td><td>{row.report.answers.industry==='Other'?row.report.answers.otherIndustry:row.report.answers.industry}</td><td>{row.report.answers.workflow}</td><td>{row.report.results[row.report.selected].recovered.toFixed(1)}</td><td>{row.emailStatus || 'Not requested'}</td><td><button className="secondary" disabled={busy} onClick={()=>open(row._id)}>View answers</button></td></tr>)}</tbody></table></div>{!loading && !rows.length && <div className="panel"><h2>No assessments found</h2><p>Reports appear here when visitors generate their results and the database save succeeds.</p></div>}<div className="form-footer"><button className="secondary" disabled={page<=1 || loading} onClick={()=>load(page-1)}>← Previous</button><span>Page {page} of {Math.max(1,Math.ceil(total/25))}</span><button className="secondary" disabled={page*25>=total || loading} onClick={()=>load(page+1)}>Next →</button></div></>}
  </section></main>;
}
