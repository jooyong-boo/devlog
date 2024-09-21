export const tagsQueryOptions = {
  select: {
    id: true,
    name: true,
    postTag: true,
  },
} as const;

export type TagsQueryOptions = typeof tagsQueryOptions;

export type TagsResult = {
  id: number;
  name: string;
  count?: number;
};
