import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';

function page() {
  return (
    <InnerLayout>
      <Title size="large" borderBottom>
        모든글
      </Title>
      <ArticleList />
      <Pagination currentPage={1} totalPages={3} basePath="/posts" />
    </InnerLayout>
  );
}

export default page;
