import { Prisma } from '@prisma/client';
import { TagWithCount } from '@/types/tags.prisma';

export const postQueryOptions = {
  select: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    postTag: {
      select: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    thumbnail: true,
    viewCount: true,
  },
  orderBy: {
    createdAt: 'desc' as const,
  },
} as const;

export type PostQueryOptions = typeof postQueryOptions;

export type PostResult = Prisma.PostsGetPayload<{
  select: PostQueryOptions['select'];
}>;

export type FormattedPost = Omit<PostResult, 'postTag'> & {
  postTag: TagWithCount[];
};
