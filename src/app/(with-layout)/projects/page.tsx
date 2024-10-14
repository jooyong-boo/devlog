import { Metadata } from 'next';
import Title from '@/components/Title';
import ItemList from '@/containers/project/ItemList';
import InnerLayout from '@/layouts/InnerLayout';
import { getProjects } from '@/services/projects';

export const metadata: Metadata = {
  title: '프로젝트',
  description: '모든 프로젝트를 볼 수 있는 페이지입니다.',
};

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
