import { getData, patchData, postData } from '@/services/customAxios';
import {
  CreateComment,
  DeleteComment,
  UpdateComment,
} from '@/types/comment.prisma';
import {
  CreatePostRequest,
  PostDetailNavigationResponse,
  UpdatePost,
} from '@/types/post';
import { FormattedPost, postQueryOptions } from '@/types/post.prisma';
import { FormattedPostDetail } from '@/types/postDetail.prisma';
import prisma from '../../prisma/client';

interface GetPostsRequest {
  cursor?: string;
  count?: number;
}

export const getPosts = async ({ cursor, count = 5 }: GetPostsRequest) => {
  try {
    const postLists = await prisma.posts.findMany({
      ...postQueryOptions,
      skip: cursor ? 1 : 0,
      take: count,
      ...(cursor && { cursor: { id: cursor } }),
    });

    const formattedTags = postLists.map((post) => {
      return {
        ...post,
        postTag: post.postTag.map((tag) => tag.tags),
      };
    });

    return formattedTags;
  } catch (e) {
    throw e;
  }
};

export const createPost = async ({
  title,
  content,
  tags,
  thumbnail,
  published,
  url,
  projectId,
}: CreatePostRequest): Promise<FormattedPost> => {
  const formData = new FormData();

  // updatedThumbnail을 File 객체로 변환
  const updatedThumbnail = new File([thumbnail], 'thumbnail', {
    type: thumbnail.type,
    lastModified: thumbnail.lastModified,
  });

  formData.append('title', title);
  formData.append('content', content);
  tags.forEach((tag) => formData.append('tags', tag));
  formData.append('thumbnail', updatedThumbnail);
  formData.append('published', published ? 'public' : 'private');
  formData.append('url', url);
  formData.append('projectId', projectId.toString());

  return await postData('/api/posts', formData);
};

export const getPostDetail = async (id: string): Promise<FormattedPostDetail> =>
  getData<FormattedPostDetail>(`/api/posts/${id}`);

export const getPostDetailNavigation = async (
  id: string,
): Promise<PostDetailNavigationResponse> =>
  getData(`/api/posts/${id}/navigation`);

// 댓글 작성
export const postComment = async ({
  content,
  postId,
  parentId,
}: CreateComment) =>
  postData(`/api/posts/${postId}/comments`, { content, parentId });

// 댓글 수정
export const patchComment = async ({
  content,
  commentId,
  postId,
}: UpdateComment) =>
  patchData(`/api/posts/${postId}/comments/${commentId}`, { content });

// 댓글 삭제
export const deleteComment = async ({ commentId, postId }: DeleteComment) =>
  patchData(`/api/posts/${postId}/comments/${commentId}/delete`);

// 답글 작성
export const postCommentReply = async ({
  content,
  postId,
  parentId,
}: CreateComment) =>
  postData(`/api/posts/${postId}/comments/reply`, { content, parentId });

// 게시글 수정
export const editPost = async ({
  title,
  content,
  tags,
  thumbnail,
  published,
  url,
  projectId,
}: UpdatePost): Promise<FormattedPost> => {
  const formData = new FormData();

  // updatedThumbnail을 File 객체로 변환
  if (thumbnail) {
    const updatedThumbnail = new File([thumbnail], 'thumbnail', {
      type: thumbnail.type,
      lastModified: thumbnail.lastModified,
    });
    formData.append('thumbnail', updatedThumbnail);
  }
  formData.append('title', title);
  formData.append('content', content);
  tags.forEach((tag) => formData.append('tags', tag));
  formData.append('published', published ? 'public' : 'private');
  formData.append('url', url);
  formData.append('projectId', projectId.toString());

  return await patchData(`/api/posts/${url}`, formData);
};
