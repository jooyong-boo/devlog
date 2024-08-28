import { cn } from '@/utils/cn';

interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'small' | 'medium' | 'large';
  subTitle?: string;
  borderBottom?: boolean;
}

const Title = ({
  subTitle,
  borderBottom = false,
  size = 'medium',
  ...props
}: TitleProps) => {
  return (
    <header
      className={cn(
        `flex flex-col gap-2`,
        borderBottom && `border-b border-slate-400 pb-6`,
      )}
    >
      <h1
        className={cn(
          `font-bold`,
          size === 'small' && `text-xl`,
          size === 'medium' && `text-xl md:text-2xl`,
          size === 'large' && `text-2xl md:text-4xl`,
        )}
        {...props}
      >
        {props.children}
      </h1>
      {subTitle && <p className="text-gray-500">{subTitle}</p>}
    </header>
  );
};

export default Title;
