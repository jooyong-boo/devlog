import { JWT } from 'next-auth/jwt';
import 'next-auth';

declare module 'next-auth' {
  export interface User {
    accessToken: string | JWT;
  }
  export interface Session {
    accessToken: string | JWT;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    role: {
      name: string;
    };
    oauthProvider: {
      name: string;
    };
  }
}
