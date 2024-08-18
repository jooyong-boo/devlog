import { cn } from '@/utils/cn';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'danger'
  | 'dark'
  | 'light';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  outline?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
}

function Button({
  variant = 'primary',
  size = 'sm',
  outline = false,
  rounded = false,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-sky-600 hover:bg-sky-800',
    secondary: 'bg-blue-600 hover:bg-blue-800',
    success: 'bg-emerald-600 hover:bg-emerald-800',
    info: 'bg-cyan-600 hover:bg-cyan-800',
    danger: 'bg-orange-600 hover:bg-orange-800',
    dark: 'bg-gray-800 hover:bg-gray-600',
    light: 'bg-gray-300 text-slate-900 hover:bg-gray-400',
  };

  const outlineStyles = {
    primary: 'border-sky-600 text-sky-600 hover:bg-sky-600',
    secondary: 'border-blue-600 text-blue-600 hover:bg-blue-600',
    success: 'border-emerald-600 text-emerald-600 hover:bg-emerald-600',
    info: 'border-cyan-600 text-cyan-600 hover:bg-cyan-600',
    danger: 'border-orange-600 text-orange-600 hover:bg-orange-600',
    dark: 'border-gray-800 text-gray-800 hover:bg-gray-800',
    light:
      'border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-slate-900',
  };

  return (
    <button
      className={cn(
        'rounded-md px-3 py-1 transition-all',
        outline
          ? `border hover:text-slate-50 ${outlineStyles[variant]} `
          : `text-slate-50 ${variantStyles[variant]}`,
        rounded && 'rounded-lg',
        {
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
        },
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
