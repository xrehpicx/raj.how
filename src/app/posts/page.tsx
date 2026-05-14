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
    <main className="site-shell">
      <nav className="post-nav" aria-label="Breadcrumb">
        <a href="/">home</a>
      </nav>
      <header className="hero-panel compact-hero">
        <h1>Writing</h1>
      </header>
      <section className="content-section" aria-label="All writing">
        <ul className="entry-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <a
                className="entry-card"
                href={post.external || `/posts/${post.slug}`}
              >
                <span className="entry-title">
                  {post.title}
                  {post.external ? ' [offsite]' : ''}
                </span>
                <span className="entry-meta">
                  {[post.date, post.description].filter(Boolean).join(' / ')}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
