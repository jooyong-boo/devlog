import Image from 'next/image';
import { cn } from '@/utils/cn';

interface FullWidthImageProps {
  aspectRatio: string;
  image?: string | null;
  name: string;
}

const FullWidthImage = ({
  image,
  name,
  aspectRatio = '4/2.5',
}: FullWidthImageProps) => {
  return (
    <div className={cn(`relative aspect-[${aspectRatio}] sm:aspect-square`)}>
      <Image
        src={image || 'https://placehold.co/600x400'}
        alt={name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
};

export default FullWidthImage;
