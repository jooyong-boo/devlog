import { NextRequest, NextResponse } from 'next/server';
import { CreatePostRequest, CreatePostResponse } from '@/types/post';
import { FormattedPost, postQueryOptions } from '@/types/post.prisma';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get('cursor');
    const count = req.nextUrl.searchParams.get('count');

    const postLists = await prisma.posts.findMany({
      ...postQueryOptions,
      skip: cursor ? 1 : 0,
      take: Number(count),
      ...(cursor && { cursor: { id: cursor } }),
    });

    const formattedTags = postLists.map((post) => {
      return {
        ...post,
        postTag: post.postTag.map((tag) => tag.tags),
      };
    });

    const response: NextResponse<FormattedPost[]> = NextResponse.json(
      formattedTags,
      {
        status: 200,
      },
    );

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

// 글 작성
export async function POST(req: NextRequest) {
  try {
    const {
      title,
      content,
      tags,
      thumbnail,
      published,
      url,
      projectId,
    }: CreatePostRequest = await req.json();

    // 필수 필드 확인
    if (!title || !content || !tags || !url || !projectId) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      );
    }

    const newPost = await prisma.posts.create({
      data: {
        id: url,
        title,
        content,
        published,
        thumbnail,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    await Promise.all(
      tags.map(async (tag) => {
        const newTag = await prisma.tags.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
        await prisma.postTags.create({
          data: {
            tagId: newTag.id,
            postId: newPost.id,
          },
        });
      }),
    );

    const response: NextResponse<CreatePostResponse> = NextResponse.json(
      { id: url },
      { status: 200 },
    );

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '글 작성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {}

export async function DELETE(req: NextRequest) {}
