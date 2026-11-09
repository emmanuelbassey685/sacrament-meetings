import Link from 'next/link';
export default function Header() {
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date());
  return <header className="border-b border-[var(--line)] bg-white/80"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4"><Link href="/" className="flex items-center gap-3" aria-label="Maple Ridge Ward home"><span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--sage)] text-xl" aria-hidden="true">✦</span><span><span className="block text-sm font-semibold tracking-wide">MAPLE RIDGE WARD</span><span className="text-xs text-[var(--muted)]">Sacrament meeting planner</span></span></Link><p className="text-sm text-[var(--muted)]">{date}</p></div></header>;
}
