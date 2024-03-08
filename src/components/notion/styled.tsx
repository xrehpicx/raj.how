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

  console.log("blockId", blockId);
  const recordMap = await notion.getPage(blockId);

  return (
    <>
      <NRenderer
        fullPage={fullPage}
        className={className}
        recordMap={recordMap}
      />
    </>
  );
}
