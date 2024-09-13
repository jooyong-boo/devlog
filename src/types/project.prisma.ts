import { Prisma } from '@prisma/client';

export const projectQueryOptions = {
  select: {
    id: true,
    name: true,
    image: true,
    desc: true,
    sort: true,
    createdAt: true,
  },
} as const;

export type ProjectQueryOptions = typeof projectQueryOptions;

export type ProjectResult = Prisma.ProjectsGetPayload<{
  select: ProjectQueryOptions['select'];
}>;
