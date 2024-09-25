import { Prisma } from '@prisma/client';
import { Comment } from '@/types/post';
import { Tag } from '@/types/tags.prisma';

export const postDetailQueryOptions = {
  select: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    thumbnail: true,
    viewCount: true,
    published: true,
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
    project: {
      select: {
        id: true,
        name: true,
        image: true,
        desc: true,
        posts: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    },
  },
} as const;

export type PostDetailQueryOptions = typeof postDetailQueryOptions;

export type PostDetailResult = Prisma.PostsGetPayload<{
  select: PostDetailQueryOptions['select'];
}>;

export type FormattedPostDetail = Omit<PostDetailResult, 'postTag'> & {
  postTag: Tag[];
  comments: Comment[];
};
