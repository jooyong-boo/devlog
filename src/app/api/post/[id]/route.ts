import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // id로 글 조회
    const postDetail = await prisma.posts.findUnique({
      where: {
        id: String(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        postTag: {
          select: {
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        thumbnail: true,
        viewCount: true,
      },
    });
    // id에 맞는 댓글 조회
    const comments = await prisma.postComments.findMany({
      where: {
        postId: id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    const formattedTags = postDetail?.postTag.map((tag) => tag.tags);

    const res = {
      postDetail: {
        ...postDetail,
        tags: formattedTags,
        comments,
      },
    };

    return NextResponse.json(res, { status: 200 });
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
