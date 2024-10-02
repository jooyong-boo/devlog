import { NextRequest, NextResponse } from 'next/server';
import {
  PostsByProjectPagination,
  postsByProjectQueryOptions,
  PostsByProjectResult,
} from '@/types/project.prisma';
import prisma from '../../../../../../prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } },
) {
  const { name } = params;

  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
  const count = parseInt(req.nextUrl.searchParams.get('count') || '10', 10);

  const totalPosts = await prisma.posts.count({
    where: {
      ...postsByProjectQueryOptions.where,
      project: {
        name,
      },
    },
  });

  const totalPages = Math.ceil(totalPosts / count);

  // project에서 name에 일치하는 posts를 찾아서 반환
  const posts = await prisma.posts.findMany({
    ...postsByProjectQueryOptions,
    where: {
      ...postsByProjectQueryOptions.where,
      project: {
        name,
      },
    },
    skip: (page - 1) * count,
    take: count,
  });

  const relatedPosts: PostsByProjectResult = posts.map((post) => ({
    ...post,
    postTag: post.postTag.map((tag) => tag.tags),
  }));

  const paginationInfo = {
    currentPage: page,
    totalPages: totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  const response: NextResponse<PostsByProjectPagination> = NextResponse.json(
    {
      posts: relatedPosts,
      pagination: paginationInfo,
    },
    { status: 200 },
  );

  return response;
}
