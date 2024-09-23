import { getData } from '@/services/customAxios';
import { PostsByTagResult, TagWithCount } from '@/types/tags.prisma';

export const getTags = async (): Promise<TagWithCount[]> => {
  return await getData('/api/tags');
};

// 태그와 연관된 게시글 조회
export const getTagsRelatedPosts = async ({
  limit,
  page,
  tagName,
}: {
  tagName: string;
  page: number;
  limit: number;
}): Promise<PostsByTagResult> => {
  return await getData(
    `/api/tags/${tagName}/posts?page=${page}&limit=${limit}`,
  );
};
