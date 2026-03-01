import { NotionAPI } from "notion-client";
import { NRenderer } from "./renderer";

import "react-notion-x/src/styles.css";
import "./notion.scss";

export const revalidate = 10;

export async function StyledNotion({
  blockId,
  className,
  fullPage,
}: {
  blockId: string;
  className?: string;
  id?: string;
  fullPage?: boolean;
}) {
  const notion = new NotionAPI();

  let recordMap;

  try {
    recordMap = await notion.getPage(blockId);
  } catch (error) {
    console.error("Failed to load Notion page", { blockId, error });

    return (
      <div className={className}>
        <p className="text-xs italic text-foreground/80">
          Stories are temporarily unavailable. Please try again in a bit.
        </p>
      </div>
    );
  }

  return (
    <NRenderer
      fullPage={fullPage}
      className={className}
      recordMap={recordMap}
    />
  );
}
