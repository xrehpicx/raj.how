import { MetadataRoute } from 'next';
import { getLocalPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getLocalPosts().map((post) => ({
    url: `https://raj.how/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://raj.how',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://raj.how/posts',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts,
  ];
}
