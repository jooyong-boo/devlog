import { Prisma } from '@prisma/client';
import { PaginationOptions } from '@/types/common';

export const tagsQueryOptions = {
  select: {
    id: true,
    name: true,
    postTag: true,
  },
} as const;

export type TagsQueryOptions = typeof tagsQueryOptions;

// 기본 태그 타입 정의
export type Tag = {
  id: number;
  name: string;
};

// 태그 타입 (카운트 포함)
export type TagWithCount = Tag & {
  count?: number;
};

// 게시글 조회를 위한 쿼리 옵션
export const postsByTagQueryOptions = {
  where: {
    postTag: {
      some: {
        tags: {
          name: '', // 이 부분은 실제 사용 시 동적으로 설정
        },
      },
    },
    published: true,
  },
  include: {
    users: {
      select: {
        nickname: true,
      },
    },
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

export type PostsByTagQueryOptions = typeof postsByTagQueryOptions;

// 게시글 수 조회를 위한 쿼리 옵션
export const postCountByTagQueryOptions = {
  where: {
    postTag: {
      some: {
        tags: {
          name: '', // 이 부분은 실제 사용 시 동적으로 설정
        },
      },
    },
    published: true,
  },
} as const;

export type PostCountByTagQueryOptions = typeof postCountByTagQueryOptions;

// 결과 타입 정의
export type PostsByTagResult = {
  posts: Array<
    Omit<
      Prisma.PostsGetPayload<{
        select: typeof postsByTagQueryOptions.where & {
          id: true;
          title: true;
          content: true;
          thumbnail: true;
          createdAt: true;
          updatedAt: true;
          published: true;
          viewCount: true;
          postTag: {
            select: {
              tags: {
                select: {
                  id: true;
                  name: true;
                };
              };
            };
          };
        };
      }>,
      'postTag'
    > & { postTag: Tag[] }
  >;
} & { pagination: PaginationOptions & { totalPosts: number } };
