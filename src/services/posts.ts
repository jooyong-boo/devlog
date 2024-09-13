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
  return await postData('/api/posts', {
    title,
    content,
    tags,
    thumbnail,
    published,
    url,
    projectId,
  });
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
