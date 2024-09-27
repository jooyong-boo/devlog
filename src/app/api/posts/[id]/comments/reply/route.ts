import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '../../../../../../../prisma/client';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { content, parentId }: { content: string; parentId?: number | null } =
      await req.json();

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

    if (!id || !content || !parentId) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      );
    }

    const newComment = await prisma.postComments.create({
      data: {
        userId: userInfo.id,
        postId: id,
        content,
        parentId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: '댓글 작성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
