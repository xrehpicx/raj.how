import { redirect } from 'next/navigation';
import { getPostBySourceId } from '@/lib/content';

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function StoryRedirect({ searchParams }: Props) {
  const { id } = await searchParams;

  if (id) {
    const post = getPostBySourceId(id);
    if (post) redirect(`/posts/${post.slug}`);
  }

  redirect('/posts');
}
