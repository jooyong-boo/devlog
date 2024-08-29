import Button from '@/components/Button';
import Profile from '@/components/Profile';
import { formatDate } from '@/utils/convert';

export interface CommentProps {
  src: string;
  alt: string;
  name: string;
  date: string;
  description: string;
  replyCount: number;
}

const Comment = ({
  alt,
  date,
  description,
  name,
  replyCount,
  src,
}: CommentProps) => {
  return (
    <div className="flex flex-col items-start gap-4 py-4">
      <Profile border={false}>
        <Profile.Info
          src={src}
          alt={alt}
          name={name}
          date={formatDate(date, { includeYear: true })}
        />
      </Profile>
      <p>{description}</p>
      {/* TODO: 답글 리스트 보여주기 및 답글 달기 기능 */}
      <Button outline>답글 달기</Button>
    </div>
  );
};

export default Comment;
