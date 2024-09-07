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
    signIn: async ({ account, user }) => {
      if (!user.name || !user.image || !account) {
        return false;
      }
      const checkUsers = await prisma.users.findUnique({
        where: { email: user.email as string },
      });
      if (!checkUsers) {
        await prisma.users.create({
          data: {
            email: user.email as string,
            id: nanoid(),
            nickname: user.name,
            profile: user.image,
            roleId: 1,
          },
        });
      }

      return true;
    },
    jwt: async ({ token, account, profile, user }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id || user.id;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.id = (token.id as string) || user.id;
      }

      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export { auth as getSession };
