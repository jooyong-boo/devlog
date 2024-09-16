import { postData } from '@/services/customAxios';

interface PostImagesRequest {
  file: File;
  folder: string;
}

export const postImages = async ({
  file,
  folder,
}: PostImagesRequest): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  return await postData('/api/images', formData);
};
