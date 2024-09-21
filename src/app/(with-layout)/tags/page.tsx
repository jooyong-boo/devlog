import Tags from '@/components/Tags';
import Title from '@/components/Title';
import InnerLayout from '@/layouts/InnerLayout';
import { getTags } from '@/services/tags';

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
