'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import useToast from '@/hooks/useToast';
import { patchComment } from '@/services/posts';

interface CommentReplyInputProps {
  initContent: string;
  commentId: number;
  handleClose: () => void;
}

const CommentEditForm = ({
  initContent,
  commentId,
  handleClose,
}: CommentReplyInputProps) => {
  const params: { id?: string } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { enqueueWarningBar } = useToast();

  const [content, setContent] = useState(initContent);
  const [isSibmitting, setIsSibmitting] = useState(false);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      enqueueWarningBar('로그인이 필요합니다.', 'error');
      return;
    }

    const { id } = params;

    if (!id) {
      enqueueWarningBar('게시글 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    if (!commentId) {
      enqueueWarningBar('댓글 정보를 찾을 수 없습니다.', 'error');
      return;
    }

    setIsSibmitting(true);
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') as string;

    try {
      await patchComment({
        postId: id,
        commentId,
        content,
      });
      router.refresh();
    } finally {
      handleClose();
      setContent('');
      setIsSibmitting(false);
    }
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <Textarea
        name="content"
        placeholder="댓글을 작성해주세요"
        onChange={handleContentChange}
        value={content}
      />
      <div className="flex gap-2 self-end">
        <Button
          className="self-end"
          disabled={isSibmitting}
          onClick={handleClose}
          outline
        >
          취소
        </Button>
        <Button className="self-end" type="submit" disabled={isSibmitting}>
          댓글 수정
        </Button>
      </div>
    </form>
  );
};

export default CommentEditForm;
