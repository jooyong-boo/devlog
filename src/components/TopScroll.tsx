'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash-es';
import { ArrowUp } from '@/assets/svg/index';
import { cn } from '@/utils/cn';

const TopScroll = () => {
  const [show, setShow] = useState(false);
  const beforeScrollY = useRef(100);

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;
        if (beforeScrollY.current <= currentScrollY) {
          setShow(true);
        } else {
          setShow(false);
        }
      }, 300),
    [],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, [handleScroll]);

  return (
    <div
      className={cn(
        `fixed bottom-5 right-5 rounded-full bg-sky-600 p-3 dark:bg-orange-600`,
        show ? 'visible opacity-100' : 'invisible opacity-0',
        'transition-opacity duration-300',
      )}
    >
      <button onClick={moveTop} className="flex">
        <ArrowUp />
      </button>
    </div>
  );
};

export default TopScroll;
