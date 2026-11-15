import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { Suspense } from 'react';

interface MeetingsPageProps { searchParams: Promise<{ query?: string; page?: string }> }

async function MeetingsContent({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = (params.query ?? '').trim().slice(0, 100);
  const requestedPage = Number(params.page);
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage), getMeetingsTotalPages(query),
  ]);

  return <main className="py-10 sm:py-14"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--green)]">The archive</p><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Meeting programs</h1><p className="mt-3 text-[var(--muted)]">Browse this season’s Sunday gatherings.</p></div><MeetingSearch/><div className="grid gap-5 md:grid-cols-2">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting}/>)}</div>{meetings.length === 0 ? <p className="mt-8 text-[var(--muted)]">No meetings match your search.</p> : null}<Pagination totalPages={totalPages}/></main>;
}

export default function MeetingsPage({ searchParams }: MeetingsPageProps) {
  return <Suspense fallback={<main className="py-10" aria-busy="true">Loading meeting programs…</main>}><MeetingsContent searchParams={searchParams}/></Suspense>;
}
