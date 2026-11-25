
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from '@/lib/meetings-db';
import type { MeetingType } from '@/lib/types';

const meetingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid meeting date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().trim().min(1, 'Presiding name is required.'),
  conducting: z.string().trim().min(1, 'Conducting name is required.'),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce.number().int().positive(),
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(1, 'Opening prayer name is required.'),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.string().optional(),
  sacramentHymnNumber: z.coerce.number().int().positive(),
  sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce.number().int().positive(),
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(1, 'Closing prayer name is required.'),
});

export type MeetingFormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

function parseMeeting(formData: FormData) {
  const parsed = meetingSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return {
      success: false as const,
      state: {
        message: 'Please correct the highlighted fields.',
        errors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  const data = parsed.data;

  try {
    const speakers = JSON.parse(data.speakers || '[]');
    const wardBusiness = JSON.parse(data.wardBusiness || '[]');

    if (!Array.isArray(speakers) || !Array.isArray(wardBusiness)) {
      throw new Error('Invalid list data');
    }

    return {
      success: true as const,
      meeting: {
        date: data.date,
        meetingType: data.meetingType as MeetingType,
        presiding: data.presiding,
        conducting: data.conducting,
        announcements: (data.announcements || '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        openingHymn: {
          number: data.openingHymnNumber,
          title: data.openingHymnTitle,
        },
        openingPrayer: data.openingPrayer,
        wardBusiness,
        stakeBusiness: data.stakeBusiness === 'on',
        sacramentHymn: {
          number: data.sacramentHymnNumber,
          title: data.sacramentHymnTitle,
        },
        speakers,
        closingHymn: {
          number: data.closingHymnNumber,
          title: data.closingHymnTitle,
        },
        closingPrayer: data.closingPrayer,
      },
    };
  } catch {
    return {
      success: false as const,
      state: {
        message: 'Speaker or ward business data is invalid.',
      },
    };
  }
}

export async function createMeeting(
  _previousState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const result = parseMeeting(formData);

  if (!result.success) return result.state;

  try {
    await addMeeting(result.meeting);
  } catch (error) {
    console.error('Create meeting failed:', error);
    throw new Error('Unable to create the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _previousState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const result = parseMeeting(formData);

  if (!result.success) return result.state;

  try {
    const updated = await updateMeetingInDb(id, result.meeting);

    if (!updated) {
      return { message: 'The meeting could not be found.' };
    }
  } catch (error) {
    console.error('Update meeting failed:', error);
    throw new Error('Unable to update the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  let deleted: boolean;

  try {
    deleted = await deleteMeetingInDb(id);
  } catch (error) {
    console.error('Delete meeting failed:', error);
    throw new Error('Unable to delete the meeting. Please try again.');
  }

  if (!deleted) {
    throw new Error('Meeting not found.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);

  redirect('/meetings');
}
