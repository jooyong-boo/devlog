import { getData, postData } from '@/services/customAxios';
import { CreateProjectRequest } from '@/types/project';
import { ProjectResult } from '@/types/project.prisma';

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
