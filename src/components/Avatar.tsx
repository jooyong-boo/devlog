import Image from 'next/image';

type AvatarType = 'circle' | 'square';

export interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  type?: AvatarType;
}

function Avatar({ alt, src, size = 48, type = 'circle' }: AvatarProps) {
  return (
    <div
      className={`overflow-hidden ${type === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        objectFit="cover"
        className="h-auto w-full"
      />
    </div>
  );
}

export default Avatar;
