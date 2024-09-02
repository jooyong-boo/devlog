import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';

const page = async () => {
  const getPosts = async () => {
    const res = await fetch(`${process.env.URL}/api/posts`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  };

  const posts = await getPosts();

  if (!posts) {
    return <div>Loading...</div>;
  }
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
