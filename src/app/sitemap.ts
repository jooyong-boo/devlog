import { MetadataRoute } from 'next';
import prisma from '../../prisma/client';

const domain = process.env.URL;

function generateSitemap(url: string) {
  return {
    url,
    lastModified: new Date(),
  };
}

async function getArticleIds() {
  const result = await prisma.posts.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
    },
  });
  return result.map((post) => generateSitemap(`${domain}/posts/${post.id}`));
}

async function getProjectIds() {
  const result = await prisma.projects.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });
  return result.map((project) =>
    generateSitemap(`${domain}/projects/${project.id}`),
  );
}

async function getTagIds() {
  const result = await prisma.tags.findMany({
    select: {
      id: true,
    },
  });
  return result.map((tag) => generateSitemap(`${domain}/tags/${tag.id}`));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleIds, projectIds, tagIds] = await Promise.all([
    getArticleIds(),
    getProjectIds(),
    getTagIds(),
  ]);

  return [
    {
      url: `${domain}`,
      changeFrequency: 'daily',
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${domain}/about`,
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${domain}/posts`,
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${domain}/projects`,
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${domain}/tags`,
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: new Date(),
    },
    ...articleIds,
    ...projectIds,
    ...tagIds,
  ];
}
