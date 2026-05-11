import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

const contentRoot = path.join(process.cwd(), 'src/content');

export type MarkdownDocument = {
  slug: string;
  body: string;
  title: string;
  description?: string;
  date?: string;
  author?: string;
  github?: string;
  cover?: string;
  external?: string;
  source?: string;
  section?: string;
  url?: string;
  contribution?: boolean;
  order?: number;
};

type Frontmatter = Record<string, string>;

function parseFrontmatterValue(rawValue: string) {
  try {
    return JSON.parse(rawValue);
  } catch {
    if (
      (rawValue.startsWith("'") && rawValue.endsWith("'")) ||
      (rawValue.startsWith('"') && rawValue.endsWith('"'))
    ) {
      return rawValue.slice(1, -1);
    }

    return rawValue;
  }
}

function parseFrontmatter(source: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  if (!source.startsWith('---')) {
    return { frontmatter: {}, body: source.trim() };
  }

  const end = source.indexOf('\n---', 3);
  if (end === -1) {
    return { frontmatter: {}, body: source.trim() };
  }

  const frontmatterSource = source.slice(3, end).trim();
  const body = source.slice(end + 4).trim();

  const frontmatter = Object.fromEntries(
    frontmatterSource
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(':');
        const key = line.slice(0, separator).trim();
        const rawValue = line.slice(separator + 1).trim();

        return [key, parseFrontmatterValue(rawValue)];
      })
  );

  return { frontmatter, body };
}

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/, '');
}

function readMarkdownFile(relativePath: string): MarkdownDocument {
  const absolutePath = path.join(contentRoot, relativePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(source);
  const filename = path.basename(relativePath);
  const slug = frontmatter.slug || slugFromFilename(filename);

  return {
    slug,
    body,
    title: frontmatter.title || slug,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    github: frontmatter.github,
    cover: frontmatter.cover,
    external: frontmatter.external,
    source: frontmatter.source,
    section: frontmatter.section,
    url: frontmatter.url,
    contribution: frontmatter.contribution === 'true',
    order: frontmatter.order ? Number(frontmatter.order) : undefined,
  };
}

function readCollection(directory: string) {
  const collectionPath = path.join(contentRoot, directory);

  return fs
    .readdirSync(collectionPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => readMarkdownFile(path.join(directory, file)));
}

export const getHome = cache(() => readMarkdownFile('home.md'));

export const getPosts = cache(() =>
  readCollection('posts').sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  )
);

export const getLocalPosts = cache(() =>
  getPosts().filter((post) => !post.external)
);

export const getPost = cache((slug: string) =>
  getLocalPosts().find((post) => post.slug === slug)
);

export const getPostBySourceId = cache((sourceId: string) =>
  getLocalPosts().find(
    (post) => post.source === `notion:${sourceId.replaceAll('-', '')}`
  )
);

export const getProjects = cache(() =>
  readCollection('projects').sort(
    (a, b) =>
      (a.section || '').localeCompare(b.section || '') ||
      (a.order ?? 0) - (b.order ?? 0) ||
      a.title.localeCompare(b.title)
  )
);
