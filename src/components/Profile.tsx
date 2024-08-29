import Image from 'next/image';
import Button from '@/components/Button';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/convert';

interface ProfileProps {
  children: React.ReactNode;
  border?: boolean;
}

interface ProfileInfoProps {
  src: string;
  alt: string;
  name: string;
  date?: string;
}

interface ProfileButtonsProps {
  children: React.ReactNode;
}

interface ProfileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Profile = ({ border = true, ...props }: ProfileProps) => {
  return (
    <div
      className={cn(
        `flex flex-col gap-2`,
        border &&
          `rounded-md border border-slate-200 p-3 dark:border-slate-700`,
      )}
    >
      {props.children}
    </div>
  );
};

Profile.Info = ({ src, alt, name, date }: ProfileInfoProps) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={src}
        alt={alt}
        width={60}
        height={60}
        className="h-10 w-10 rounded-full md:h-14 md:w-14"
      />
      <div className="flex-col justify-center">
        <p className="text-sm font-semibold md:text-lg">{name}</p>
        {date && (
          <time className="text-xs text-slate-500 dark:text-slate-300 md:text-base">
            {formatDate(date, { includeYear: true })}
          </time>
        )}
      </div>
    </div>
  );
};

Profile.Buttons = ({ children }: ProfileButtonsProps) => {
  return <div className="flex gap-4">{children}</div>;
};

Profile.Button = ({ children, onClick, ...props }: ProfileButtonProps) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default Profile;
