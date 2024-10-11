'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, Github, Google } from '@/assets/svg/index';
import Button from '@/components/Button';
import useModal from '@/components/Modal/hooks/useModal';
import Profile from '@/components/Profile';
import ProfileEdit from '@/containers/header/ProfileEdit';
import { menus } from '@/layouts/Header/constants/menu';
import useActive from '@/layouts/Header/hooks/useActive';

function MobileMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isActive } = useActive();
  const { Modal, open } = useModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleSignIn = (type: 'github' | 'google') => {
    signIn(type, { callbackUrl: pathname });
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="z-10 flex sm:hidden">
      <button onClick={handleMenuOpen}>
        <Menu className="h-6 w-6 fill-slate-900 dark:fill-slate-50" />
      </button>
      {isMenuOpen && (
        <div className="fixed left-0 top-0 w-full bg-opacity-30">
          <div className="absolute left-0 top-14 w-full bg-slate-100 shadow-lg dark:bg-slate-800">
            <div className="flex justify-center gap-4 border-b border-slate-600 pb-4">
              {session && (
                <div className="flex flex-col gap-2">
                  <Profile>
                    <Profile.Info
                      src={session.user?.image || ''}
                      alt={session.user?.nickname || 'guest'}
                      name={session.user?.nickname || 'guest'}
                    />
                    <Profile.Buttons>
                      <Profile.Button
                        onClick={() => {
                          open('profileEdit');
                        }}
                      >
                        <p>Change Profile</p>
                      </Profile.Button>
                      <Profile.Button
                        onClick={() => signOut({ callbackUrl: '/' })}
                      >
                        <p>Sign out</p>
                      </Profile.Button>
                    </Profile.Buttons>
                  </Profile>
                  {session.user.role.name === 'admin' && (
                    <Link href="/posts/write">
                      <Button size="full">새 글 작성</Button>
                    </Link>
                  )}
                </div>
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
            <div className="flex flex-col items-center gap-4 py-4">
              {menus.map((menu) => (
                <Link
                  key={menu.title}
                  href={menu.href}
                  className={` ${isActive(menu.href) ? 'font-semibold' : ''}`}
                  onClick={() => handleMenuClose()}
                >
                  {menu.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal modalKey="profileEdit">
        {session && (
          <ProfileEdit
            profileSrc={session?.user.image}
            nickname={session?.user.nickname}
          />
        )}
      </Modal>
    </div>
  );
}

export default MobileMenu;
