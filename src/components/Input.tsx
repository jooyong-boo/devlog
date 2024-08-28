import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string | number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            `min-h-9 rounded-[4px] px-2 py-1 text-sm focus:outline-none`,
            `bg-slate-50 dark:bg-slate-800`,
            `border border-slate-300 dark:border-slate-700`,
            `text-slate-900 placeholder:text-slate-400`,
          )}
          {...props}
        />
      </div>
    );
  },
);

export default Input;
