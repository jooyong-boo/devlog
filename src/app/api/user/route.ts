import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { oAuthProviders, SignUpRequestData } from '@/types/auth';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    // 쿠키 확인
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
      secureCookie: process.env.NODE_ENV === 'production',
      salt:
        process.env.NODE_ENV === 'production'
          ? '__Secure-authjs.session-token'
          : 'authjs.session-token',
    });

    if (token === null || !token.email) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 401 },
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        email: token.email,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        profile: true,
        oauthProvider: {
          select: {
            name: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: '회원 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
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
      { message: '로그인이 완료되었습니다.' },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
