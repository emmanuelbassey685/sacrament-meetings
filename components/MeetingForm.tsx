
'use client';

import { useActionState } from 'react';
import type { SacramentMeeting } from '@/lib/types';
import type { MeetingFormState } from '@/lib/actions';
import { createMeeting, updateMeeting } from '@/lib/actions';

const initialState: MeetingFormState = { message: '' };

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} className="mt-1 text-sm text-red-700" aria-live="polite">
      {message ?? ''}
    </p>
  );
}

export default function MeetingForm({
  meeting,
}: {
  meeting?: SacramentMeeting;
}) {
  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, pending] = useActionState(action, initialState);
  const errors = state.errors;

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800" aria-live="polite">
          {state.message}
        </p>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Meeting details</h2>

        <div>
          <label htmlFor="date" className="block font-medium">Meeting date</label>
          <input id="date" name="date" type="date" required defaultValue={meeting?.date ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="date-error" />
          <FieldError id="date-error" message={errors?.date?.[0]} />
        </div>

        <div>
          <label htmlFor="meetingType" className="block font-medium">Meeting type</label>
          <select id="meetingType" name="meetingType" required defaultValue={meeting?.meetingType ?? 'regular'} className="mt-1 w-full rounded border p-2" aria-describedby="meetingType-error">
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          <FieldError id="meetingType-error" message={errors?.meetingType?.[0]} />
        </div>

        <div>
          <label htmlFor="presiding" className="block font-medium">Presiding</label>
          <input id="presiding" name="presiding" required defaultValue={meeting?.presiding ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="presiding-error" />
          <FieldError id="presiding-error" message={errors?.presiding?.[0]} />
        </div>

        <div>
          <label htmlFor="conducting" className="block font-medium">Conducting</label>
          <input id="conducting" name="conducting" required defaultValue={meeting?.conducting ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="conducting-error" />
          <FieldError id="conducting-error" message={errors?.conducting?.[0]} />
        </div>

        <div>
          <label htmlFor="announcements" className="block font-medium">Announcements</label>
          <textarea id="announcements" name="announcements" rows={3} defaultValue={meeting?.announcements?.join('\n') ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="announcements-error" />
          <FieldError id="announcements-error" message={errors?.announcements?.[0]} />
          <p className="text-sm text-[var(--muted)]">Enter one announcement per line.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Opening</h2>

        <div>
          <label htmlFor="openingHymnNumber" className="block font-medium">Opening hymn number</label>
          <input id="openingHymnNumber" name="openingHymnNumber" type="number" min="1" required defaultValue={meeting?.openingHymn.number ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="openingHymnNumber-error" />
          <FieldError id="openingHymnNumber-error" message={errors?.openingHymnNumber?.[0]} />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="block font-medium">Opening hymn title</label>
          <input id="openingHymnTitle" name="openingHymnTitle" required defaultValue={meeting?.openingHymn.title ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="openingHymnTitle-error" />
          <FieldError id="openingHymnTitle-error" message={errors?.openingHymnTitle?.[0]} />
        </div>

        <div>
          <label htmlFor="openingPrayer" className="block font-medium">Opening prayer</label>
          <input id="openingPrayer" name="openingPrayer" required defaultValue={meeting?.openingPrayer ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="openingPrayer-error" />
          <FieldError id="openingPrayer-error" message={errors?.openingPrayer?.[0]} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Ward and stake business</h2>

        <div>
          <label htmlFor="wardBusiness" className="block font-medium">Ward business (JSON)</label>
          <textarea id="wardBusiness" name="wardBusiness" rows={3} defaultValue={JSON.stringify(meeting?.wardBusiness ?? [], null, 2)} className="mt-1 w-full rounded border p-2 font-mono text-sm" aria-describedby="wardBusiness-error" />
          <FieldError id="wardBusiness-error" message={errors?.wardBusiness?.[0]} />
          <p className="text-sm text-[var(--muted)]">Enter an array of objects containing a description field.</p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <input
              id="stakeBusiness"
              type="checkbox"
              name="stakeBusiness"
              defaultChecked={meeting?.stakeBusiness ?? false}
              aria-describedby="stakeBusiness-error"
            />
            <label htmlFor="stakeBusiness">Stake business included</label>
          </div>
          <FieldError id="stakeBusiness-error" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sacrament</h2>

        <div>
          <label htmlFor="sacramentHymnNumber" className="block font-medium">Sacrament hymn number</label>
          <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1" required defaultValue={meeting?.sacramentHymn.number ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="sacramentHymnNumber-error" />
          <FieldError id="sacramentHymnNumber-error" message={errors?.sacramentHymnNumber?.[0]} />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="block font-medium">Sacrament hymn title</label>
          <input id="sacramentHymnTitle" name="sacramentHymnTitle" required defaultValue={meeting?.sacramentHymn.title ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="sacramentHymnTitle-error" />
          <FieldError id="sacramentHymnTitle-error" message={errors?.sacramentHymnTitle?.[0]} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Speakers and musical numbers</h2>

        <div>
          <label htmlFor="speakers" className="block font-medium">Speakers (JSON)</label>
          <textarea id="speakers" name="speakers" rows={5} defaultValue={JSON.stringify(meeting?.speakers ?? [], null, 2)} className="mt-1 w-full rounded border p-2 font-mono text-sm" aria-describedby="speakers-error" />
          <FieldError id="speakers-error" message={errors?.speakers?.[0]} />
          <p className="text-sm text-[var(--muted)]">Enter an array of speaker or musical-number objects.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Closing</h2>

        <div>
          <label htmlFor="closingHymnNumber" className="block font-medium">Closing hymn number</label>
          <input id="closingHymnNumber" name="closingHymnNumber" type="number" min="1" required defaultValue={meeting?.closingHymn.number ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="closingHymnNumber-error" />
          <FieldError id="closingHymnNumber-error" message={errors?.closingHymnNumber?.[0]} />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block font-medium">Closing hymn title</label>
          <input id="closingHymnTitle" name="closingHymnTitle" required defaultValue={meeting?.closingHymn.title ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="closingHymnTitle-error" />
          <FieldError id="closingHymnTitle-error" message={errors?.closingHymnTitle?.[0]} />
        </div>

        <div>
          <label htmlFor="closingPrayer" className="block font-medium">Closing prayer</label>
          <input id="closingPrayer" name="closingPrayer" required defaultValue={meeting?.closingPrayer ?? ''} className="mt-1 w-full rounded border p-2" aria-describedby="closingPrayer-error" />
          <FieldError id="closingPrayer-error" message={errors?.closingPrayer?.[0]} />
        </div>
      </section>

      <button type="submit" disabled={pending} className="rounded bg-[var(--ink)] px-5 py-3 font-semibold text-white disabled:opacity-50">
        {pending ? 'Saving meeting...' : meeting ? 'Update meeting' : 'Create meeting'}
      </button>
    </form>
  );
}
