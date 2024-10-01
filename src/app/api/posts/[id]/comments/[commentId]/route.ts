import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '../../../../../../../prisma/client';

// 댓글 수정
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  try {
    const { id, commentId } = params;
    const { content }: { content: string } = await req.json();

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

    if (!content) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
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
        content,
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
