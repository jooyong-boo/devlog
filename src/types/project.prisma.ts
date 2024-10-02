import { Prisma } from '@prisma/client';
import { PaginationOptions } from '@/types/common';
import { FormattedPost } from '@/types/post.prisma';

export const projectQueryOptions = {
  select: {
    id: true,
    name: true,
    image: true,
    desc: true,
    sort: true,
    createdAt: true,
    _count: {
      select: {
        posts: true,
      },
    },
  },
} as const;

export type ProjectQueryOptions = typeof projectQueryOptions;

export type ProjectResult = Prisma.ProjectsGetPayload<{
  select: ProjectQueryOptions['select'];
}>;

export const postsByProjectQueryOptions = {
  where: {
    project: {
      name: '',
    },
    published: true,
  },
  include: {
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
  },
  orderBy: {
    createdAt: 'desc' as const,
  },
} as const;

export type PostsByProjectQueryOptions = typeof postsByProjectQueryOptions;

export type PostsByProjectResult = Array<FormattedPost>;

export type PostsByProjectPagination = {
  posts: PostsByProjectResult;
  pagination: PaginationOptions;
};
