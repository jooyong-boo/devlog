import { Account } from 'next-auth';
import { patchData, postData } from '@/services/customAxios';
import { User } from '@/types/user';

export const postUsers = async (data: {
  email: string;
  id: string;
  nickname: string;
  profile: string;
  accessToken: Account;
}): Promise<void> => {
  await postData('/api/user', data);
};

interface EditUsersResponse {
  message: string;
  userInfo: User;
}

export const editUsers = async ({
  nickname,
  profile,
}: {
  nickname?: string;
  profile?: File;
}): Promise<EditUsersResponse> => {
  const formData = new FormData();
  if (nickname) formData.append('nickname', nickname);
  if (profile?.size) formData.append('profile', profile);
  return await patchData('/api/user', formData);
};
