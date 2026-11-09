'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function NavLinks() {
 const pathname = usePathname();
 const links = [{ href: '/meetings', label: 'All meetings' }, { href: '/meetings/current', label: 'This Sunday' }];
 return <nav aria-label="Meeting navigation" className="flex flex-wrap gap-2 border-b border-[var(--line)] py-4">{links.map(({ href, label }) => { const active = pathname === href || (href === '/meetings' && pathname.startsWith('/meetings/') && pathname !== '/meetings/current'); return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? 'bg-[var(--green)] text-white' : 'text-[var(--muted)] hover:bg-[var(--sage)] hover:text-[var(--ink)]'}`}>{label}</Link>; })}</nav>;
}
