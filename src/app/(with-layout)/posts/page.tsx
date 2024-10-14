import { Metadata } from 'next';
import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getPosts } from '@/services/posts';

export const metadata: Metadata = {
  title: '모든글',
  description: '모든 글을 볼 수 있는 페이지입니다.',
};

const page = async ({
  searchParams,
}: {
  searchParams: { page?: string; count?: string };
}) => {
  const { page, count } = searchParams;
  const result = await getPosts({ page, count });

  const { posts, pagination } = result;

  return (
    <InnerLayout>
      <Title size="large" borderBottom>
        모든글
      </Title>
      <ArticleList articleList={posts} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath="/posts"
      />
    </InnerLayout>
  );
};

export default page;
