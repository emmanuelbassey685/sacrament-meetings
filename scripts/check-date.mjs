import { neon } from '@neondatabase/serverless';

const sql = neon(
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? ''
);

const rows = await sql`
  SELECT id, date, presiding
  FROM public.meetings
  WHERE date = '2026-12-13'
`;

console.log(rows);