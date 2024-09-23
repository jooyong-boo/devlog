import { NextRequest, NextResponse } from 'next/server';
import { CreateProjectRequest } from '@/types/project';
import { projectQueryOptions, ProjectResult } from '@/types/project.prisma';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const projectList = await prisma.projects.findMany({
      ...projectQueryOptions,
    });

    const response: NextResponse<ProjectResult[]> = NextResponse.json(
      projectList,
      {
        status: 200,
      },
    );
    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '프로젝트 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { name, image, desc }: CreateProjectRequest = await req.json();

  try {
    const project = await prisma.projects.findFirst({
      where: {
        name,
      },
    });

    if (project) {
      return NextResponse.json(
        { message: '이미 존재하는 프로젝트입니다.' },
        { status: 400 },
      );
    }

    const projectSort = await prisma.projects.findFirst({
      select: {
        sort: true,
      },
      orderBy: {
        sort: 'desc',
      },
    });

    await prisma.projects.create({
      data: {
        name,
        image,
        desc,
        sort: projectSort ? projectSort.sort + 1 : 0,
      },
    });

    const projectList = await prisma.projects.findMany({
      ...projectQueryOptions,
    });

    const response: NextResponse<ProjectResult[]> = NextResponse.json(
      projectList,
      {
        status: 200,
      },
    );
    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '프로젝트 추가 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
