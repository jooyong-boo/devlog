import { ArrowRight } from '@/assets/svg/index';
import CustomLink from '@/components/CustomLink';
import Title from '@/components/Title';
import ArticleList from '@/containers/post/ArticleList';
import InnerLayout from '@/layouts/InnerLayout';
export default function Home() {
  return (
    <main className="init-layout">
      <InnerLayout>
        <Title size="large" borderBottom>
          최신글
        </Title>
        <ArticleList />
        <div className="flex justify-end">
          <CustomLink href="/posts">
            모든 글 보기
            <ArrowRight width={16} height={16} />
          </CustomLink>
        </div>
      </InnerLayout>
    </main>
  );
}
