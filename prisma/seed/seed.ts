import { PrismaClient } from '@prisma/client';
import oAuthProviderSeed from './auth/oauthProvider.seed';
import userRoleSeed from './user/userRole.seed';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    userRoleSeed.map(async (data) => {
      await prisma.usersRoles.createMany({
        data,
        skipDuplicates: true,
      });
    }),
    oAuthProviderSeed.map(async (data) => {
      await prisma.usersOAuthProviders.createMany({
        data,
        skipDuplicates: true,
      });
    }),
  ]);
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
