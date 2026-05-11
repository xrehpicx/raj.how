import type { Metadata } from 'next';
import { getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Writing by Raj Sharma.',
};

export const dynamic = 'force-static';

export default function PostsPage() {
  const posts = getPosts();

  return (
    <main>
      <p>
        <a href="/">home</a>
      </p>
      <h1>writing</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={post.external || `/posts/${post.slug}`}>
              {post.title}
              {post.external ? ' [offsite]' : ''}
            </a>
            {post.date ? <span> - {post.date}</span> : null}
            {post.description ? <span> - {post.description}</span> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
