import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { match } from 'path-to-regexp';

const matchersForAuth = ['/posts/write']; // 인증이 필요한 페이지 경로
const matchersForSignIn = ['/api/auth/*']; // 로그인이 필요한 페이지 경로

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
    secureCookie: process.env.NODE_ENV === 'production',
    salt:
      process.env.NODE_ENV === 'production'
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token',
  });
  const isAdmin = session?.role.name === 'admin';

  const theme = request.cookies.get('theme');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', currentPath);
  requestHeaders.set('x-admin', isAdmin.toString());

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!theme) {
    response.cookies.set('theme', '');
  }

  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return isAdmin // 세션 정보 확인
      ? response
      : NextResponse.redirect(new URL(`/`, request.url));
  }
  // 인증 후 회원가입 및 로그인 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return session
      ? NextResponse.redirect(new URL('/', request.url))
      : response;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
