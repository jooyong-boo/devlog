import { getData, patchData, postData } from '@/services/customAxios';
import { CreateProjectRequest } from '@/types/project';
import {
  PostsByProjectPagination,
  ProjectResult,
} from '@/types/project.prisma';

export const getProjects = async (): Promise<ProjectResult[]> => {
  return await getData<ProjectResult[]>('/api/projects');
};

export const postProjects = async (
  data: CreateProjectRequest,
): Promise<ProjectResult> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('desc', data.desc);
  if (data.image) {
    formData.append('image', data.image);
  }

  return await postData<ProjectResult>('/api/projects', formData);
};

export const getProjectRelatedPosts = async ({
  name,
  count = 10,
  page = 1,
}: {
  name: string;
  count?: string | number;
  page?: string | number;
}): Promise<PostsByProjectPagination> => {
  return await getData(
    `/api/projects/${name}/posts`,
    {},
    {
      count,
      page,
    },
  );
};

export const patchProjectOrder = async ({
  movedSort,
  targetSort,
}: {
  movedSort: string | number;
  targetSort: string | number;
}): Promise<ProjectResult[]> => {
  return await patchData('/api/projects/reorder', {
    movedSort,
    targetSort,
  });
};
