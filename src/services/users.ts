import { Account } from 'next-auth';
import { postData } from '@/services/customAxios';

export const postUsers = async (data: {
  email: string;
  id: string;
  nickname: string;
  profile: string;
  accessToken: Account;
}): Promise<void> => {
  await postData('/api/user', data);
};
