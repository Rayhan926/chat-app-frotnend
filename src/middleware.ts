// middleware.ts
import * as jose from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // helpers

  const token = request.cookies.get('token');
  const { payload } = await jose.jwtVerify(
    token!,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  console.log({ payload });

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/',
// };
