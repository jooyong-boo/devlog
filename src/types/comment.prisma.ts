import { Prisma } from '@prisma/client';

export const commentQueryOptions = {
  select: {
    id: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        nickname: true,
        profile: true,
      },
    },
  },
} as const;

export type CommentQueryOptions = typeof commentQueryOptions;

export type CommentResult = Prisma.PostCommentsGetPayload<{
  select: CommentQueryOptions['select'];
}>;
