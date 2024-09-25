'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImageSvg } from '@/assets/svg/editor/index';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  originSrc?: string;
}

const ImageInput = ({ name, label, originSrc, id }: ImageInputProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [img, setImg] = useState<string>(originSrc || '');

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files === null) return;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result as string);
    };
  };

  const handleClickUploadButton = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor="image" className="text-lg font-bold">
          {label}
        </label>
      )}
      <div className="relative h-56 w-full overflow-hidden rounded-lg">
        <Button
          onClick={handleClickUploadButton}
          className="absolute z-10 flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-200 opacity-60 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-950"
        >
          <p className="text-slate-900 dark:text-slate-50">
            {img ? '이미지 변경' : '이미지 업로드'}
          </p>
          <ImageSvg
            width={80}
            height={80}
            className="fill-slate-900 dark:fill-slate-50"
          />
        </Button>
        {(originSrc || img) && (
          <Image
            src={originSrc && !img ? originSrc : img}
            alt={name}
            fill
            className="object-cover"
          />
        )}
        <Input
          id={id}
          name={name}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleChangeImg}
          ref={imageRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageInput;
