'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ListItem from '@/containers/admin/projects/ListItem';
import useToast from '@/hooks/useToast';
import { patchProjectOrder } from '@/services/projects';
import { ProjectResult } from '@/types/project.prisma';

interface DnDProjectsListProps {
  lists: ProjectResult[];
}

const DnDProjectsList = ({ lists }: DnDProjectsListProps) => {
  const { enqueueSuccessBar, enqueueErrorBar } = useToast();

  const [sortList, setSortList] = useState<ProjectResult[]>(lists);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const prevSortList = sortList;

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortList.findIndex(
        (list) => String(list.sort) === active.id,
      );
      const newIndex = sortList.findIndex(
        (list) => String(list.sort) === over.id,
      );
      setSortList((sortList) => {
        const newList = arrayMove(sortList, oldIndex, newIndex);
        return [...newList];
      });

      try {
        const result = await patchProjectOrder({
          movedSort: sortList[oldIndex].sort,
          targetSort: sortList[newIndex].sort,
        });
        enqueueSuccessBar('순서가 변경되었습니다.', 'success');
      } catch (error) {
        setSortList(prevSortList);
        enqueueErrorBar('순서 변경에 실패했습니다.', 'error');
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sortList.map((item) => item.sort.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {sortList.map((list) => (
            <ListItem key={list.id} item={list} id={list.sort.toString()} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DnDProjectsList;
