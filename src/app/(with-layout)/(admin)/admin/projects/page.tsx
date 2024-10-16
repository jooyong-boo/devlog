import Button from '@/components/Button';
import Title from '@/components/Title';
import DnDProjectsList from '@/containers/admin/projects/DnDProjectsList';
import InnerLayout from '@/layouts/InnerLayout';
import { getProjects } from '@/services/projects';

const page = async () => {
  const projectList = await getProjects();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Title>Projects</Title>
        <Button>New Project</Button>
      </div>
      <DnDProjectsList lists={projectList} />
    </div>
  );
};

export default page;
