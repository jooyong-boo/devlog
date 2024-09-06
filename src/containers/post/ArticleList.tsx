import Article from '@/containers/post/Article';
import { FormattedPost } from '@/types/post.prisma';

interface ArticleListProps {
  articleList: FormattedPost[];
}

const ArticleList = ({ articleList }: ArticleListProps) => {
  return (
    <div className="divide-y divide-slate-400">
      {articleList.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
};

export default ArticleList;
