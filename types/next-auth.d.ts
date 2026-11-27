
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'leader' | 'member';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'admin' | 'leader' | 'member';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'admin' | 'leader' | 'member';
  }
}
