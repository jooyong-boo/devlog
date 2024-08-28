import DarkmodeProvider from '@/layouts/Header/components/DarkmodeProvider';
import Logo from '@/layouts/Header/components/Logo';
import MobileMenu from '@/layouts/Header/components/MobileMenu';
import PCMenu from '@/layouts/Header/components/PCMenu';

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-slate-100 px-4 py-4 dark:bg-slate-800">
      <Logo />
      <div className="flex items-center gap-4">
        <DarkmodeProvider />
        <PCMenu />
        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;
