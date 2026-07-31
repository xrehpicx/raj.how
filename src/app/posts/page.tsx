import type { Metadata } from 'next';
import { PostArtwork } from '@/components/artwork';
import { getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Writing by Raj Sharma.',
};

export const dynamic = 'force-static';

export default function PostsPage() {
  const posts = getPosts();

  return (
    <main className="site-shell archive-shell">
      <header className="page-masthead">
        <a className="back-link" href="/">Raj Sharma</a>
        <h1>Writing</h1>
      </header>
      <ul className="writing-list archive-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <a
              className="writing-entry"
              href={post.external || `/posts/${post.slug}`}
            >
              <PostArtwork
                className="writing-thumbnail"
                slug={post.slug}
                alt=""
              />
              <span className="writing-entry-copy">
                <span className="entry-date">{post.date}</span>
                <span className="entry-title">
                  {post.title}
                  {post.external ? <span aria-label="offsite"> ↗</span> : null}
                </span>
                {post.description ? (
                  <span className="entry-description">{post.description}</span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <footer className="site-footer">
        <a href="/">← home</a>
      </footer>
    </main>
  );
}
