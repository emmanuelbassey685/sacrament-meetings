
import Link from 'next/link';
import { auth } from '@/auth';
import { logout } from '@/app/login/actions';

export default async function Header() {
  const session = await auth();
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(new Date());

  return (
    <header className="border-b border-[var(--line)] bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Maple Ridge Ward home"
        >
          <span className="text-xl" aria-hidden="true">✦</span>
          <span>
            <span className="block text-sm font-semibold tracking-wide">
              MAPLE RIDGE WARD
            </span>
            <span className="text-xs text-[var(--muted)]">
              Sacrament meeting planner
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-[var(--muted)]">{date}</p>

          {session?.user ? (
            <>
              <Link
                href="/meetings/new"
                className="text-sm font-medium underline"
              >
                Schedule meeting
              </Link>

              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-medium underline"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium underline"
            >
              Administrator login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
