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
    signIn: async ({ account, user, email }) => {
      const result = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email || email,
          id: user.id,
          nickname: user.name,
          profile: user.image,
          accessToken: account,
        }),
      });

      if (result.status === 201) {
        return true;
      }
      return false;
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
