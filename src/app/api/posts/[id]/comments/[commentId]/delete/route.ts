import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '../../../../../../../../prisma/client';

// 댓글 삭제
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  try {
    const { id, commentId } = params;

    const session = await auth();

    const userInfo = await prisma.users.findUnique({
      where: { email: session?.user?.email || '' },
    });

    if (!userInfo) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const comment = await prisma.postComments.findFirst({
      where: {
        postId: id,
        id: Number(commentId),
        userId: userInfo.id,
      },
    });

    if (!comment) {
      return NextResponse.json(
        { message: '해당 댓글을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const updatedComment = await prisma.postComments.update({
      where: {
        id: Number(commentId),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: '댓글 수정 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
