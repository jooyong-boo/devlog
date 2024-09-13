import { cn } from '@/utils/cn';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'danger'
  | 'dark'
  | 'light';
type ButtonSize = 'sm' | 'md' | 'lg' | 'half' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  outline?: boolean;
  rounded?: boolean;
  size?: ButtonSize;
  className?: string;
  active?: boolean;
}

function Button({
  variant = 'primary',
  size = 'sm',
  outline = false,
  rounded = false,
  active = false,
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
    primary: 'border-sky-600 text-sky-600 hover:bg-sky-600 ',
    secondary: 'border-blue-600 text-blue-600 hover:bg-blue-600 ',
    success: 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 ',
    info: 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 ',
    danger: 'border-orange-600 text-orange-600 hover:bg-orange-600',
    dark: 'border-gray-800 text-gray-800 hover:bg-gray-800 ',
    light:
      'border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-slate-900 ',
  };

  const activeOutlineStyles = {
    primary: 'bg-sky-600 text-slate-50',
    secondary: 'bg-blue-600 text-slate-50',
    success: 'bg-emerald-600 text-slate-50',
    info: 'bg-cyan-600 text-slate-50',
    danger: 'bg-orange-600 text-slate-50',
    dark: 'bg-gray-600 text-slate-50',
    light: 'bg-gray-400 text-slate-900',
  };

  return (
    <button
      type="button"
      {...props}
      className={cn(
        'flex items-center justify-center rounded-md px-3 py-1 transition-all disabled:bg-slate-400',
        outline
          ? `border hover:text-slate-50 ${outlineStyles[variant]} ${active && activeOutlineStyles[variant]} `
          : `text-slate-50 ${variantStyles[variant]}`,
        rounded && 'rounded-lg',
        `${size === 'sm' && 'h-7 text-sm'} ${size === 'md' && 'h-8 text-base'} ${size === 'lg' && 'h-11 text-lg'}`,
        `${size === 'half' && 'h-11 w-1/2 text-lg'} ${size === 'full' && 'h-11 w-full text-lg'}`,
        `${props.className}`,
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;
