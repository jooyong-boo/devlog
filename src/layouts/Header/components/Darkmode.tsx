import React from 'react';
import { useRouter } from 'next/navigation';
import DarkModeSvg from '@/assets/svg/dark_mode.svg';
import LightModeSvg from '@/assets/svg/light_mode.svg';
import useTheme from '@/hooks/useTheme';

function Darkmode() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
    router.refresh();
  };

  return (
    <button onClick={handleToggleTheme}>
      {theme === 'dark' && (
        <DarkModeSvg className="h-6 w-6 fill-slate-50 hover:fill-orange-600" />
      )}
      {!theme && (
        <LightModeSvg className="h-6 w-6 fill-slate-900 hover:fill-sky-600" />
      )}
    </button>
  );
}

export default Darkmode;
