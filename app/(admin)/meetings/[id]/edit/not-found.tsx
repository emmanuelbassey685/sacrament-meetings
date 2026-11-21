import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">
        Meeting Not Found
      </h1>

      <p className="mt-4 text-[var(--muted)]">
        The meeting you are trying to edit does not exist or may have been removed.
      </p>

      <Link
        href="/meetings"
        className="mt-8 inline-block rounded-full bg-[var(--ink)] px-5 py-3 font-medium text-white"
      >
        Return to meetings
      </Link>
    </main>
  );
}