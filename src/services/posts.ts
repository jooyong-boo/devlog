import { getData, postData } from '@/services/customAxios';
import { PostDetailNavigationResponse } from '@/types/post';
import { postQueryOptions } from '@/types/post.prisma';
import { FormattedPostDetail } from '@/types/postDetail.prisma';
import prisma from '../../prisma/client';

interface GetPostsRequest {
  cursor?: string;
}

export const getPosts = async ({ cursor }: GetPostsRequest) => {
  try {
    const postLists = await prisma.posts.findMany({
      ...postQueryOptions,
      skip: cursor ? 1 : 0,
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
