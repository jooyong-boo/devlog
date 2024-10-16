import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getProjectRelatedPosts } from '@/services/projects';
import prisma from '../../../../../prisma/client';

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;

  return {
    title: decodeURIComponent(name),
    description: `${decodeURIComponent(name)} 프로젝트에 관련된 글들을 모아놓은 페이지입니다.`,
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await prisma.projects.findMany();
  return projects.map((project) => ({
    name: project.name,
  }));
}

const page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { page?: string; count?: string };
}) => {
  const { name } = params;
  const { page, count } = searchParams;

  const result = await getProjectRelatedPosts({
    name,
    page,
    count,
  });

  const { pagination, posts } = result;

  return (
    <InnerLayout>
      <Title size="large" borderBottom>
        {decodeURIComponent(name)}
      </Title>
      <ArticleList articleList={posts} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        basePath={`/projects/${name}`}
      />
    </InnerLayout>
  );
};

export default page;
