
import { requireAdmin } from '@/lib/auth-guard';

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--green)]">
        Leader tools
      </p>
      {children}
    </main>
  );
}
