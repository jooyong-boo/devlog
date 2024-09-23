import Image from 'next/image';
import { ArrowRight } from '@/assets/svg/index';
import CustomLink from '@/components/CustomLink';
import FullWidthImage from '@/components/Image/FullWidthImage';
import { ProjectResult } from '@/types/project.prisma';

const Item = ({ desc, id, image, name }: ProjectResult) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border border-slate-300 dark:border-slate-600">
      <FullWidthImage image={image} name={name} />
      <div className="flex flex-col gap-2 px-6 py-4">
        <h2 className="text-2xl">{name}</h2>
        {desc && <p className="text-overflow-3 text-slate-400">{desc}</p>}
        <CustomLink
          href={`/projects/${id}`}
          className="flex items-center gap-0.5"
        >
          Learn more <ArrowRight width={16} height={16} />
        </CustomLink>
      </div>
    </div>
  );
};

export default Item;
