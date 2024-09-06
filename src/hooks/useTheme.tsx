import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

export type Theme = 'dark' | '';

export interface ThemeProps {
  initialTheme: Theme;
}

const useTheme = ({ initialTheme }: ThemeProps) => {
  const router = useRouter();

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    setTheme(initialTheme === 'dark' ? 'dark' : '');
  }, [initialTheme]);

  const toggleTheme = () => {
    const newTheme = initialTheme === 'dark' ? '' : 'dark';
    setCookie('theme', newTheme, { maxAge: 60 * 60 * 24 * 365 });
    setTheme(newTheme);
    router.refresh();
  };

  return { theme, toggleTheme };
};

export default useTheme;
