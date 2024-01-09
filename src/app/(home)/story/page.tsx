import { NRenderer } from "@/components/notion/renderer";
import { NotionAPI } from "notion-client";
import Image from "next/image";
import { getPageImageUrls, getPageTitle } from "notion-utils";
import "@/components/notion/notion.scss";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import {
  BackgroundGradentProvider,
  GradientProvider,
  SymetricGradProvider,
} from "@/components/gradient-provider";
import GrainProvider from "@/components/grain";
import { cn } from "@/lib/utils";
import { Footer } from "../Footer";
import { Connect } from "../Connect";

export default async function Story({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  if (!searchParams.id) return null;

  const notion = new NotionAPI();

  const recordMap = await notion.getPage(searchParams.id);

  const title = getPageTitle(recordMap);

  const images = getPageImageUrls(recordMap, { mapImageUrl: (url) => url });

  return (
    <article suppressHydrationWarning className="relative">
      <GrainProvider
        grain_options={{
          patternWidth: 200,
          patternHeight: 200,
          grainOpacity: 0.1,
          grainDensity: 1,
          grainWidth: 1,
          grainHeight: 1,
        }}
      />
      <BackgroundGradentProvider className="-z-10 h-screen w-full opacity-90" />
      <SymetricGradProvider gradient_class={cn("rotate-0")} className="w-full">
        <Image
          width={400}
          height={300}
          src={images[0]}
          alt={title}
          className="w-full h-48 object-cover opacity-70 backdrop-saturate-200 backdrop-contrast-200 -z-50"
        />
      </SymetricGradProvider>
      <div className="container py-12 max-w-2xl">
        <h1 className="text-2xl text-center text-pretty font-medium">
          {title}
        </h1>
        <NRenderer recordMap={recordMap} />
        <section className="connect-section">
          <Connect />
        </section>
      </div>

      <Footer className="max-w-2xl" />
    </article>
  );
}
