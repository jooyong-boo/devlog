import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | ''>('');

  useEffect(() => {
    const savedTheme =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('theme='))
        ?.split('=')[1] || '';
    setTheme(savedTheme as 'dark' | '');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? '' : 'dark';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.cookie = `theme=${newTheme}; max-age=${60 * 60 * 24 * 365}; path=/`;
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
