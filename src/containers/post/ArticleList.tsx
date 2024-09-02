import Article, { ArticleProps } from '@/containers/post/Article';

interface ArticleListProps {
  articleList: ArticleProps[];
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
