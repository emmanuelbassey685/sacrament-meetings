
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-sm underline"
        >
          Back to meeting
        </Link>

        <h1 className="mt-6 text-3xl font-bold">
          Edit Sacrament Meeting
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Update the details for this sacrament meeting.
        </p>
      </div>

      <MeetingForm meeting={meeting} />
    </main>
  );
}
