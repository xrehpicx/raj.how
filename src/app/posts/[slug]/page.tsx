import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostArtwork } from '@/components/artwork';
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
    <main className="site-shell article-page">
      <nav className="post-nav" aria-label="Breadcrumb">
        <a href="/">home</a> / <a href="/posts">writing</a>
      </nav>

      <article className="article-shell">
        <PostArtwork
          className="article-plate"
          slug={post.slug}
          alt={`Watercolor illustration for ${post.title}`}
          eager
        />
        <header className="article-header">
          <h1>{post.title}</h1>
          <p className="post-meta">
            {[post.date, post.author].filter(Boolean).join(' / ')}
          </p>
          {post.description ? <p>{post.description}</p> : null}
        </header>
        <Markdown content={post.body} className="article-content" />
        <footer className="article-footer">
          <a href="/posts">← all writing</a>
        </footer>
      </article>
    </main>
  );
}
