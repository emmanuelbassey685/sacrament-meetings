'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const createPageURL = (page: number) => { const params = new URLSearchParams(searchParams.toString()); params.set('page', String(page)); return `${pathname}?${params.toString()}`; };
  if (totalPages < 2) return null;
  return <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-6">{currentPage > 1 ? <Link className="font-semibold text-[var(--green)] underline" href={createPageURL(currentPage - 1)}>Previous</Link> : <span className="text-[var(--muted)]">Previous</span>}<span>Page {currentPage} of {totalPages}</span>{currentPage < totalPages ? <Link className="font-semibold text-[var(--green)] underline" href={createPageURL(currentPage + 1)}>Next</Link> : <span className="text-[var(--muted)]">Next</span>}</nav>;
}
