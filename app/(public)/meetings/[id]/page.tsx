import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { fetchMeeting } from '@/lib/meetings-api';
interface MeetingPageProps { params: Promise<{ id: string }> }
export default async function MeetingPage({ params }: MeetingPageProps) { const { id } = await params; const numericId = Number(id); if (!Number.isInteger(numericId) || numericId < 1) notFound(); const meeting = await fetchMeeting(id); if (!meeting) notFound(); return <main className="mx-auto max-w-3xl py-8 sm:py-12"><div className="no-print mb-5 flex items-center justify-between"><Link href="/meetings" className="rounded-full px-3 py-2 text-sm font-medium text-[var(--green)] hover:bg-[var(--sage)]">← All meetings</Link><PrintButton/></div><MeetingDetail meeting={meeting}/></main>; }
