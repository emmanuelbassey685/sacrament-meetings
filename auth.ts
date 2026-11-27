import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import authConfig from './auth.config';

const connectionString =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or POSTGRES_URL is missing.');
}

const sql = neon(connectionString);

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const users = await sql`
          SELECT id, name, email, password_hash, role
          FROM app_users
          WHERE email = ${email.toLowerCase()}
          LIMIT 1
        `;

        const user = users[0];

        if (!user || user.role !== 'admin') {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          password,
          String(user.password_hash)
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(user.id),
          name: String(user.name),
          email: String(user.email),
          role: 'admin',
        };
      },
    }),
  ],


  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);

        if (token.role === 'admin') {
          session.user.role = 'admin';
        }
      }

      return session;
    },
  },
});
