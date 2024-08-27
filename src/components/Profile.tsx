import Image from 'next/image';
import Button from '@/components/Button';

interface ProfileProps {
  children: React.ReactNode;
}

interface ProfileInfoProps {
  src: string;
  alt: string;
  name: string;
}

interface ProfileButtonsProps {
  children: React.ReactNode;
}

interface ProfileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Profile = (props: ProfileProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-slate-200 p-3">
      {props.children}
    </div>
  );
};

Profile.Info = ({ src, alt, name }: ProfileInfoProps) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={src}
        alt={alt}
        width={60}
        height={60}
        className="rounded-full"
      />
      <p className="text-lg font-semibold">{name}</p>
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
