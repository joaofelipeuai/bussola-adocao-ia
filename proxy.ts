import {NextResponse} from 'next/server';

export function proxy() {
  const response = NextResponse.next();
  // HTML and RSC responses must never be shared between authenticated users.
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set('Vary', 'Cookie, Authorization, oai-authenticated-user-id, oai-authenticated-user-email');
  return response;
}

export const config = {matcher: ['/', '/wizard/:path*']};
