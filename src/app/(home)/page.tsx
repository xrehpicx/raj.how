import { PostArtwork } from '@/components/artwork';
import { getPosts, getProjects } from '@/lib/content';

export const dynamic = 'force-static';

export default function Home() {
  const posts = getPosts();
  const projects = getProjects().filter(
    (project) =>
      project.section === 'Favorite Projects' ||
      project.section === 'Work Projects'
  );
  const favoriteProjects = projects.filter(
    (project) => project.section === 'Favorite Projects'
  );
  const workProjects = projects.filter(
    (project) => project.section === 'Work Projects'
  );

  return (
    <main className="site-shell home-shell">
      <header className="masthead" id="about">
        <h1>Raj Sharma</h1>
        <nav className="masthead-nav" aria-label="Primary navigation">
          <a href="#writing">writing</a>
          <span aria-hidden="true">·</span>
          <a href="#projects">projects</a>
          <span aria-hidden="true">·</span>
          <a href="#work">work</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/xrehpicx">github</a>
          <span aria-hidden="true">·</span>
          <a href="https://x.com/xrehpicx">x</a>
          <span aria-hidden="true">·</span>
          <span>San Francisco</span>
        </nav>
        <p className="masthead-intro">
          I’m a software builder and the CTO and Co-Founder of{' '}
          <a href="https://imai.studio">imai.studio</a>. I work on systems,
          tools, and teams. I write about what I learn along the way.
        </p>
      </header>

      <section className="page-section" id="writing" aria-labelledby="writing-heading">
        <div className="section-title-row">
          <h2 id="writing-heading">Writing</h2>
          <a href="/posts">all writing</a>
        </div>
        <ul className="writing-list">
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
      </section>

      <section className="page-section" id="projects" aria-labelledby="projects-heading">
        <div className="section-title-row">
          <h2 id="projects-heading">Projects</h2>
        </div>
        <ul className="project-list">
          {favoriteProjects.map((project) => (
            <li key={project.slug}>
              {project.url ? (
                <a className="project-entry" href={project.url}>
                  <span className="project-title">
                    {project.title}
                    <span aria-hidden="true"> ↗</span>
                  </span>
                  <span className="project-copy">
                    {project.contribution ? (
                      <span className="entry-kicker">oss contribution</span>
                    ) : null}
                    {project.body ? <span>{project.body}</span> : null}
                  </span>
                </a>
              ) : (
                <span className="project-entry">{project.title}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section" id="work" aria-labelledby="work-heading">
        <div className="section-title-row">
          <h2 id="work-heading">Work</h2>
        </div>
        <ul className="project-list">
          {workProjects.map((project) => (
            <li key={project.slug}>
              {project.url ? (
                <a className="project-entry" href={project.url}>
                  <span className="project-title">
                    {project.title}
                    <span aria-hidden="true"> ↗</span>
                  </span>
                  <span className="project-copy">{project.body}</span>
                </a>
              ) : (
                <span className="project-entry">{project.title}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className="site-footer">
        <span>Raj Sharma · San Francisco · {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
