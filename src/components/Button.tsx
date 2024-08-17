'use client';

import { cn } from '@/utils/cn';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
}

function Button({ color = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        `rounded-lg bg-sky-600 px-3 py-1 text-sm text-slate-50 transition-colors hover:bg-sky-800 dark:bg-orange-600 dark:hover:bg-orange-800`,
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;
