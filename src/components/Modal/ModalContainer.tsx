import { ReactNode, useRef } from 'react';
import ModalView from '@/components/Modal/ModalView';

export type ModalType =
  | 'default'
  | 'slideUp'
  | 'full'
  | 'innerFull'
  | 'slideUpHeight';
interface ModalContainerProps {
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
  modalType?: ModalType;
  displayClose?: string;
  modalHeight?: string;
}

const ModalContainer = ({
  onClose,
  children,
  isOpen,
  modalType,
  displayClose,
  modalHeight,
}: ModalContainerProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) {
    return null;
  }
  return (
    <ModalView
      onClose={onClose}
      modalRef={modalRef}
      modalType={modalType}
      displayClose={displayClose}
      modalHeight={modalHeight}
    >
      {children}
    </ModalView>
  );
};

export default ModalContainer;
