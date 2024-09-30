'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@/components/Profile';
import CommentEditForm from '@/containers/post/CommentEditForm';
import CommnetReplyInput from '@/containers/post/CommentReplyInput';
import { deleteComment, patchComment } from '@/services/posts';
import { CommentWithReply } from '@/types/comment.prisma';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/convert';

export interface CommentProps extends CommentWithReply {
  depth?: number;
}

const Comment = ({
  content,
  createdAt,
  deletedAt,
  user,
  id,
  replies,
  depth = 0,
}: CommentProps) => {
  const router = useRouter();
  const params: { id?: string } = useParams();
  const { id: postId } = params;

  const maxDepth = depth >= 3 ? 3 : depth;
  const session = useSession();

  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteComment = async () => {
    if (!postId) return;
    await deleteComment({
      postId,
      commentId: id,
    });
    router.refresh();
  };

  return (
    <div
      className={cn(
        `w-full divide-y divide-slate-400 dark:divide-slate-700`,
        maxDepth === 1 && 'pl-4',
        maxDepth === 2 && 'pl-8',
      )}
    >
      <div className="flex flex-col items-start gap-4 py-4">
        <div className="flex w-full items-center justify-between">
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
          {!deletedAt &&
            session.status === 'authenticated' &&
            session.data.user?.email === user.email && (
              <div className="flex gap-2 text-xs text-slate-500">
                <button className="hover:underline" onClick={handleOpenEdit}>
                  수정
                </button>
                <button
                  className="hover:underline"
                  onClick={() => handleDeleteComment()}
                >
                  삭제
                </button>
              </div>
            )}
        </div>
        {!isEditing && (
          <>
            <p>{content}</p>
            <CommnetReplyInput parentId={id} />
          </>
        )}
        {isEditing && (
          <CommentEditForm
            initContent={content}
            commentId={id}
            handleClose={handleCloseEdit}
          />
        )}
      </div>
      {replies.map((reply) => (
        <Comment key={reply.id} {...reply} depth={depth + 1} />
      ))}
    </div>
  );
};

export default Comment;
