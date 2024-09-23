import { NextResponse } from 'next/server';
import {
  postCountByTagQueryOptions,
  postsByTagQueryOptions,
  PostsByTagResult,
} from '@/types/tags.prisma';
import prisma from '../../../../../../prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const { name } = params;

  const searchParams = new URL(request.url).searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    const [posts, totalPosts] = await Promise.all([
      prisma.posts.findMany({
        ...postsByTagQueryOptions,
        where: {
          ...postsByTagQueryOptions.where,
          postTag: {
            some: {
              tags: {
                name: name,
              },
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.posts.count({
        ...postCountByTagQueryOptions,
        where: {
          ...postCountByTagQueryOptions.where,
          postTag: {
            some: {
              tags: {
                name: name,
              },
            },
          },
        },
      }),
    ]);

    const formattedPosts = posts.map((post) => ({
      ...post,
      postTag: post.postTag.map((tag) => tag.tags),
    }));

    const response: NextResponse<PostsByTagResult> = NextResponse.json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
