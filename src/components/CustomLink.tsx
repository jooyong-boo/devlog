import Link, { LinkProps } from 'next/link';
import { cn } from '@/utils/cn';

interface CustomLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  isColor?: boolean;
  className?: string;
}

const CustomLink = ({
  children,
  className,
  isColor = true,
  ...props
}: CustomLinkProps) => {
  return (
    <Link
      className={cn(
        `text-sm`,
        isColor &&
          'text-sky-600 hover:text-sky-500 dark:text-orange-600 dark:hover:text-orange-500',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
