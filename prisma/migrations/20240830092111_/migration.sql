-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_oauth_id_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "oauth_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "UsersOAuthProviders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
