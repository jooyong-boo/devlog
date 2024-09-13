import { useEffect, useRef, useState } from 'react';

const useInputClick = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    setIsInputActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as EventListener,
      );
    };
  }, []);

  return {
    isInputActive,
    inputRef,
    handleInputClick,
  };
};

export default useInputClick;
