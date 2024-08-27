import Link from 'next/link';
import Title from '@/components/Title';

interface LinkTitleProps {
  href: string;
  children: React.ReactNode;
}

const LinkTitle = ({ href, children }: LinkTitleProps) => {
  return (
    <Link href={href}>
      <Title>{children}</Title>
    </Link>
  );
};

export default LinkTitle;
