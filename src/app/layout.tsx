import type { Metadata } from 'next';
import './globals.css';
import { cookies, headers } from 'next/headers';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import AuthContext from '@/app/context/AuthContext';
import { getSession } from '@/auth';
import { Pretendard } from '@/constants/localFont';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header/index';
import { tailwindTheme } from '@/utils/tailwindTheme';

export const metadata: Metadata = {
  title: 'DEVLOG - jooyong',
  description: "jooyong's devlog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const pathname = headerList.get('x-current-path') || '/';
  const showHeaderFooter = shouldShowHeaderFooter(pathname);

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
        <AuthContext session={session}>
          <Toaster position="top-center" toastOptions={toasterOptions} />
          {showHeaderFooter && <Header />}
          <main className="flex flex-grow flex-col">{children}</main>
          {showHeaderFooter && <Footer />}
        </AuthContext>
      </body>
    </html>
  );
}

{
  /* TODO: 리팩토링 필요 layout.ts에 여러가지 로직이 들어가 있음 */
}
const layoutConfig = {
  hideHeaderFooterPaths: ['/posts/write'],
};

const shouldShowHeaderFooter = (pathname: string) => {
  return !layoutConfig.hideHeaderFooterPaths.includes(pathname);
};
