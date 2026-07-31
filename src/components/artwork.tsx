type PostArtworkProps = {
  slug: string;
  className?: string;
  alt?: string;
  eager?: boolean;
};

export function PostArtwork({
  slug,
  className,
  alt = '',
  eager = false,
}: PostArtworkProps) {
  return (
    // Generated editorial plates are static, transparent WebP assets.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/images/plates/${slug}.webp`}
      width="1536"
      height="1024"
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      alt={alt}
      aria-hidden={alt ? undefined : true}
    />
  );
}
