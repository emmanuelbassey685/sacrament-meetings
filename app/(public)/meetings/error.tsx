
'use client';

import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div role="alert">
        <h1 className="text-3xl font-semibold">
          Something went wrong
        </h1>

        <p className="mt-4 text-[var(--muted)]">
          We could not load the sacrament meeting information.
          Please try again.
        </p>

        {error.digest && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            Error reference: {error.digest}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-[var(--ink)] px-5 py-3 font-medium text-white"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-full border border-[var(--line)] px-5 py-3 font-medium"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}
