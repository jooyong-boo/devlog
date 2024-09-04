import { AxiosResponse } from 'axios';
import { getData } from '@/services/customAxios';
import { PostDetailNavigationResponse } from '@/types/post';
import { FormattedPost } from '@/types/post.prisma';
import { FormattedPostDetail } from '@/types/postDetail.prisma';

interface GetPostsRequest {
  cursor?: string;
}

export const getPosts = async ({
  cursor,
}: GetPostsRequest): Promise<FormattedPost[]> =>
  getData('/api/posts', {}, { cursor });

export const getPostDetail = async (id: string): Promise<FormattedPostDetail> =>
  getData<FormattedPostDetail>(`/api/posts/${id}`);

export const getPostDetailNavigation = async (
  id: string,
): Promise<PostDetailNavigationResponse> =>
  getData(`/api/posts/${id}/navigation`);
