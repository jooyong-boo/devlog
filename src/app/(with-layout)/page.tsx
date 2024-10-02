import { ArrowRight } from '@/assets/svg/index';
import CustomLink from '@/components/CustomLink';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
import { getPosts } from '@/services/posts';

const Home = async () => {
  const result = await getPosts({ count: 5 });

  const { posts } = result;

  return (
    <InnerLayout>
      <Title size="large" borderBottom>
        최신글
      </Title>
      <ArticleList articleList={posts} />
      <div className="flex justify-end">
        <CustomLink href="/posts">
          모든 글 보기
          <ArrowRight width={16} height={16} />
        </CustomLink>
      </div>
    </InnerLayout>
  );
};

export default Home;
