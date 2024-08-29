import Comment, { CommentProps } from '@/containers/post/Comment';

interface CommentListProps {
  lists: CommentProps[];
}

const CommentList = ({ lists }: CommentListProps) => {
  return (
    <div className="flex flex-col divide-y divide-slate-400 dark:divide-slate-700">
      {lists.map((list) => {
        const { alt, date, description, name, replyCount, src } = list;
        return (
          <Comment
            key={name}
            alt={alt}
            date={date}
            description={description}
            name={name}
            replyCount={replyCount}
            src={src}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
