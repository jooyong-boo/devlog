import Profile from '@/components/Profile';
import CommnetReplyInput from '@/containers/post/CommentReplyInput';
import { CommentWithReply } from '@/types/comment.prisma';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/convert';

export interface CommentProps extends CommentWithReply {
  depth?: number;
}

const Comment = ({
  content,
  createdAt,
  user,
  id,
  replies,
  depth = 0,
}: CommentProps) => {
  const maxDepth = depth >= 3 ? 3 : depth;

  return (
    <div
      className={cn(
        `w-full divide-y divide-slate-400 dark:divide-slate-700`,
        maxDepth === 1 && 'pl-4',
        maxDepth === 2 && 'pl-8',
      )}
    >
      <div className="flex flex-col items-start gap-4 py-4">
        <Profile border={false}>
          <Profile.Info
            src={user.profile}
            alt={user.nickname}
            name={user.nickname}
            date={formatDate(createdAt, {
              includeYear: true,
              includeTime: true,
            })}
          />
        </Profile>
        <p>{content}</p>
        <CommnetReplyInput parentId={id} />
      </div>
      {replies.map((reply) => (
        <Comment key={reply.id} {...reply} depth={depth + 1} />
      ))}
    </div>
  );
};

export default Comment;
