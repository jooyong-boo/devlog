'use client';

import { useState } from 'react';
import { Public, Lock } from '@/assets/svg/index';
import Button from '@/components/Button';
import Title from '@/components/Title';

type Active = 'public' | 'private';

interface PublicSettingProps {
  name: string;
}

const PublicSetting = ({ name }: PublicSettingProps) => {
  const [activeButton, setActiveButton] = useState<Active>('public');

  const handleActiveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setActiveButton(name as Active);
  };

  return (
    <div className="flex flex-col gap-2">
      <Title size="small">공개 설정</Title>
      <div className="flex gap-2 fill-slate-300">
        <Button
          name="public"
          className="flex items-center gap-2 pl-3"
          size="half"
          outline
          onClick={handleActiveButton}
          active={activeButton === 'public'}
        >
          <Public />
          <span className="flex flex-1 items-center justify-center">
            전체 공개
          </span>
        </Button>
        <Button
          name="private"
          className="flex items-center gap-2 pl-3"
          size="half"
          outline
          onClick={handleActiveButton}
          active={activeButton === 'private'}
        >
          <Lock />
          <span className="flex flex-1 items-center justify-center">
            비공개
          </span>
        </Button>
      </div>
      <input type="hidden" name={name} value={activeButton} />
    </div>
  );
};

export default PublicSetting;
