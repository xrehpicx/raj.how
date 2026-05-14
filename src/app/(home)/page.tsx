import { Markdown } from '@/components/markdown';
import { getHome, getPosts, getProjects } from '@/lib/content';

export const dynamic = 'force-static';

export default function Home() {
  const home = getHome();
  const posts = getPosts();
  const projects = getProjects().filter(
    (project) =>
      project.section === 'Favorite Projects' ||
      project.section === 'Work Projects'
  );
  const projectSections = [
    { id: 'favorite-projects', label: 'Favorite Projects' },
    { id: 'work-projects', label: 'Work Projects' },
  ];

  return (
    <main className="site-shell">
      <header className="hero-panel">
        <Markdown content={home.body} className="hero-copy" />
      </header>

      <section className="content-section" aria-labelledby="writing-heading">
        <h2 id="writing-heading">Writing</h2>
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
                {post.description ? (
                  <span className="entry-description">{post.description}</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {projectSections.map((section) => (
        <section
          className="content-section"
          key={section.id}
          aria-labelledby={`${section.id}-heading`}
        >
          <h2 id={`${section.id}-heading`}>{section.label}</h2>
          <ul className="entry-list">
            {projects
              .filter((project) => project.section === section.label)
              .map((project) => (
                <li key={project.slug}>
                  {project.url ? (
                    <a className="entry-card" href={project.url}>
                      <span className="entry-title">{project.title}</span>
                      {project.contribution ? (
                        <span className="entry-kicker">oss contribution</span>
                      ) : null}
                      {project.body ? (
                        <span className="entry-description">
                          {project.body}
                        </span>
                      ) : null}
                    </a>
                  ) : (
                    project.title
                  )}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
