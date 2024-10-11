import { ReactNode, useRef } from 'react';
import ModalView from '@/components/Modal/ModalView';

interface ModalContainerProps {
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
  displayClose?: string;
}

const ModalContainer = ({
  onClose,
  children,
  isOpen,
  displayClose,
}: ModalContainerProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) {
    return null;
  }
  return (
    <ModalView
      onClose={onClose}
      modalRef={modalRef}
      displayClose={displayClose}
    >
      {children}
    </ModalView>
  );
};

export default ModalContainer;
