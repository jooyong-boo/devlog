import { PrismaClient } from '@prisma/client';
import { oAuthProviders } from '../../../src/types/auth';

const prisma = new PrismaClient();

const oAuthProviderSeed: Pick<
  Parameters<typeof prisma.usersOAuthProviders.create>[0]['data'],
  'id' | 'name'
>[] = [
  {
    id: oAuthProviders.google.id,
    name: oAuthProviders.google.provider,
  },
  {
    id: oAuthProviders.github.id,
    name: oAuthProviders.github.provider,
  },
];

export default oAuthProviderSeed;
