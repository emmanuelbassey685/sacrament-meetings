import Link from 'next/link';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <Link href="/meetings" className="text-sm underline">
          ← Back to meetings
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">Create a Meeting</h1>
        <p className="mt-2 text-[var(--muted)]">
          Enter the details for the sacrament meeting program.
        </p>
      </div>

      <MeetingForm />
    </main>
  );
}