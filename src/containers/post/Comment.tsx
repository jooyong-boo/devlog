import Button from '@/components/Button';
import Profile from '@/components/Profile';
import CommnetReplyInput from '@/containers/post/CommentReplyInput';
import { Comment as CommentType } from '@/types/post';
import { formatDate } from '@/utils/convert';

const Comment = ({ content, createdAt, user, id }: CommentType) => {
  return (
    <div className="flex flex-col items-start gap-4 py-4">
      <Profile border={false}>
        <Profile.Info
          src={user.profile}
          alt={user.nickname}
          name={user.nickname}
          date={formatDate(createdAt, { includeYear: true, includeTime: true })}
        />
      </Profile>
      <p>{content}</p>
      <CommnetReplyInput parentId={id} />
    </div>
  );
};

export default Comment;
