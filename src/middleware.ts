// // middleware.ts
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export async function middleware(request: NextRequest) {
//   // helpers
//   // console.log(request.nextUrl.pathname);
//   if (request.nextUrl.pathname.startsWith('/_next')) return NextResponse.next();

//   // const token = request.cookies.get('token');

//   // if (!token) return NextResponse.redirect(new URL('/login', request.url));

//   // try {
//   //   const { payload } = await jose.jwtVerify(
//   //     token,
//   //     new TextEncoder().encode(process.env.JWT_SECRET),
//   //   );

//   //   console.log({ payload });
//   // } catch (error) {
//   //   console.log(error);
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }

//   // return NextResponse.redirect(new URL('/login', request.url));
//   // return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: '/',
// // };

import * as jose from 'jose';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token');

  if (!token && pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(
      token!,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    console.log({ payload });
  } catch (error) {
    if (!token && pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: '/:path*',
// };
