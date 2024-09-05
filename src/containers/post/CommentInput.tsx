'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import useToast from '@/hooks/useToast';
import { postComment } from '@/services/posts';

const CommentInput = () => {
  const router = useRouter();
  const params: { id?: string } = useParams();
  const { enqueueWarningBar } = useToast();

  const [content, setContent] = useState('');
  const [isSibmitting, setIsSibmitting] = useState(false);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id } = params;

    if (!id) {
      enqueueWarningBar('게시글 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    setIsSibmitting(true);
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') as string;

    postComment({
      id,
      content,
    }).then(() => {
      setContent('');
      setIsSibmitting(false);
      router.refresh();
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Textarea
        name="content"
        placeholder="댓글을 작성해주세요"
        onChange={handleContentChange}
        value={content}
      />
      <Button className="self-end" type="submit" disabled={isSibmitting}>
        댓글 작성
      </Button>
    </form>
  );
};

export default CommentInput;
