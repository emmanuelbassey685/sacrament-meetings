'use client';

import { useActionState } from 'react';
import {
  authenticate,
  type LoginState,
} from '@/app/login/actions';

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-lg border border-[var(--line)] px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-[var(--line)] px-4 py-3"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-[var(--green)] px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}