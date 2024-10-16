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
  return await postData<ProjectResult>('/api/projects', {
    ...data,
  });
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
  movedId,
  targetId,
}: {
  movedId: string | number;
  targetId: string | number;
}): Promise<void> => {
  return await patchData<void>('/api/projects/reorder', {
    movedId,
    targetId,
  });
};
