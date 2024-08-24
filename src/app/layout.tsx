import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header/index';
import useThemeStore from '@/store/useThemeStore';
import { tailwindTheme } from '@/utils/tailwindTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DEVLOG - jooyong',
  description: "jooyong's devlog",
};

export const toasterOptions: DefaultToastOptions = {
  style: {
    minWidth: '100px',
    maxWidth: '380px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    borderRadius: '40px',
    background:
      useThemeStore.getState().theme === 'dark'
        ? tailwindTheme.colors.slate[50]
        : tailwindTheme.colors.slate[900],
    color:
      useThemeStore.getState().theme === 'dark'
        ? tailwindTheme.colors.slate[900]
        : tailwindTheme.colors.slate[50],
    fontSize: '1rem',
    // TODO: theme dark 적용 안됨 해결하기
    // ...theme.typography.buttonM,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <Toaster position="top-center" toastOptions={toasterOptions} />
        <Header />
        <div className="flex flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
