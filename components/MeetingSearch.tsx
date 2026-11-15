'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (term.trim()) params.set('query', term.trim().slice(0, 100));
    else params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return <label className="my-6 block"><span className="sr-only">Search meetings</span><input type="search" aria-label="Search meetings" placeholder="Search by speaker, leader, or meeting type…" defaultValue={searchParams.get('query') ?? ''} onChange={(event) => handleSearch(event.target.value)} className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 sm:max-w-lg" /></label>;
}
