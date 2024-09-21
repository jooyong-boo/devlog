import { getData } from '@/services/customAxios';
import { TagsResult } from '@/types/tags.prisma';

export const getTags = async (): Promise<TagsResult[]> => {
  return await getData('/api/tags');
};
