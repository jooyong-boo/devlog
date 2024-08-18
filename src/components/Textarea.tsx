import { cn } from '@/utils/cn';

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
}

function Textarea({ id, label, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        name={id}
        id={id}
        className={cn(
          `resize-none rounded-[4px] px-2 py-1 text-sm focus:outline-none`,
          `border border-slate-300`,
          `text-slate-900 placeholder:text-slate-400`,
        )}
        {...props}
      />
    </div>
  );
}

export default Textarea;
