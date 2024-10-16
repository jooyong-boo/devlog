import type { Metadata } from 'next';
import './globals.css';
import { cookies } from 'next/headers';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import AuthContext from '@/app/context/AuthContext';
import { getSession } from '@/auth';
import { Pretendard } from '@/constants/localFont';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import { tailwindTheme } from '@/utils/tailwindTheme';

export const metadata: Metadata = {
  title: 'DEVLOG - jooyong',
  description: "jooyong's devlog",
  openGraph: {
    title: 'DEVLOG - jooyong',
    description: "jooyong's devlog",
  },
  verification: {
    google: 'x7Bur4_X_TYpLXkE7noT1Xu4guTZ0tejfFAYbNuF_Kg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  const theme = cookies().get('theme');

  const toasterOptions: DefaultToastOptions = {
    style: {
      minWidth: '100px',
      maxWidth: '380px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      borderRadius: '40px',
      background:
        theme?.value === 'dark'
          ? tailwindTheme.colors.slate[50]
          : tailwindTheme.colors.slate[900],
      color:
        theme?.value === 'dark'
          ? tailwindTheme.colors.slate[900]
          : tailwindTheme.colors.slate[50],
      fontSize: '1rem',
    },
  };

  return (
    <html lang="en" className={theme?.value === 'dark' ? 'dark' : ''}>
      <body
        className={`flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 ${Pretendard.className} mx-auto my-0 max-w-[1000px]`}
      >
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <AuthContext session={session}>
          <Toaster position="top-center" toastOptions={toasterOptions} />
          <main className="flex flex-grow flex-col">{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
