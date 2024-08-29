import Link from 'next/link';
import { cn } from '@/utils/cn';

export interface NavigationCardProps {
  title: string;
  subText?: string;
  href: string;
  icon: React.ReactNode;
  right?: boolean;
}

const NavigationCard = ({
  href,
  icon,
  title,
  subText,
  right,
}: NavigationCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        `flex items-center justify-between gap-3 rounded-md bg-white p-4 shadow-sm dark:bg-slate-800`,
        right && 'flex-row-reverse',
      )}
    >
      <div className="flex items-center">{icon}</div>
      <div
        className={cn(
          `flex-1`,
          ` ${right ? 'items-end text-right' : 'items-start text-left'} `,
        )}
      >
        {subText && <p className="text-xs">{subText}</p>}
        <h3 className="text-overflow-1">{title}</h3>
      </div>
    </Link>
  );
};

export default NavigationCard;
