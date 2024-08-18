import React from 'react';
import { useStore } from 'zustand';
import DarkModeSvg from '@/assets/svg/dark_mode.svg';
import LightModeSvg from '@/assets/svg/light_mode.svg';
import useThemeStore from '@/store/useThemeStore';

function Darkmode() {
  const { theme, toggleTheme } = useStore(useThemeStore);

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' && (
        <DarkModeSvg className="w-6 h-6 fill-slate-50 hover:fill-orange-600" />
      )}
      {!theme && (
        <LightModeSvg className="w-6 h-6 fill-slate-900 hover:fill-sky-600" />
      )}
    </button>
  );
}

export default Darkmode;
