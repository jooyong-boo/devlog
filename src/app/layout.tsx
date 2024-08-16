import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header/index';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DEVLOG - jooyong',
  description: "jooyong's devlog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <Header />
        <div className="flex-grow flex">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
