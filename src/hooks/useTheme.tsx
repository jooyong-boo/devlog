import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

const useTheme = () => {
  const [theme, setTheme] = useState('');
  const cookieTheme = getCookie('theme');

  useEffect(() => {
    setTheme(cookieTheme === 'dark' ? 'dark' : '');
  }, [cookieTheme]);

  const toggleTheme = () => {
    const newTheme = cookieTheme === 'dark' ? '' : 'dark';
    setCookie('theme', newTheme, { maxAge: 60 * 60 * 24 * 365 });
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
