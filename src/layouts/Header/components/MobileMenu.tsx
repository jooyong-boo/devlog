import { useState } from 'react';
import Link from 'next/link';
import { Menu, Github, Google } from '@/assets/svg/index';
import { menus } from '@/layouts/Header/constants/menu';
import useActive from '@/layouts/Header/hooks/useActive';

function MobileMenu() {
  const { isActive } = useActive();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex sm:hidden">
      <button onClick={handleMenuOpen}>
        <Menu className="h-6 w-6 fill-slate-900 dark:fill-slate-50" />
      </button>
      {isMenuOpen && (
        <div className="absolute left-0 top-14 w-full bg-slate-50 shadow-lg dark:bg-slate-900">
          <div className="mb-4 flex justify-center gap-4 border-b pb-4">
            <div className="flex flex-col items-center gap-0.5 text-sm">
              <Github width={40} height={40} />
              <p>Github</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-sm">
              <Google width={40} height={40} />
              <p>Google</p>
            </div>
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
      )}
    </div>
  );
}

export default MobileMenu;
