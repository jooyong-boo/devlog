import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getTagsRelatedPosts } from '@/services/tags';

const page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { page: string };
}) => {
  const { name } = params;
  const { page } = searchParams;

  const response = await getTagsRelatedPosts({
    tagName: name,
    page: 1,
    limit: 10,
  });

  return (
    <InnerLayout>
      <Title borderBottom>{decodeURIComponent(name)}</Title>
      <ArticleList articleList={response.posts} />
      <Pagination
        currentPage={Number(page)}
        totalPages={response.pagination.totalPages}
        basePath="/tags"
      />
    </InnerLayout>
  );
};

export default page;
