
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname === '/meetings/new' ||
    /^\/meetings\/[^/]+\/edit$/.test(pathname);

  if (isProtectedRoute && !request.auth?.user) {
  return NextResponse.redirect(
    new URL('/login', request.nextUrl)
  );
}

  return NextResponse.next();
});

export const config = {
  matcher: ['/meetings/:path*'],
};
