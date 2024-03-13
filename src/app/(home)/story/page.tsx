import { NotionAPI } from "notion-client";
import Image from "next/image";
import { getPageImageUrls, getPageProperty, getPageTitle } from "notion-utils";

import "@/components/notion/notion.scss";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { BackgroundGradentProvider } from "@/components/gradient-provider";
import GrainProvider from "@/components/grain";
import { Footer } from "../Footer";
import { Connect } from "../Connect";
import { Home, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

import { NRenderer } from "@/components/notion/renderer";
import { Metadata, ResolvingMetadata } from "next";
import Comments, { Reactions } from "@/components/comments";

export const revalidate = 100;

type Props = {
  searchParams: { id?: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(searchParams.id!);

  const title = getPageTitle(recordMap);
  const page_block = Object.values(recordMap.block)[0].value;
  const description = getPageProperty("description", page_block, recordMap);
  const author = getPageProperty("author", page_block, recordMap);
  const github_username = getPageProperty("github", page_block, recordMap);
  const images = getPageImageUrls(recordMap, { mapImageUrl: (url) => url });

  const params = new URLSearchParams({
    title: title.toString(),
    description: description.toString(),
    author: author.toString(),
    images: images[0],
    github_username: github_username.toString(),
  });

  const image_origin_url =
    process.env.NODE_ENV !== "development"
      ? "https://raj.how"
      : "http://localhost:3000";

  const og_image_url = new URL("/api/og", image_origin_url);

  og_image_url.search = params.toString();

  return {
    title: title,
    description: description.toString() || "Written by raj",
    openGraph: {
      images: [
        {
          url: og_image_url.toString(),
          type: "image/jpeg",
          height: 630,
          width: 1200,
        },
      ],
      authors: [author.toString()],
    },
    authors: [
      {
        name: author.toString(),
      },
    ],

    twitter: {
      images: [
        {
          url: og_image_url.toString(),
          type: "image/jpeg",
          height: 630,
          width: 1200,
        },
      ],
      creator: author.toString(),
      card: "summary_large_image",
      title: title,
      description: description.toString() || "Written by raj",
      site: "raj.how",
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

  const description = getPageProperty(
    "description",
    Object.values(recordMap.block)[0].value,
    recordMap,
  );

  const repo = process.env.COMMENTS_REPO;
  const repoId = process.env.COMMENTS_REPO_ID;
  const category = process.env.COMMENTS_CATEGORY;
  const categoryId = process.env.COMMENTS_CATEGORY_ID;

  return (
    <article suppressHydrationWarning className="relative">
      {/* <GrainProvider */}
      {/*   grain_options={{ */}
      {/*     patternWidth: 200, */}
      {/*     patternHeight: 200, */}
      {/*     grainOpacity: 0.1, */}
      {/*     grainDensity: 1, */}
      {/*     grainWidth: 1, */}
      {/*     grainHeight: 1, */}
      {/*   }} */}
      {/* /> */}

      <div
        className="absolute z-10 top-0 left-0 w-full h-full bg-transparent bg-repeat round pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 600%22%3E%3Cfilter id=%22a%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23a)%22/%3E%3C/svg%3E')",
        }}
      ></div>
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
        <p className="text-xs italic text-center text-muted-foreground">
          {description}
        </p>

        <section className="comments-section h-[58px] my-2 overflow-hidden">
          {repo && repoId && category && categoryId ? (
            <Reactions
              repo={repo as `${string}/${string}`}
              repoId={repoId}
              category={category}
              categoryId={categoryId}
            />
          ) : null}
        </section>

        <div className="text-foreground/80 flex gap-1 hover:no-underline sticky top-12 z-50 mt-2 mx-auto w-fit">
          <Link href="/">
            <div className="backdrop-blur border border-foreground/20 backdrop-saturate-100 bg-background/60 backdrop-contrast-125 p-1 px-2 w-fit rounded-full flex gap-1 items-center">
              <Home className="animate-in" size={12} />
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <a href="#comments">
            <div className="backdrop-blur border border-foreground/20 bg-background/60 backdrop-saturate-100 backdrop-contrast-125 p-1 px-2 w-fit rounded-full flex gap-1 items-center">
              <MessageCircleIcon className="animate-in" size={12} />
              <span className="text-xs">Comments</span>
            </div>
          </a>
        </div>

        <NRenderer recordMap={recordMap} />
        <section className="connect-section">
          <Connect />
        </section>

        <section id="comments" className="comments-section pt-4">
          {repo && repoId && category && categoryId ? (
            <Comments
              repo={repo as `${string}/${string}`}
              repoId={repoId}
              category={category}
              categoryId={categoryId}
            />
          ) : null}
        </section>
      </div>

      <Footer className="max-w-2xl" />
    </article>
  );
}
