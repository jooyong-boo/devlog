'use client';

import Link from 'next/link';
import Darkmode from '@/layouts/Header/components/Darkmode';
import MobileMenu from '@/layouts/Header/components/MobileMenu';
import PCMenu from '@/layouts/Header/components/PCMenu';

function Header() {
  return (
    <div className="w-full flex items-center justify-between min-h-14 px-4 py-4">
      <Link href="/" className="text-slate-900 dark:text-slate-50">
        개발블로그
      </Link>
      <div className="flex items-center gap-4">
        <PCMenu />
        <Darkmode />
        <MobileMenu />
      </div>
    </div>
  );
}

export default Header;
