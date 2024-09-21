import Title from '@/components/Title';
import ItemList from '@/containers/project/ItemList';
import InnerLayout from '@/layouts/InnerLayout';
import { getProjects } from '@/services/projects';

const page = async () => {
  const projects = await getProjects();

  return (
    <InnerLayout className="gap-8">
      <Title size="large" borderBottom>
        프로젝트
      </Title>
      <ItemList lists={projects} />
    </InnerLayout>
  );
};

export default page;
