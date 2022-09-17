import { TOKEN_KEY } from '@config/constants';
import * as jose from 'jose';
import { NextResponse, type NextRequest } from 'next/server';
import { authenticatedRoutes, unAuthenticatedRoutes } from './config';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isInAuthenticatedRoutes =
    !!authenticatedRoutes.find((route) => pathname.startsWith(route)) ||
    pathname === '/';

  const token = req.cookies.get(TOKEN_KEY);

  try {
    await jose.jwtVerify(
      token!,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    if (unAuthenticatedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (isInAuthenticatedRoutes) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
