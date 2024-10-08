import { Prisma } from '@prisma/client';

export const commentQueryOptions = {
  select: {
    id: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    parentId: true,
    user: {
      select: {
        id: true,
        nickname: true,
        profile: true,
        email: true,
      },
    },
  },
} as const;

export type CommentQueryOptions = typeof commentQueryOptions;

export type CommentResult = Prisma.PostCommentsGetPayload<{
  select: CommentQueryOptions['select'];
}>;

export type CommentWithReply = CommentResult & {
  replies: CommentWithReply[];
};

export interface CreateComment {
  content: string;
  parentId?: number | null;
  postId: string;
}

export interface UpdateComment {
  postId: string;
  commentId: number;
  content: string;
}

export interface DeleteComment {
  postId: string;
  commentId: number;
}
