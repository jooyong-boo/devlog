import { NextResponse, type NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { auth, getSession } from '@/auth';

const matchersForAuth = []; // 인증이 필요한 페이지 경로
const matchersForSignIn = ['/api/auth/*']; // 로그인이 필요한 페이지 경로

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const theme = request.cookies.get('theme');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', currentPath);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 인증이 필요한 페이지 접근 제어!
  // if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
  //   return (await getSession()) // 세션 정보 확인
  //     ? NextResponse.next()
  //     : NextResponse.redirect(
  //         new URL(`/signin?callbackUrl=${request.url}`, request.url),
  //       );
  // }
  // 인증 후 회원가입 및 로그인 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
  }

  if (!theme) {
    response.cookies.set('theme', '');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
