'use client';
export default function PrintButton() { return <button type="button" onClick={() => window.print()} className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold hover:bg-[var(--sage)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green)]">Print program</button>; }
