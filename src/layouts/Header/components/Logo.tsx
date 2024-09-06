import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import LogoBlack from '@/assets/img/logo_black.png';
import LogoWhite from '@/assets/img/logo_white.png';

const Logo = () => {
  const theme = cookies().get('theme');

  return (
    <Link href="/" className="text-slate-900 dark:text-slate-50">
      {theme?.value === 'dark' ? (
        <Image src={LogoWhite} alt="logo" width={150} priority />
      ) : (
        <Image src={LogoBlack} alt="logo" width={150} priority />
      )}
    </Link>
  );
};

export default Logo;
