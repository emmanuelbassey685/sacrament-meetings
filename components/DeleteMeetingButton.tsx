
'use client';

import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingButton({
  meetingId,
}: {
  meetingId: number;
}) {
  const deleteAction = deleteMeeting.bind(null, meetingId);

  return (
    <form
      action={deleteAction}
      onSubmit={(event) => {
        if (!window.confirm('Are you sure you want to delete this meeting?')) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-red-700 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Delete meeting
      </button>
    </form>
  );
}
