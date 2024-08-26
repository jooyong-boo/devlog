import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string | JWT;
  }
  interface Session {
    accessToken: string | JWT;
  }
}
declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
  }
}
