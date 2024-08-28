import { useRef } from 'react';
import { ImageSvg } from '@/assets/svg/editor/index';
import { ToolbarProps } from '@/components/Editor/Toolbar';

const ImageUpload = ({ editor }: ToolbarProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: imageUrl }).run();

    const fileExt = file.name.split('.').pop();
    const fullFilename = `${fileExt}`;
  };

  const handleClickUpload = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <button type="button" onClick={handleClickUpload}>
      <ImageSvg />
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUploadImage}
      />
    </button>
  );
};

export default ImageUpload;
