import { NextRequest, NextResponse } from 'next/server';
import { postImages } from '@/services/images';
import {
  commentQueryOptions,
  CommentResult,
  CommentWithReply,
} from '@/types/comment.prisma';
import { CreatePostResponse } from '@/types/post';
import {
  FormattedPostDetail,
  postDetailQueryOptions,
} from '@/types/postDetail.prisma';
import { cleanupTempImages, moveImages } from '@/utils/s3';
import prisma from '../../../../../prisma/client';

function buildCommentTree(comments: CommentResult[]): CommentWithReply[] {
  const commentMap: { [key: number]: CommentWithReply } = {};
  const rootComments: CommentWithReply[] = [];

  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentId === null) {
      rootComments.push(commentMap[comment.id]);
    } else {
      const parentComment = commentMap[comment.parentId];
      if (parentComment) {
        parentComment.replies.push(commentMap[comment.id]);
      }
    }
  });

  return rootComments;
}

// 댓글의 deletedAt이 있으면 content를 삭제된 댓글로 변경
function formatCommentContent(comment: CommentWithReply[]): CommentWithReply[] {
  return comment.map((c) => {
    if (c.deletedAt) {
      return {
        ...c,
        content: '삭제된 댓글입니다.',
        replies: formatCommentContent(c.replies),
      };
    }
    return {
      ...c,
      replies: formatCommentContent(c.replies),
    };
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    // id로 글 조회
    const postDetail = await prisma.posts.findUnique({
      where: { id },
      ...postDetailQueryOptions,
    });

    if (!postDetail) {
      return NextResponse.json(
        { message: '해당 글이 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    // id에 맞는 댓글 조회
    const comments = await prisma.postComments.findMany({
      ...commentQueryOptions,
      where: {
        postId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const formattedComments = buildCommentTree(comments);
    const formattedCommentsWithDeleted =
      formatCommentContent(formattedComments);

    const formattedTags = {
      ...postDetail,
      postTag: postDetail.postTag.map((tag) => tag.tags),
      comments: formattedCommentsWithDeleted,
    };

    const response: NextResponse<FormattedPostDetail> = NextResponse.json(
      {
        ...formattedTags,
        comments: {
          lists: formattedCommentsWithDeleted,
          totalCount: comments.length,
        },
      },
      { status: 200 },
    );

    await prisma.posts.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '글 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {}

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tags = formData.getAll('tags') as string[];
    const thumbnail = formData.get('thumbnail') as File;
    const published = (formData.get('published') as string) === 'true';
    const originUrl = formData.get('originUrl') as string;
    const newUrl = formData.get('newUrl') as string;
    const projectId = Number(formData.get('projectId') as string);

    // 필수 필드 확인
    if (!title || !content || !tags || !originUrl || !projectId) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 },
      );
    }

    if (newUrl !== originUrl) {
      // 이미 존재하는 id인지 확인
      const existingPost = await prisma.posts.findUnique({
        where: { id: newUrl },
      });

      if (existingPost) {
        return NextResponse.json(
          { message: '이미 존재하는 URL입니다.' },
          { status: 400 },
        );
      }
    }

    if (thumbnail.size) {
      // thumbnail 업로드
      const thumbnailUrl = await postImages({
        file: thumbnail,
        folder: `posts/${newUrl ? newUrl : originUrl}`,
      });

      await prisma.posts.update({
        where: { id: originUrl },
        data: {
          thumbnail: thumbnailUrl.imageUrl,
        },
      });
    }

    // 현재 게시물의 내용에서 이미지 URL 추출
    const imageUrlRegex = /https:\/\/.*?\.amazonaws\.com\/posts\/[^\s"')]+/g;
    const usedImages = content.match(imageUrlRegex) || [];

    const updatedContent = await moveImages(
      newUrl ? newUrl : originUrl,
      content,
      usedImages,
    );

    const updatedPost = await prisma.posts.update({
      where: { id: originUrl },
      data: {
        id: newUrl ? newUrl : originUrl,
        title,
        content: updatedContent,
        published,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    await cleanupTempImages();

    await prisma.postTags.deleteMany({
      where: { postId: updatedPost.id },
    });

    await Promise.all(
      tags.map(async (tag) => {
        const newTag = await prisma.tags.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
        await prisma.postTags.upsert({
          where: {
            postId_tagId: {
              postId: updatedPost.id,
              tagId: newTag.id,
            },
          },
          update: {},
          create: {
            tagId: newTag.id,
            postId: updatedPost.id,
          },
        });
      }),
    );

    const response: NextResponse<CreatePostResponse> = NextResponse.json(
      { id: updatedPost.id },
      { status: 200 },
    );

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: '글 수정 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {}
