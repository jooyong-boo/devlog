import { cn } from '@/utils/cn';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

function Input({ id, label, ...props }: InputProps) {
  return (
    <form className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={cn(
          `min-h-8 rounded-[4px] px-2 py-1 text-sm focus:outline-none`,
          `border border-slate-300`,
          `text-slate-900 placeholder:text-slate-400`,
        )}
      />
    </form>
  );
}

export default Input;
