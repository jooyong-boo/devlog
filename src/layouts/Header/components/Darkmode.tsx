import { useRouter } from 'next/navigation';
import { DarkMode, LightMode } from '@/assets/svg/index';
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
        <DarkMode className="h-6 w-6 fill-slate-50 hover:fill-orange-600" />
      )}
      {!theme && (
        <LightMode className="h-6 w-6 fill-slate-900 hover:fill-sky-600" />
      )}
    </button>
  );
}

export default Darkmode;
