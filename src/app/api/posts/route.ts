import { NextRequest, NextResponse } from 'next/server';
import { CreatePost } from '@/types/post';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get('cursor');

    const postLists = await prisma.posts.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        postTag: {
          select: {
            tags: true,
            postId: true,
            tagId: true,
          },
        },
        thumbnail: true,
        viewCount: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
    });

    const formattedTags = postLists.map((post) => {
      return {
        ...post,
        postTag: post.postTag.map((tag) => tag.tags),
      };
    });

    const res = formattedTags;

    return NextResponse.json(res, { status: 200 });
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
    const { title, content, tags, thumbnail, published, url }: CreatePost =
      await req.json();

    // 필수 필드 확인
    if (!title || !content || !tags || !url) {
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
            id: 1,
          },
        },
      },
    });

    tags.forEach(async (tag) => {
      const newTag = await prisma.tags.create({
        data: {
          name: tag,
        },
      });
      await prisma.postTags.create({
        data: {
          tagId: newTag.id,
          postId: newPost.id,
        },
      });
    });

    return NextResponse.json({ id: url }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: '글 작성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function UPDATE(req: NextRequest) {}

export async function DELETE(req: NextRequest) {}
