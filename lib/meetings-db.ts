import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '');
const ITEMS_PER_PAGE = 5;

function queryPattern(query: string): string {
  return `%${query.trim().slice(0, 100).replace(/[\\%_]/g, '\\$&')}%`;
}

export async function getMeetings(query = '', currentPage = 1): Promise<SacramentMeeting[]> {
  const page = Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const pattern = queryPattern(query);
  const rows = query.trim()
    ? await sql`SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type AS "meetingType", presiding, conducting, announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer", ward_business AS "wardBusiness", stake_business AS "stakeBusiness", sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer" FROM meetings WHERE presiding ILIKE ${pattern} OR conducting ILIKE ${pattern} OR meeting_type ILIKE ${pattern} OR speakers::text ILIKE ${pattern} ORDER BY date DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`
    : await sql`SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type AS "meetingType", presiding, conducting, announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer", ward_business AS "wardBusiness", stake_business AS "stakeBusiness", sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer" FROM meetings ORDER BY date DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ''): Promise<number> {
  const pattern = queryPattern(query);
  const rows = query.trim()
    ? await sql`SELECT COUNT(*)::int AS count FROM meetings WHERE presiding ILIKE ${pattern} OR conducting ILIKE ${pattern} OR meeting_type ILIKE ${pattern} OR speakers::text ILIKE ${pattern}`
    : await sql`SELECT COUNT(*)::int AS count FROM meetings`;
  return Math.ceil(Number(rows[0]?.count ?? 0) / ITEMS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type AS "meetingType", presiding, conducting, announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer", ward_business AS "wardBusiness", stake_business AS "stakeBusiness", sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer" FROM meetings WHERE id = ${id}`;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE date = ${date}
    ORDER BY date DESC
  `;

  return rows as unknown as SacramentMeeting[];
}

export async function addMeeting(_data: Omit<SacramentMeeting, 'id'>): Promise<SacramentMeeting> { throw new Error('addMeeting will be implemented in Week 04.'); }
export async function updateMeeting(_id: number, _updates: Partial<SacramentMeeting>): Promise<SacramentMeeting | null> { throw new Error('updateMeeting will be implemented in Week 04.'); }
export async function deleteMeeting(_id: number): Promise<boolean> { throw new Error('deleteMeeting will be implemented in Week 04.'); }
