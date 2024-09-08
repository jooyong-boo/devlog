import { NextRequest } from 'next/server';
import { handlers } from '@/auth';

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  const proto = req.headers.get('x-forwarded-proto');
  const host = req.headers.get('x-forwarded-host');
  if (!proto || !host) {
    return req;
  }
  const envOrigin = `${proto}://${host}`;
  const { href, origin } = req.nextUrl;
  return new NextRequest(href.replace(origin, envOrigin), req);
};

export const GET = (req: NextRequest) => {
  return handlers.GET(reqWithTrustedOrigin(req));
};

export const POST = (req: NextRequest) => {
  return handlers.POST(reqWithTrustedOrigin(req));
};
