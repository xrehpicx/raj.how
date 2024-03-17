"use client";
import { Block, type ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";

import { NotionRenderer, useNotionContext } from "react-notion-x";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getBlockTitle } from "notion-utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

// import Highlight from "react-highlight";

// const Code = dynamic(() => import("react-highlight").then((m) => m.default), {
//   ssr: false,
// });

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  },
);

export function NRenderer({
  recordMap,
  className,
  fullPage,
}: {
  recordMap: ExtendedRecordMap;
  className?: string;
  fullPage?: boolean;
}) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, [recordMap]);

  if (!render) {
    return (
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        className="h-[80vh] flex items-center flex-col justify-center"
      >
        <div className="pb-36">
          <div className="flex items-center gap-1">
            <h2 className="text-foreground">./raj</h2>
            <Loader2 size={12} className="animate-spin" />
          </div>
          <p className="italic text-xs text-muted-foreground">executing...</p>
        </div>
      </motion.div>
    );
  }

  if (render)
    return (
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", height: "0px" }}
        animate={{ opacity: 1, filter: "blur(0px)", height: "auto" }}
        className={cn("", className)}
        suppressHydrationWarning
      >
        <NotionRenderer
          components={{
            Code: CodeBlock,
            Collection,
            Equation,
            Modal,
            nextLink: Link,
            Link: Link,
            Image: Image,
            nextImage: Image,
          }}
          mapPageUrl={(pageId) => `/story?id=${pageId}`}
          fullPage={fullPage}
          recordMap={recordMap}
        />
      </motion.div>
    );
}

function CodeBlock({
  block,
  defaultLanguage = "bash",
  className,
}: {
  block: Block;
  defaultLanguage: string;
  className?: string;
}) {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language = (
    block.properties?.language?.[0]?.[0] || defaultLanguage
  ).toLowerCase();

  return (
    <SyntaxHighlighter
      className="w-full overflow-auto rounded-md"
      language={language}
      style={materialOceanic}
    >
      {content}
    </SyntaxHighlighter>
  );
}
