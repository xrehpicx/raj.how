import { About } from "@/components/About";
import { Pages } from "@/components/Pages";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { NotionAPI } from "notion-client";
import {
  getBlockTitle,
  getPageProperty,
  getPageTitle,
  idToUuid,
} from "notion-utils";

export const useAbout = routeLoader$(async () => {
  const notion = new NotionAPI();
  const pageID = "65663b27c4614f0883c9a09f2ab0acd6";
  const recordMap = await notion.getPage(pageID);
  const title = getPageTitle(recordMap);
  return { data: recordMap, title };
});

export const usePage = routeLoader$(async () => {
  const notion = new NotionAPI();
  const collectionItemId = "3df0773458ab497c9650132355a7dcb2";
  const recordMap = await notion.getPage(collectionItemId);
  const title = getPageTitle(recordMap);
  const block = recordMap.block[idToUuid(collectionItemId)].value;
  const subtitle = getPageProperty("subtitle", block, recordMap);
  const desc = getPageProperty("desc", block, recordMap);
  return { data: recordMap, title, subtitle, desc };
});

export const useBlogs = routeLoader$(async () => {
  const notion = new NotionAPI();
  const collectionItemId = "cd86a9e6ac0146c7a15a384a3f0405f4";
  const recordMap = await notion.getPage(collectionItemId);

  const collection_id = Object.keys(recordMap.collection_query)[0];
  const blocks = Object.values(recordMap.block).filter(
    (v) => v.value.type === "page" && v.value.parent_id === collection_id
  );

  const projects = blocks
    .map((block) => {
      return {
        id: block.value.id,
        title: getBlockTitle(block.value, recordMap),
        desc: getPageProperty("desc", block.value, recordMap) as string,
        public: getPageProperty("Published", block.value, recordMap) === "yes",
      };
    })
    .filter((d) => d.public);

  return { title: getPageTitle(recordMap), value: projects };
});

export const useProjects = routeLoader$(async () => {
  const notion = new NotionAPI();
  const collectionItemId = "8db89db3e2a742d3864363683c009415";
  const recordMap = await notion.getPage(collectionItemId);

  const collection_id = Object.keys(recordMap.collection_query)[0];
  const blocks = Object.values(recordMap.block).filter(
    (v) => v.value.type === "page" && v.value.parent_id === collection_id
  );

  const projects = blocks.map(async (block) => {
    return {
      title: getBlockTitle(block.value, recordMap),
      desc: getPageProperty("desc", block.value, recordMap) as string,
      link: getPageProperty("link", block.value, recordMap) as string,
      recordMap: await notion.getPage(block.value.id),
    };
  });

  return { title: getPageTitle(recordMap), value: await Promise.all(projects) };
});

const Hero = component$(() => {
  const page = usePage();
  const projects = useProjects().value;

  return (
    <div class="mt-[20%] pb-10 max-w-xl mx-auto relative animate-fade-in-up">
      <h1 class="text-4xl animate-fade-in-up font-display">
        {page.value.title}
      </h1>
      <div class="flex items-center font-display gap-2">
        <span class="animate-fade-in-left text-sm">{page.value.subtitle}</span>
        <div class="h-4 bg-foreground w-[1px]"></div>
        <span class="animate-fade-in-right text-sm">{page.value.desc}</span>
      </div>

      <div class="mt-4">
        <h4 class="text-md font-display">{projects.title}</h4>
        <div class="grid grid-cols-2 gap-4">
          {projects.value.map((project) => (
            <div key={JSON.stringify(project)}>
              <a
                href={project.link}
                target="_blank"
                class="text-sm block animate-fade-in-up font-display underline underline-offset-2"
              >
                {project.title}
              </a>
              <p class="text-xs text-balance animate-fade-in">{project.desc}</p>
              {/* <NRenderer styled recordMap={project.recordMap} /> */}
            </div>
          ))}
        </div>
      </div>
      <img
        class="absolute rotate-6 opacity-40 -z-10 bottom-0 w-full left-[-100px] md:left-[-200px]"
        width={922}
        height={386}
        src="/assets/grads.svg"
      />
    </div>
  );
});

export default component$(() => {
  return (
    <div class="container pb-[100px] mx-auto">
      <Hero />
      <About />
      <Pages />
    </div>
  );
});
