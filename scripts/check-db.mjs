import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '');

const rows = await sql`
  SELECT
    id,
    date,
    meeting_type AS "meetingType",
    presiding,
    conducting,
    opening_hymn AS "openingHymn",
    sacrament_hymn AS "sacramentHymn",
    speakers,
    closing_hymn AS "closingHymn"
  FROM public.meetings
  WHERE id = 26
`;

console.log(JSON.stringify(rows, null, 2));
