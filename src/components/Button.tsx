import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({ variant = 'primary', size = 'sm', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        `rounded-lg px-3 py-1 text-slate-50 transition-all`,
        `${variant === 'primary' && 'bg-sky-600 hover:bg-sky-800 dark:bg-orange-600 dark:hover:bg-orange-800'}`,
        `${variant === 'outline' && 'hover:outlint-sky-800 text-sky-600 outline outline-sky-600 hover:text-sky-800 dark:text-orange-600 dark:outline-orange-600 dark:hover:text-orange-700 dark:hover:outline-orange-700'}`,
        `${variant === 'danger' && 'bg-red-600 hover:bg-red-800'}`,
        `${size === 'sm' && 'text-sm'}`,
        `${size === 'md' && 'text-base'}`,
        `${size === 'lg' && 'text-lg'}`,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
