import type { Metadata } from 'next';
import ReportsAdmin from './ReportsAdmin';
export const metadata: Metadata = { title: 'Assessment reports | Instive', robots: {index:false,follow:false}, alternates: {canonical:'/admin/assessments'} };
export default function Page() { return <ReportsAdmin />; }
