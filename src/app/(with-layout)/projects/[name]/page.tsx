import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getProjectRelatedPosts } from '@/services/projects';

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const posts = await getProjectRelatedPosts(name);

  return (
    <InnerLayout>
      <Title size="large" borderBottom>
        {name}
      </Title>
      <ArticleList articleList={posts} />
    </InnerLayout>
  );
};

export default page;
