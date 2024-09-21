import Item from '@/containers/project/Item';
import { ProjectResult } from '@/types/project.prisma';

interface ItemListProps {
  lists: ProjectResult[];
}

const ItemList = ({ lists }: ItemListProps) => {
  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
      {lists.map((list) => (
        <Item key={list.id} {...list} />
      ))}
    </div>
  );
};

export default ItemList;
