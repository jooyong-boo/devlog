import { NextRequest, NextResponse } from 'next/server';
import { postImages } from '@/services/images';
import { CreatePostResponse } from '@/types/post';
import {
  FormattedPost,
  PostListWithPagination,
  postQueryOptions,
} from '@/types/post.prisma';
import { cleanupTempImages, moveImages } from '@/utils/s3';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
    const count = parseInt(req.nextUrl.searchParams.get('count') || '10', 10);

    const totalPosts = await prisma.posts.count({
      where: postQueryOptions.where,
    });

    const totalPages = Math.ceil(totalPosts / count);

    const postLists = await prisma.posts.findMany({
      ...postQueryOptions,
      skip: (page - 1) * count,
      take: count,
    });

    const formattedTags = postLists.map((post) => ({
      ...post,
      postTag: post.postTag.map((tag) => tag.tags),
    }));

    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    const response: NextResponse<PostListWithPagination> = NextResponse.json(
      {
        posts: formattedTags,
        pagination: paginationInfo,
      },
      { status: 200 },
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
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tags = formData.getAll('tags') as string[];
    const thumbnail = formData.get('thumbnail') as File;
    const published = (formData.get('published') as string) === 'true';
    const url = formData.get('url') as string;
    const projectId = Number(formData.get('projectId') as string);

    // 필수 필드 확인
    if (!title || !content || !tags || !url || !projectId) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      );
    }

    // 이미 존재하는 id인지 확인
    const existingPost = await prisma.posts.findUnique({
      where: { id: url },
    });

    if (existingPost) {
      return NextResponse.json(
        { message: '이미 존재하는 글입니다.' },
        { status: 400 },
      );
    }

    // thumbnail 업로드
    const thumbnailUrl = await postImages({
      file: thumbnail,
      folder: `posts/${url}`,
    });

    // 현재 게시물의 내용에서 이미지 URL 추출
    const imageUrlRegex = /https:\/\/.*?\.amazonaws\.com\/posts\/[^\s"')]+/g;
    const usedImages = content.match(imageUrlRegex) || [];

    const updatedContent = await moveImages(url, content, usedImages);

    const newPost = await prisma.posts.create({
      data: {
        id: url,
        title,
        content: updatedContent,
        published,
        thumbnail: thumbnailUrl.imageUrl,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    await cleanupTempImages();

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

export async function DELETE(req: NextRequest) {}
