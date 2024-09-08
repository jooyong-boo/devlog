import { MetadataRoute } from 'next';

const domain = process.env.NEXT_PUBLIC_URL;

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
