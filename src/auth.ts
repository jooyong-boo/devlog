import { nanoid } from 'nanoid';
import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import prisma from '../prisma/client';

declare module 'next-auth' {
  export interface User {
    accessToken: string | JWT;
    role: {
      name: string;
    };
    oauthProvider: {
      name: string;
    };
    nickname: string;
  }
  export interface Session {
    user: User & {
      name: string | null;
      email: string | null;
      image: string | null;
    };
    accessToken: string | JWT;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    user: {
      createdAt: string;
      role: {
        name: string;
      };
      oauthProvider: {
        name: string;
      };
      nickname: string;
    };
  }
}

const authOptions: NextAuthConfig = {
  providers: [
    Github({
      clientId: process.env.OAUTH_GITHUB_ID!,
      clientSecret: process.env.OAUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    signIn: async ({ user }) => {
      const checkUsers = await prisma.users.findUnique({
        where: { email: user.email as string },
      });
      if (!checkUsers) {
        await prisma.users.create({
          data: {
            email: user.email as string,
            id: nanoid(),
            nickname: user.name as string,
            profile: user.image as string,
            roleId: 1,
          },
        });
      }

      return true;
    },
    jwt: async ({ token, session, trigger }) => {
      const user = await prisma.users.findUnique({
        where: { email: token.email as string },
        select: {
          createdAt: true,
          nickname: true,
          oauthProvider: {
            select: {
              name: true,
            },
          },
          role: {
            select: {
              name: true,
            },
          },
        },
      });
      if (user) {
        Object.assign(token, { user });
      }
      if (trigger === 'update' && session) {
        Object.assign(token, { user: session.user });
        token.picture = session.user.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session = { ...session, ...token.user };
      if (token) {
        session.user.role = token.user.role;
        session.user.oauthProvider = token.user.oauthProvider;
        session.user.nickname = token.user.nickname;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
export { auth as getSession };
