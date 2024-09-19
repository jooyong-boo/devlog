import { getData, postData } from '@/services/customAxios';
import { CreatePostRequest, PostDetailNavigationResponse } from '@/types/post';
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

export const postComment = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => postData(`/api/posts/${id}/comments`, { content });
