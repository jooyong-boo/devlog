import { NextRequest, NextResponse } from 'next/server';
import { oAuthProviders, SignUpRequestData } from '@/types/auth';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  const users = await prisma.users.findMany();
  return NextResponse.json({ users }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { email, nickname, id, profile, accessToken }: SignUpRequestData =
      await req.json();

    // 필수 필드 확인
    if (!email || !nickname || !profile || !id || !accessToken) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      );
    }

    // 1. 이메일 중복 확인
    const existingUserByEmail = await prisma.users.findUnique({
      where: { email },
    });
    if (!existingUserByEmail) {
      const newUser = await prisma.users.create({
        data: {
          email,
          nickname,
          id,
          profile,
          roleId: 1,
          oauthId:
            oAuthProviders.github.provider === accessToken.provider ? 1 : 2,
        },
      });

      return NextResponse.json(
        { message: '회원가입이 완료되었습니다.', user: newUser },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { message: '이미 가입된 이메일입니다.' },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
