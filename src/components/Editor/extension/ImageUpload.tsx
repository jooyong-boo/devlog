import { useRef } from 'react';
import { ImageSvg } from '@/assets/svg/editor/index';
import { ToolbarProps } from '@/components/Editor/Toolbar';
import { postImages } from '@/services/images';

interface ImageUploadProps extends ToolbarProps {
  path?: string;
}

const ImageUpload = ({
  editor,
  path = 'posts/temporary',
}: ImageUploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const result = await postImages({ file, folder: path });

    editor.chain().focus().setImage({ src: result.imageUrl }).run();
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
