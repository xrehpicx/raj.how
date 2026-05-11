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
  const projectSections = ['Favorite Projects', 'Work Projects'];

  return (
    <main>
      <Markdown content={home.body} />

      <h2>Writing</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={post.external || `/posts/${post.slug}`}>
              {post.title}
              {post.external ? ' [offsite]' : ''}
            </a>
            {post.description ? <span> - {post.description}</span> : null}
          </li>
        ))}
      </ul>

      {projectSections.map((section) => (
        <section key={section}>
          <h2>{section}</h2>
          <ul>
            {projects
              .filter((project) => project.section === section)
              .map((project) => (
                <li key={project.slug}>
                  {project.url ? (
                    <a href={project.url}>{project.title}</a>
                  ) : (
                    project.title
                  )}
                  {project.contribution ? ' [oss contribution]' : ''}
                  {project.body ? <span> - {project.body}</span> : null}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
