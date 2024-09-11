import { nanoid } from 'nanoid';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import prisma from '../prisma/client';

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
        Object.assign(token, user);
      }
      if (trigger === 'update' && session) {
        Object.assign(token, session.user);
        token.picture = session.user.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session = { ...session, ...token };
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
export { auth as getSession };
