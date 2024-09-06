import Button from '@/components/Button';
import Profile from '@/components/Profile';
import { Comment as CommentType } from '@/types/post';
import { formatDate } from '@/utils/convert';

const Comment = ({ content, createdAt, user }: CommentType) => {
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
      {/* TODO: 답글 리스트 보여주기 및 답글 달기 기능 */}
      <Button outline>답글 달기</Button>
    </div>
  );
};

export default Comment;
