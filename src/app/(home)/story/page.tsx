import { NotionAPI } from "notion-client";
import Image from "next/image";
import { getPageImageUrls, getPageTitle } from "notion-utils";
import "@/components/notion/notion.scss";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { BackgroundGradentProvider } from "@/components/gradient-provider";
import GrainProvider from "@/components/grain";
import { Footer } from "../Footer";
import { Connect } from "../Connect";
import { Home } from "lucide-react";
import Link from "next/link";

import { NRenderer } from "@/components/notion/renderer";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 100;

type Props = {
  searchParams: { id?: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(searchParams.id!);

  const title = getPageTitle(recordMap);

  const images = getPageImageUrls(recordMap, { mapImageUrl: (url) => url });

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    openGraph: {
      images: [...images, ...previousImages],
    },
  };
}

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
      <BackgroundGradentProvider className="-z-10 h-screen w-full opacity-60" />
      <Image
        width={400}
        height={300}
        src={images[0]}
        alt={title}
        priority
        className="w-full h-48 object-cover opacity-70 backdrop-saturate-200 backdrop-contrast-200 -z-50"
      />
      <div className="container py-12 max-w-2xl">
        <h1 className="text-2xl text-center text-pretty font-medium">
          {title}
        </h1>
        <Link className="text-foreground/80 hover:no-underline" href="/">
          <div className="border sticky top-12 z-50 mt-2 mx-auto backdrop-blur border-foreground/20 backdrop-saturate-100 backdrop-contrast-125 p-1 px-2 w-fit rounded-full flex gap-1 items-center">
            <Home className="animate-in" size={12} />
            <span className="text-xs">Home</span>
          </div>
        </Link>
        <NRenderer recordMap={recordMap} />
        <section className="connect-section">
          <Connect />
        </section>
      </div>

      <Footer className="max-w-2xl" />
    </article>
  );
}
