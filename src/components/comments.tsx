"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

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

interface Reaction {
  count: number;
  viewerHasReacted: boolean;
}

interface Reactions {
  CONFUSED: Reaction;
  EYES: Reaction;
  HEART: Reaction;
  HOORAY: Reaction;
  LAUGH: Reaction;
  ROCKET: Reaction;
  THUMBS_DOWN: Reaction;
  THUMBS_UP: Reaction;
  [key: string]: Reaction; // To accommodate additional reaction types not explicitly listed here
}

interface Discussion {
  id: string;
  locked: boolean;
  reactionCount: number;
  reactions: Reactions;
  repository: {
    nameWithOwner: string;
  };
  totalCommentCount: number;
  totalReplyCount: number;
  url: string;
}

interface GiscusData {
  discussion: Discussion;
}

interface MetadataEvent {
  giscus?: GiscusData;
}

export const Reactions = ({
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
  const [showReactions, setShowReactions] = useState(false);

  useEffect(() => {
    const handleMetadata = (event: { data: MetadataEvent }) => {
      const { data } = event;
      if (typeof data === "object" && data?.giscus?.discussion) {
        console.log(data.giscus.discussion);
        setShowReactions(
          Object.values(data.giscus.discussion).some(
            (reaction) => reaction.count > 0,
          ),
        );
      }
    };

    window.addEventListener("message", handleMetadata as any);

    return () => window.removeEventListener("message", handleMetadata as any);
  }, []);

  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="url"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme="light_tritanopia"
      lang="en"
      loading="eager"
    />
  );
};

export default Comments;
