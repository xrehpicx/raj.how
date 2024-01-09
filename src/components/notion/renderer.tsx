"use client";
import { type ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";

import { NotionRenderer } from "react-notion-x";

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
    <div className={className}>
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
    </div>
  );
}
