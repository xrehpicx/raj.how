import { MetadataRoute } from "next";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { getAllPagesInSpace } from "notion-utils";
import { getPreviewImageMap } from "./preview-images";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPagesInSpace(
    "c2068ac92ee244d48de4fb085c6c22bb",
    "198f72d7-4a42-4425-8cab-c126d2834f13",
    getPage,
    {
      traverseCollections: false,
    },
  );
  const story_ids = Object.keys(pages).map((pageId) => ({ id: pageId }));

  return story_ids.map((story) => ({
    url: `https://www.raj.how/story?id=${story.id.replaceAll("-", "")}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}

async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(pageId);

  const previewImageMap = await getPreviewImageMap(recordMap);
  (recordMap as any).preview_images = previewImageMap;

  return recordMap;
}
