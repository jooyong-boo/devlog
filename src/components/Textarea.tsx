'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  onChange?: (value: string) => void;
}

function Textarea({ label, onChange, ...props }: TextareaProps) {
  const [value, setValue] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={label} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        id={label}
        className={cn(
          `resize-none overflow-hidden rounded-[4px] p-3 text-sm focus:outline-none`,
          `border border-slate-300 dark:border-slate-700`,
          `text-slate-900 placeholder:text-slate-400 dark:text-slate-50`,
          `bg-slate-100 dark:bg-slate-800`,
        )}
        value={value}
        onChange={handleChange}
        rows={3}
        {...props}
      />
    </div>
  );
}

export default Textarea;
