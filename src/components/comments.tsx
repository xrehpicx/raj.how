"use client";

import Giscus from "@giscus/react";

const Comments = ({
  repo,
  repoId,
  category,
  categoryId,
}: {
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
}) => {
  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="url"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light_tritanopia"
      lang="en"
      loading="lazy"
    />
  );
};

export default Comments;
