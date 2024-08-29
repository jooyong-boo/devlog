'use client';

import { useRouter } from 'next/navigation';
import { DarkMode, LightMode } from '@/assets/svg/index';
import useTheme, { ThemeProps } from '@/hooks/useTheme';

function Darkmode({ initialTheme }: ThemeProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme({ initialTheme });

  const handleToggleTheme = () => {
    toggleTheme();
    router.refresh();
  };

  return (
    <button onClick={handleToggleTheme} className="h-6 w-6">
      {theme === 'dark' && (
        <DarkMode className="fill-slate-50 hover:fill-orange-600" />
      )}
      {!theme && <LightMode className="fill-slate-900 hover:fill-sky-600" />}
    </button>
  );
}

export default Darkmode;
