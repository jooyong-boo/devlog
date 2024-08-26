import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, Close, Github, Google } from '@/assets/svg/index';
import { menus } from '@/layouts/Header/constants/menu';
import useActive from '@/layouts/Header/hooks/useActive';

const PCMenu = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  console.log(session);
  const { isActive } = useActive();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSignIn = (type: 'github' | 'google') => {
    signIn(type, { callbackUrl: pathname });
  };

  return (
    <div className="hidden sm:flex">
      <button onClick={handleToggleMenu}>
        <Menu className="h-6 w-6 fill-slate-900 dark:fill-slate-50" />
      </button>
      {isMenuOpen && (
        <div
          className="fixed left-0 top-0 h-full w-full bg-slate-500 bg-opacity-30"
          onClick={handleToggleMenu}
        >
          <div
            className="fixed right-0 h-full w-64 bg-slate-50 p-4 dark:bg-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleToggleMenu}
              className="flex w-full justify-end"
            >
              <Close className="h-6 w-6 fill-slate-900 dark:fill-slate-50" />
            </button>
            <div className="mb-4 flex justify-center gap-4 border-b pb-4">
              {session && (
                <>
                  <Image
                    src={session.user?.image || ''}
                    alt={session.user?.name || 'guest'}
                    width={60}
                    height={60}
                  />
                  <p>{session.user?.name}</p>
                  <button
                    className="flex flex-col items-center gap-0.5 fill-slate-900 text-sm dark:fill-slate-50"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <p>Sign out</p>
                  </button>
                </>
              )}
              {!session && (
                <>
                  <button
                    className="flex flex-col items-center gap-0.5 fill-slate-900 text-sm dark:fill-slate-50"
                    onClick={() => handleSignIn('github')}
                  >
                    <Github width={40} height={40} />
                    <p>Github</p>
                  </button>
                  <button
                    className="flex flex-col items-center gap-0.5 fill-slate-900 text-sm dark:fill-slate-50"
                    onClick={() => handleSignIn('google')}
                  >
                    <Google width={40} height={40} />
                    <p>Google</p>
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              {menus.map((menu) => (
                <Link
                  key={menu.title}
                  href={menu.href}
                  className={`hover:text-sky-600 dark:hover:text-orange-600 ${isActive(menu.href) ? 'font-semibold' : ''} text-2xl`}
                >
                  {menu.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PCMenu;
