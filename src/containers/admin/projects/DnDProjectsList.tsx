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
import { patchProjectOrder } from '@/services/projects';
import { ProjectResult } from '@/types/project.prisma';

interface DnDProjectsListProps {
  lists: ProjectResult[];
}

const DnDProjectsList = ({ lists }: DnDProjectsListProps) => {
  const [sortList, setSortList] = useState<ProjectResult[]>(lists);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const prevSortList = sortList;

    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortList((sortList) => {
        const oldIndex = sortList.findIndex((list) => list.id === active.id);
        const newIndex = sortList.findIndex((list) => list.id === over.id);
        const newList = arrayMove(sortList, oldIndex, newIndex);

        return [...newList];
      });

      try {
        patchProjectOrder({ movedId: active.id, targetId: over.id });
      } catch (error) {
        setSortList(prevSortList);
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortList} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {sortList.map((list) => (
            <ListItem key={list.id} item={list} id={list.id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DnDProjectsList;
