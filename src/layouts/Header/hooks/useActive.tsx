import { usePathname } from 'next/navigation';

function useActive() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return { pathname, isActive };
}

export default useActive;
