import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Administrator Login',
  description: 'Sign in to manage Maple Ridge Ward sacrament meetings.',
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold">
        Administrator Login
      </h1>

      <p className="mb-8 text-[var(--muted)]">
        Sign in to schedule and manage sacrament meetings.
      </p>

      <LoginForm />
    </main>
  );
}