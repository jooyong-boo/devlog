import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', currentPath);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
