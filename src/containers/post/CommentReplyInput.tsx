'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import useToast from '@/hooks/useToast';
import { postCommentReply } from '@/services/posts';

interface CommentReplyInputProps {
  parentId: number | null;
}

const CommnetReplyInput = ({ parentId }: CommentReplyInputProps) => {
  const router = useRouter();
  const params: { id?: string } = useParams();
  const { data: session } = useSession();

  const { enqueueWarningBar } = useToast();

  const [isReplying, setIsReplying] = useState(false);

  const [content, setContent] = useState('');
  const [isSibmitting, setIsSibmitting] = useState(false);

  const handleReply = (state: boolean) => {
    setIsReplying(state);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id } = params;

    if (!session) {
      enqueueWarningBar('로그인이 필요합니다.', 'error');
      return;
    }
    if (!id) {
      enqueueWarningBar('게시글 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    if (!parentId) {
      enqueueWarningBar('댓글 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    setIsSibmitting(true);
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') as string;

    try {
      await postCommentReply({
        postId: id,
        content,
        parentId,
      });
      router.refresh();
    } finally {
      setContent('');
      setIsReplying(false);
      setIsSibmitting(false);
    }
  };

  return (
    <>
      {!isReplying && (
        <Button outline onClick={() => handleReply(true)}>
          답글 달기
        </Button>
      )}
      {isReplying && (
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <Textarea
            name="content"
            placeholder="답글을 작성해주세요"
            onChange={handleContentChange}
            value={content}
          />
          <div className="flex gap-2 self-end">
            <Button
              className="self-end"
              disabled={isSibmitting}
              onClick={() => handleReply(false)}
              outline
            >
              취소
            </Button>
            <Button className="self-end" type="submit" disabled={isSibmitting}>
              답글 작성
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default CommnetReplyInput;
