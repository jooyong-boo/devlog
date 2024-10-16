import Title from '@/components/Title';
import CreateProject from '@/containers/admin/projects/CreateProject';
import DnDProjectsList from '@/containers/admin/projects/DnDProjectsList';
import { getProjects } from '@/services/projects';

const page = async () => {
  const projectList = await getProjects();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Title>Projects</Title>
        <CreateProject />
      </div>
      <DnDProjectsList lists={projectList} />
    </div>
  );
};

export default page;
