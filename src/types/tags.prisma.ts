import { Prisma } from '@prisma/client';

export const tagsQueryOptions = {
  select: {
    id: true,
    name: true,
    postTag: true,
  },
} as const;

export type TagsQueryOptions = typeof tagsQueryOptions;

export type TagsResult = Prisma.TagsGetPayload<{
  select: TagsQueryOptions['select'];
}>;
