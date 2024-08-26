import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menus } from '@/layouts/Header/constants/menu';
import useActive from '@/layouts/Header/hooks/useActive';

function PCMenu() {
  const { isActive } = useActive();

  return (
    <div className="hidden sm:flex sm:items-center sm:gap-2">
      {menus.map((menu) => (
        <Link
          key={menu.title}
          href={menu.href}
          className={`hover:text-sky-600 dark:hover:text-orange-600 ${isActive(menu.href) ? 'font-semibold' : ''} `}
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
}

export default PCMenu;
