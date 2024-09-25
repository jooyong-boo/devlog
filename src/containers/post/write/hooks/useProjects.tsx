import { useEffect, useState } from 'react';
import useToast from '@/hooks/useToast';
import { getProjects, postProjects } from '@/services/projects';
import { ProjectResult } from '@/types/project.prisma';

interface UseProjectsProps {
  projectId?: number;
}

const useProjects = ({ projectId }: UseProjectsProps) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useToast();
  const [projectList, setProjectList] = useState<ProjectResult[]>([]);
  const [projectName, setProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectResult | null>(
    null,
  );

  const handleChageProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleSelectProject = (project: ProjectResult) => {
    setSelectedProject(project);
  };

  const handleAddProject = async (name: string) => {
    try {
      await postProjects({ name, desc: '' });

      let res = await getProjects();

      setProjectList(res);
      setProjectName('');
      enqueueSuccessBar('프로젝트가 추가되었습니다.', 'success');
    } catch (e) {
      if (e instanceof Error) {
        enqueueErrorBar(e.message, 'error');
      }
    }
  };

  useEffect(() => {
    async function fetchProjectList() {
      let res = await getProjects();
      setProjectList(res);
    }
    fetchProjectList();
  }, []);

  useEffect(() => {
    if (projectId) {
      const project = projectList.find((project) => project.id === projectId);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [projectId, projectList]);

  return {
    projectList,
    projectName,
    selectedProject,
    handleAddProject,
    handleChageProjectName,
    handleSelectProject,
  };
};

export default useProjects;
