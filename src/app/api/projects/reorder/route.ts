import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function PATCH(req: NextRequest) {
  const { movedSort, targetSort } = await req.json();

  try {
    await prisma.$transaction(async (tx) => {
      const allProjects = await tx.projects.findMany({
        orderBy: { sort: 'asc' },
      });

      const movedProject = allProjects.find((p) => p.sort === movedSort);
      if (!movedProject) throw new Error('Moved project not found');

      let newSort = targetSort;
      for (const project of allProjects) {
        if (project.id === movedProject.id) continue;

        if (movedSort < targetSort) {
          if (project.sort > movedSort && project.sort <= targetSort) {
            await tx.projects.update({
              where: { id: project.id },
              data: { sort: project.sort - 1 },
            });
          }
        } else {
          if (project.sort >= targetSort && project.sort < movedSort) {
            await tx.projects.update({
              where: { id: project.id },
              data: { sort: project.sort + 1 },
            });
          }
        }
      }

      await tx.projects.update({
        where: { id: movedProject.id },
        data: { sort: newSort },
      });
    });

    const allProjects = await prisma.projects.findMany({
      orderBy: { sort: 'asc' },
    });

    return NextResponse.json(allProjects);
  } catch (error) {
    console.error('Error updating project order:', error);
    return NextResponse.json(
      { error: 'Failed to update project order' },
      { status: 500 },
    );
  }
}
