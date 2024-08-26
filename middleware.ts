import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const theme = request.cookies.get('theme');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', currentPath);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!theme) {
    response.cookies.set('theme', '');
  }

  return response;
}
