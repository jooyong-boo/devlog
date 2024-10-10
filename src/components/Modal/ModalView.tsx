import { ReactNode, useEffect } from 'react';
import { ModalType } from '@/components/Modal/ModalContainer';

interface ModalViewProps {
  onClose: () => void;
  children: ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  modalType?: ModalType;
  displayClose?: string;
  modalHeight?: string;
}

const ModalView = ({
  onClose,
  children,
  modalRef,
  modalType = 'default',
  displayClose = 'block',
  modalHeight,
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

  const overlayClasses = `fixed inset-0 z-[99] w-full h-full ${
    modalType === 'innerFull' ? 'bg-gray-1000' : 'bg-black bg-opacity-50'
  } ${modalType !== 'full' ? 'animate-fadeIn' : ''}`;

  const modalClasses = `fixed left-1/2 transition-all duration-500 ease-in-out overflow-y-auto 
    ${modalType === 'innerFull' ? '' : 'bg-gray-0'}
    ${
      modalType === 'slideUp'
        ? 'bottom-0 w-full p-4 -translate-x-1/2 rounded-t-lg animate-slideUp'
        : modalType === 'slideUpHeight'
          ? `bottom-0 w-full min-h-[10%] max-h-[${modalHeight}] overflow-y-auto p-4 -translate-x-1/2 rounded-t-lg animate-slideUp`
          : modalType === 'full'
            ? 'bottom-0 w-full h-full pt-14 pb-3 -translate-x-1/2'
            : modalType === 'innerFull'
              ? 'top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-lg animate-modalShow object-contain'
              : 'top-1/2 w-[calc(100%-32px)] p-4 -translate-x-1/2 -translate-y-1/2 rounded-lg animate-modalShow max-h-[90vh]'
    }
    sm:max-w-[500px] sm:mx-auto`;

  const closeBtnClasses = `absolute bg-transparent ${
    modalType === 'full'
      ? 'top-4 right-4 text-gray-800'
      : '-top-8 right-0 text-gray-50'
  } ${displayClose === 'none' ? 'hidden' : 'block'}`;

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
