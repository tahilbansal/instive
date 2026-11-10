import type { Metadata } from 'next';
import Assessment from './Assessment';
export const metadata: Metadata = { title: 'Operations Efficiency Assessment', description: 'Find the manual work worth improving. A private, practical operations assessment for logistics teams and consultants.', alternates: { canonical: '/assessment' } };
export default function Page() { return <Assessment />; }
