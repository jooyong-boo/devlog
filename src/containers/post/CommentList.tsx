import Comment from '@/containers/post/Comment';
import { Comment as CommentType } from '@/types/post';

interface CommentListProps {
  lists: CommentType[];
}

const CommentList = ({ lists }: CommentListProps) => {
  return (
    <div className="flex flex-col divide-y divide-slate-400 dark:divide-slate-700">
      {lists.map((list) => {
        return <Comment key={list.id} {...list} />;
      })}
    </div>
  );
};

export default CommentList;
