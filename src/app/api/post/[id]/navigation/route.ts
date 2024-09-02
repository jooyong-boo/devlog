import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const currentPost = await prisma.posts.findFirst({
      where: { id },
      select: { createdAt: true, projectId: true },
    });

    if (!currentPost) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const previousPost = await prisma.posts.findFirst({
      where: {
        projectId: currentPost.projectId,
        createdAt: { lt: currentPost.createdAt },
      },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true },
    });

    const nextPost = await prisma.posts.findFirst({
      where: {
        projectId: currentPost.projectId,
        createdAt: { gt: currentPost.createdAt },
      },
      orderBy: { createdAt: 'asc' },
      select: { id: true, title: true },
    });

    return NextResponse.json(
      { prev: previousPost, next: nextPost },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: '이전/다음 글 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
