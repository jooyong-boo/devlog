import { NextRequest, NextResponse } from 'next/server';
import { commentQueryOptions } from '@/types/comment.prisma';
import {
  FormattedPostDetail,
  postDetailQueryOptions,
} from '@/types/postDetail.prisma';
import prisma from '../../../../../prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    // id로 글 조회
    const postDetail = await prisma.posts.findUnique({
      where: { id },
      ...postDetailQueryOptions,
    });

    if (!postDetail) {
      return NextResponse.json(
        { message: '해당 글이 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    // id에 맞는 댓글 조회
    const comments = await prisma.postComments.findMany({
      where: {
        postId: id,
      },
      ...commentQueryOptions,
    });

    const formattedTags = {
      ...postDetail,
      postTag: postDetail.postTag.map((tag) => tag.tags),
      comments,
    };

    const response: NextResponse<FormattedPostDetail> = NextResponse.json(
      formattedTags,
      { status: 200 },
    );

    await prisma.posts.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {}

export async function UPDATE(req: NextRequest) {}

export async function DELETE(req: NextRequest) {}
