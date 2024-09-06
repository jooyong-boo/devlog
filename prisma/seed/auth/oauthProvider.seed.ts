import { UsersOAuthProviders } from '@prisma/client';
import { oAuthProviders } from '../../../src/types/auth';

const oAuthProviderSeed: Pick<UsersOAuthProviders, 'id' | 'name'>[] = [
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
