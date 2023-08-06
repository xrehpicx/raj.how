import { StyledNotionClientRenderer } from "@/components/notion/styled-react-wrapper";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { NotionAPI } from "notion-client";
import { getPageTitle } from "notion-utils";

export const useBlog = routeLoader$(async (requestEvent) => {
  const notion = new NotionAPI();
  const pageID = requestEvent.params.id;
  const recordMap = await notion.getPage(pageID);
  const title = getPageTitle(recordMap);
  return { data: recordMap, title };
});

export default component$(() => {
  const blog = useBlog().value;

  return (
    <div class="container mx-auto max-w-xl">
      <StyledNotionClientRenderer client:visible recordMap={blog.data} />
    </div>
  );
});
