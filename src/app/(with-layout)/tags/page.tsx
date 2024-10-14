import { Metadata } from 'next';
import Tags from '@/components/Tags';
import Title from '@/components/Title';
import InnerLayout from '@/layouts/InnerLayout';
import { getTags } from '@/services/tags';

export const metadata: Metadata = {
  title: '태그',
  description: '모든 태그를 볼 수 있는 페이지입니다.',
};

const page = async () => {
  const tagList = await getTags();

  return (
    <InnerLayout className="gap-8">
      <Title size="large" borderBottom>
        태그
      </Title>
      <Tags tagList={tagList} />
    </InnerLayout>
  );
};

export default page;
