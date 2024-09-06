import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { commentQueryOptions } from '@/types/comment.prisma';
import { Comment } from '@/types/post';
import prisma from '../../../../../../prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const comments = await prisma.postComments.findMany({
      where: {
        postId: id,
      },
      ...commentQueryOptions,
    });

    const response: NextResponse<Comment[]> = NextResponse.json(comments, {
      status: 200,
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '댓글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // TODO: 토큰을 통해 유저 정보 확인

    const { id } = params;
    const { content } = await req.json();

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

    if (!id || !content) {
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
