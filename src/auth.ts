import NextAuth, { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const authOptions: NextAuthConfig = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token;
      }

      console.log('session', session);
      return session;
    },
    jwt: async ({ token, user }) => {
      console.log('jwt', token, user);
      return { ...token, ...user };
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export { auth as getSession };
