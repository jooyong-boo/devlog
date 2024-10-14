import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getTagsRelatedPosts } from '@/services/tags';
import prisma from '../../../../../prisma/client';

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  return {
    title: decodeURIComponent(name),
    description: `${decodeURIComponent(name)} 태그와 관련된 글들을 모아놓은 페이지입니다.`,
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const tags = await prisma.tags.findMany();
  return tags.map((tag) => ({
    name: tag.name,
  }));
}

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
