import type { ReactNode } from 'react';

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|_([^_]+)_/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    if (match[1] && match[2]) {
      nodes.push(
        <a key={`${keyPrefix}-${match.index}`} href={match[2]}>
          {renderInline(match[1], `${keyPrefix}-${match.index}`)}
        </a>
      );
    } else if (match[3]) {
      nodes.push(<code key={`${keyPrefix}-${match.index}`}>{match[3]}</code>);
    } else if (match[4]) {
      nodes.push(
        <strong key={`${keyPrefix}-${match.index}`}>
          {renderInline(match[4], `${keyPrefix}-${match.index}`)}
        </strong>
      );
    } else if (match[5]) {
      nodes.push(
        <em key={`${keyPrefix}-${match.index}`}>
          {renderInline(match[5], `${keyPrefix}-${match.index}`)}
        </em>
      );
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function isBlockStart(line: string) {
  return (
    line.startsWith('#') ||
    line.startsWith('>') ||
    line.startsWith('```') ||
    line.startsWith('![') ||
    /^(-|\d+\.)\s+/.test(line)
  );
}

function collectList(lines: string[], start: number, ordered: boolean) {
  const items: string[] = [];
  let index = start;
  const marker = ordered ? /^\d+\.\s+/ : /^-\s+/;

  while (index < lines.length) {
    const line = lines[index]?.trim() || '';
    if (!line) {
      index += 1;
      continue;
    }
    if (!marker.test(line)) break;

    items.push(line.replace(marker, ''));
    index += 1;
  }

  return { items, next: index };
}

export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trimEnd() || '';

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index]?.startsWith('```')) {
        code.push(lines[index] || '');
        index += 1;
      }

      index += 1;
      blocks.push(
        <pre key={blocks.length}>
          <code data-language={language || undefined}>{code.join('\n')}</code>
        </pre>
      );
      continue;
    }

    const image = line.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
    if (image) {
      const alt = image[1] || '';
      const src = image[2] || '';

      blocks.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img key={blocks.length} src={src} alt={alt} />
      );
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = (heading[1] || '').length;
      const children = renderInline(heading[2] || '', `h-${blocks.length}`);
      const key = blocks.length;

      if (level === 1) blocks.push(<h1 key={key}>{children}</h1>);
      if (level === 2) blocks.push(<h2 key={key}>{children}</h2>);
      if (level === 3) blocks.push(<h3 key={key}>{children}</h3>);

      index += 1;
      continue;
    }

    if (line.startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index]?.trim().startsWith('>')) {
        quote.push((lines[index] || '').trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(
        <blockquote key={blocks.length}>
          {renderInline(quote.join(' '), `q-${blocks.length}`)}
        </blockquote>
      );
      continue;
    }

    if (/^-\s+/.test(line.trim())) {
      const { items, next } = collectList(lines, index, false);
      blocks.push(
        <ul key={blocks.length}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderInline(item, `ul-${blocks.length}-${itemIndex}`)}
            </li>
          ))}
        </ul>
      );
      index = next;
      continue;
    }

    if (/^\d+\.\s+/.test(line.trim())) {
      const { items, next } = collectList(lines, index, true);
      blocks.push(
        <ol key={blocks.length}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderInline(item, `ol-${blocks.length}-${itemIndex}`)}
            </li>
          ))}
        </ol>
      );
      index = next;
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;

    while (
      index < lines.length &&
      lines[index]?.trim() &&
      !isBlockStart(lines[index]?.trim() || '')
    ) {
      paragraph.push(lines[index]?.trim() || '');
      index += 1;
    }

    blocks.push(
      <p key={blocks.length}>
        {renderInline(paragraph.join(' '), `p-${blocks.length}`)}
      </p>
    );
  }

  return <div className={className}>{blocks}</div>;
}
