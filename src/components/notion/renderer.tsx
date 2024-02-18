"use client";
import { type ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";

import { NotionRenderer } from "react-notion-x";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
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
  return (
    <motion.div
      // blur and fade in and animate height to auto
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      className={cn("", className)}
    >
      <NotionRenderer
        components={{
          Code,
          Collection,
          Equation,
          Modal,
        }}
        mapPageUrl={(pageId) => `/story?id=${pageId}`}
        fullPage={fullPage}
        recordMap={recordMap}
      />
    </motion.div>
  );
}
