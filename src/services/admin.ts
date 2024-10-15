import { getData } from '@/services/customAxios';
import { Stats } from '@/types/admin';

export const getStats = async (): Promise<Stats> => {
  return await getData('/api/admin/stats');
};
