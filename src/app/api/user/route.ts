import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth } from '@/auth';
import { postImages } from '@/services/images';
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

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 401 },
      );
    }

    const { id } = session.user;
    // formData로 전달된 데이터를 추출
    const formData = await req.formData();
    const nickname = formData.get('nickname') as string | undefined;
    const profile = formData.get('profile') as File | undefined;

    // 필수 필드 확인
    if (!id) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 400 },
      );
    }

    // 사용자의 이미지 s3에 업로드
    const { imageUrl } = profile
      ? await postImages({
          file: profile,
          folder: `users/${id}`,
        })
      : { imageUrl: '' };

    console.log('imageUrl', imageUrl);

    if (imageUrl) {
      await prisma.users.update({
        where: { id },
        data: {
          profile: imageUrl,
        },
      });
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        nickname,
      },
    });

    return NextResponse.json(
      { message: '회원 정보가 수정되었습니다.', userInfo: updatedUser },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: '회원 정보 수정 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
