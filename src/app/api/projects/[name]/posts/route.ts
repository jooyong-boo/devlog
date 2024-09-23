import { NextResponse } from 'next/server';
import {
  postsByProjectQueryOptions,
  PostsByProjectResult,
} from '@/types/project.prisma';
import prisma from '../../../../../../prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const { name } = params;

  // project에서 name에 일치하는 posts를 찾아서 반환
  const posts = await prisma.posts.findMany({
    ...postsByProjectQueryOptions,
    where: {
      ...postsByProjectQueryOptions.where,
      project: {
        name,
      },
    },
  });

  // rawPosts를 PostsByProjectResult 타입으로 변환
  const relatedPosts: PostsByProjectResult = posts.map((post) => ({
    ...post,
    postTag: post.postTag.map((tag) => tag.tags),
  }));

  const response: NextResponse<PostsByProjectResult> = NextResponse.json(
    relatedPosts,
    { status: 200 },
  );

  return response;
}
