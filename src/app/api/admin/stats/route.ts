import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const [user, posts, projects] = await Promise.all([
      await prisma.users.count(),
      await prisma.posts.count(),
      await prisma.projects.count(),
    ]);

    return NextResponse.json(
      {
        totalUser: user,
        totalPosts: posts,
        totalProjects: projects,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: '통계 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
