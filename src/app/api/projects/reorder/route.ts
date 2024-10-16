import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function PATCH(req: NextRequest) {
  const { movedId, targetId } = await req.json();

  try {
    await prisma.$transaction(async (tx) => {
      const movedProject = await tx.projects.findUnique({
        where: { id: movedId },
        select: { sort: true },
      });
      const targetProject = await tx.projects.findUnique({
        where: { id: targetId },
        select: { sort: true },
      });

      if (!movedProject || !targetProject) {
        throw new Error('Project not found');
      }

      // 두 프로젝트의 sort 값을 교환
      await tx.projects.update({
        where: { id: movedId },
        data: { sort: targetProject.sort },
      });

      await tx.projects.update({
        where: { id: targetId },
        data: { sort: movedProject.sort },
      });
    });

    return NextResponse.json({ message: 'Project order updated successfully' });
  } catch (error) {
    console.error('Error updating project order:', error);
    return NextResponse.json(
      { error: 'Failed to update project order' },
      { status: 500 },
    );
  }
}
