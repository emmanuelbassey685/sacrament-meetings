import Link from 'next/link';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <Link href="/meetings" className="text-sm underline">
          Back to meetings
        </Link>

        <h1 className="mt-6 text-3xl font-bold">
          Schedule a Meeting
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Enter the details for the upcoming sacrament meeting.
        </p>

      </div>

      <MeetingForm />
    </main>
  );
}
