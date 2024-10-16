import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Menu } from '@/assets/svg/index';
import Button from '@/components/Button';
import { ProjectResult } from '@/types/project.prisma';

interface ListItemProps {
  item: ProjectResult;
  id: string | number;
}

const ListItem = ({ item, id }: ListItemProps) => {
  const { _count, desc, image, name } = item;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center rounded-md bg-slate-200 p-2 dark:bg-slate-700"
    >
      <div>
        <Menu width={24} heigth={24} />
      </div>
      <Image
        src={
          image ||
          'https://devlog-production.s3.ap-northeast-2.amazonaws.com/common/default.png'
        }
        alt={name}
        width={40}
        height={40}
        className="mx-4 aspect-square rounded-full object-cover"
      />
      <div>
        <p className="text-slate-200">{name}</p>
        <p className="text-xs text-slate-400">{_count.posts} Posts</p>
      </div>
      <div className="flex flex-grow justify-end">
        <p className="text-slate-200">{desc}</p>
      </div>
      <div className="flex flex-grow justify-end">
        <button className="fill-slate-300">
          <Edit width={22} height={22} />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
