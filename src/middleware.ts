import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import { Session } from './lib/auth';

const authRoutes = ['/login', '/register'];
const passwordRoutes = ['/reset-password', '/forgot-password'];
const adminRoutes = ['/dashboard'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = authRoutes.includes(pathname);
  const isPasswordRoute = passwordRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.includes(pathname);

  //   const session = await getSession();
  //   const user = await getUser(session.userId);

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get('cookie') || '',
      },
    }
  );

  if (!session) {
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAdminRoute && session.user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  //   matcher: ["/dashboard", "/registration"],
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
