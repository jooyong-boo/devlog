import { cookies } from 'next/headers';
import { Theme } from '@/hooks/useTheme';
import Darkmode from '@/layouts/Header/components/Darkmode';

const DarkmodeProvider = () => {
  const cookieStore = cookies();
  const theme = (cookieStore.get('theme')?.value || '') as Theme;

  return <Darkmode initialTheme={theme} />;
};

export default DarkmodeProvider;
