import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface AuthContextProps {
  children: React.ReactNode;
  session: Session | null;
}

const AuthContext = ({ session, children }: AuthContextProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthContext;
