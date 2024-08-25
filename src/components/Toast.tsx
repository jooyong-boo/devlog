'use client';

import toast from 'react-hot-toast';
import { CheckCircle, Error, Info, Warning } from '@/assets/svg/index';
import { cn } from '@/utils/cn';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  status: 'Default' | 'Success' | 'Error' | 'Warning' | 'Info';
  message: string;
}

enum StatusColor {
  Default = 'slate-900',
  Success = 'green-500',
  Error = 'red-500',
  Warning = 'yellow-400',
  Info = 'sky-500',
}

const StatusIcon = {
  Default: '',
  Success: <CheckCircle width={20} height={20} />,
  Error: <Error width={20} height={20} />,
  Warning: <Warning width={20} height={20} />,
  Info: <Info width={20} height={20} />,
};
const Toast = ({ id, message, status, ...rest }: Props) => {
  return (
    <div
      className={cn(`flex items-center justify-center gap-2.5`)}
      color={status}
      onClick={() => toast.dismiss(id)}
      {...rest}
    >
      {status !== 'Default' && (
        <div
          className={cn(
            `material-symbols-rounded text-lg text-${StatusColor[status]} fill-${StatusColor[status]}`,
          )}
        >
          {StatusIcon[status]}
        </div>
      )}
      <span className="whitespace-pre-wrap break-words break-all">
        {message}
      </span>
    </div>
  );
};

export default Toast;
