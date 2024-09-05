import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getPosts } from '@/services/posts';

const page = async () => {
  const posts = await getPosts({});

  return (
    <InnerLayout>
      <Title size="large" borderBottom>
        모든글
      </Title>
      <ArticleList articleList={posts} />
      <Pagination currentPage={1} totalPages={3} basePath="/posts" />
    </InnerLayout>
  );
};

export default page;
