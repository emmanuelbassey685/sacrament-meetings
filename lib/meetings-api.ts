import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

async function apiUrl(path: string): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  if (!host) throw new Error('The request host is unavailable.');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host}${path}`;
}

export async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const response = await fetch(await apiUrl('/api/meetings'), { cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to load meeting programs.');
  return response.json() as Promise<SacramentMeeting[]>;
}

export async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const response = await fetch(await apiUrl(`/api/meetings/${encodeURIComponent(id)}`), { cache: 'no-store' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unable to load this meeting program.');
  return response.json() as Promise<SacramentMeeting>;
}
