import { cn } from '@/utils/cn';

interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  subTitle?: string;
  borderBottom?: boolean;
}

const Title = ({ subTitle, borderBottom = false, ...props }: TitleProps) => {
  return (
    <header
      className={cn(
        `flex flex-col gap-2`,
        borderBottom && `border-b border-slate-400 pb-6`,
      )}
    >
      <h1 className="text-2xl font-bold" {...props}>
        {props.children}
      </h1>
      {subTitle && <p className="text-gray-500">{subTitle}</p>}
    </header>
  );
};

export default Title;
