import { ReactNode, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface ModalViewProps {
  onClose: () => void;
  children: ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  displayClose?: string;
  modalHeight?: string;
}

const ModalView = ({
  onClose,
  children,
  modalRef,
  displayClose = 'block',
}: ModalViewProps) => {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const overlayClasses = `fixed inset-0 z-[99] w-full h-full backdrop-blur  bg-black bg-opacity-50`;

  const modalClasses = cn(
    `fixed left-1/2 transition-all duration-500 ease-in-out overflow-y-auto  sm:max-w-[500px] sm:mx-auto`,
    `dark:bg-gray-800 bg-gray-200 p-4 border dark:bg-slate-800 dark:border-slate-700`,
    'top-1/2 w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 rounded-lg animate-modalShow max-h-[90vh]',
  );

  const closeBtnClasses = `absolute bg-transparent -top-8 right-0 text-gray-50 ${displayClose === 'none' ? 'hidden' : 'block'}`;

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div
        ref={modalRef}
        className={modalClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className={`${closeBtnClasses} material-symbols-rounded`}
          onClick={onClose}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default ModalView;
