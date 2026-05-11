import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/markdown';
import { getLocalPosts, getPost } from '@/lib/content';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocalPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main>
      <nav className="post-nav">
        <a href="/">home</a> / <a href="/posts">writing</a>
      </nav>

      <article>
        <h1>{post.title}</h1>
        <p className="post-meta">
          {[post.date, post.author].filter(Boolean).join(' - ')}
        </p>
        {post.description ? <p>{post.description}</p> : null}
        <Markdown content={post.body} />
      </article>
    </main>
  );
}
