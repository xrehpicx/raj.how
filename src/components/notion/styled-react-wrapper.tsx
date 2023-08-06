/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { type ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "./notion.scss";

function ReactNRenderer({
  recordMap,
  class: className,
  darkMode,
}: {
  recordMap: ExtendedRecordMap;
  class?: string;
  darkMode?: boolean;
}) {
  return (
    <div className={className}>
      <NotionRenderer
        darkMode={darkMode}
        fullPage={false}
        recordMap={recordMap}
      />
    </div>
  );
}

export const StyledNotionClientRenderer = qwikify$(ReactNRenderer, {
  eagerness: "hover",
});
