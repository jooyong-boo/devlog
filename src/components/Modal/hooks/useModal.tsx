import { useCallback, useState, ReactNode, useEffect } from 'react';
import ModalContainer from '@/components/Modal/ModalContainer';
import ModalPortal from '@/components/Modal/ModalPortal';

interface UseModalProps {
  useBlur?: boolean;
}

const useModal = ({ useBlur = true }: UseModalProps = {}) => {
  const [modals, setModals] = useState<string[]>([]);

  const open = useCallback((modalId: string) => {
    document.body.style.overflow = 'hidden';
    setModals((prevModals) => [...prevModals, `${modalId}Modal`]);
  }, []);

  const close = useCallback((modalId: string) => {
    const deleteModal = document.getElementById(`${modalId}Modal`);
    if (deleteModal) {
      document.body.style.overflow = 'visible';
      setModals((prevModals) =>
        prevModals.filter((id) => id !== `${modalId}Modal`),
      );
      document.body.removeChild(deleteModal);
    }
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const Modal = useCallback(
    ({
      children,
      modalKey,
      displayClose,
    }: {
      children: ReactNode;
      modalKey: string;
      displayClose?: string;
    }) => {
      return modals.includes(`${modalKey}Modal`) ? (
        <ModalPortal modalKey={`${modalKey}Modal`}>
          <ModalContainer
            isOpen
            onClose={useBlur ? () => close(modalKey) : () => {}}
            displayClose={displayClose}
          >
            {children}
          </ModalContainer>
        </ModalPortal>
      ) : null;
    },
    [modals, useBlur, close],
  );

  return {
    Modal,
    open,
    close,
  };
};

export default useModal;
