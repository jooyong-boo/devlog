'use client';

import Link from 'next/link';
import Darkmode from '@/layouts/Header/components/Darkmode';
import MobileMenu from '@/layouts/Header/components/MobileMenu';
import PCMenu from '@/layouts/Header/components/PCMenu';

function Header() {
  return (
    <header className="sticky top-0 z-50 flex min-h-14 w-full items-center justify-between bg-slate-100 px-4 py-4 dark:bg-slate-800">
      <Link href="/" className="text-slate-900 dark:text-slate-50">
        개발블로그
      </Link>
      <div className="flex items-center gap-4">
        <Darkmode />
        <PCMenu />
        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;
