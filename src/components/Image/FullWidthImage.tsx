import Image from 'next/image';
import { cn } from '@/utils/cn';

interface FullWidthImageProps {
  image?: string | null;
  name: string;
}

const FullWidthImage = ({ image, name }: FullWidthImageProps) => {
  return (
    <div className={cn(`relative aspect-[4/2.5] w-full sm:aspect-square`)}>
      <Image
        src={image || 'https://placehold.co/600x400'}
        alt={name}
        fill
        priority
        sizes="(max-width: 640px) 100vw, (min-width: 640px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
};

export default FullWidthImage;
