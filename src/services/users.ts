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

export const editUsers = async (data: {
  nickname: string;
  profile: File;
}): Promise<void> => {
  const formData = new FormData();
  formData.append('nickname', data.nickname);
  if (data.profile.size) {
    formData.append('profile', data.profile);
  }
  await postData('/api/user', data);
};
