import { NextRequest, NextResponse } from 'next/server';
import { TagsResult } from '@/types/tags.prisma';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const tagList = await prisma.tags.findMany({
      select: {
        id: true,
        name: true,
        postTag: true,
      },
    });

    const response: NextResponse<TagsResult[]> = NextResponse.json(tagList, {
      status: 200,
    });
    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '태그 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
