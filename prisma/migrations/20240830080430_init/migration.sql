-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(30) NOT NULL,
    "profile" TEXT NOT NULL,
    "oauth_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOAuthProviders" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "UsersOAuthProviders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersRoles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "UsersRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "project_id" INTEGER NOT NULL,
    "view_cnt" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsViewTrends" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "PostsViewTrends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTags" (
    "post_id" VARCHAR(255) NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "PostTags_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "PostComments" (
    "id" SERIAL NOT NULL,
    "post_id" TEXT NOT NULL,
    "parent_id" INTEGER,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "PostComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "image" VARCHAR(255),
    "desc" VARCHAR(255) NOT NULL,
    "sort" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_user" TEXT NOT NULL DEFAULT '_system',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "update_user" TEXT NOT NULL DEFAULT '_system',
    "deleted_at" TIMESTAMP(3),
    "delete_user" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickname_key" ON "Users"("nickname");

-- CreateIndex
CREATE INDEX "Users_email_nickname_idx" ON "Users"("email", "nickname");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOAuthProviders_name_key" ON "UsersOAuthProviders"("name");

-- CreateIndex
CREATE INDEX "UsersOAuthProviders_name_idx" ON "UsersOAuthProviders"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UsersRoles_name_key" ON "UsersRoles"("name");

-- CreateIndex
CREATE INDEX "UsersRoles_name_idx" ON "UsersRoles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "Posts_project_id_idx" ON "Posts"("project_id");

-- CreateIndex
CREATE INDEX "PostTags_tag_id_idx" ON "PostTags"("tag_id");

-- CreateIndex
CREATE INDEX "PostComments_post_id_idx" ON "PostComments"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_oauth_id_fkey" FOREIGN KEY ("oauth_id") REFERENCES "UsersOAuthProviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "UsersRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "PostComments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
