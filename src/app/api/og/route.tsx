import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// export const contentType = "image/jpeg";

const width = 1200 / 2;
const height = 630 / 2;

export async function GET(props: NextRequest) {
  const url = new URL(props.url);

  const title = url.searchParams.get("title");
  const description = url.searchParams.get("description");
  const author = url.searchParams.get("author");
  const github = url.searchParams.get("github_username");
  const images = url.searchParams.get("images");

  const image_origin_url =
    process.env.NODE_ENV !== "development"
      ? "https://raj.how"
      : "http://localhost:3000";

  return new ImageResponse(
    (
      <div tw="flex flex-col font-sans border-red-400 m-0 w-full h-full bg-black text-white">
        <img
          width={width}
          height={height}
          tw="absolute top-0 left-0"
          src={`${image_origin_url}/background-gradient.png`}
          alt="og"
        />
        <div tw="p-3 px-6 bg-white/20 flex flex-1 justify-center flex-col">
          <span tw="text-black text-3xl font-bold font-sans">
            {title?.toString()}
          </span>
          <span tw="text-black/80 text-xl">{description?.toString()}</span>
          <div tw="flex mt-1 items-center rounded-full mr-auto">
            <img
              width="24"
              height="24"
              src={`https://github.com/${github}.png`}
              tw="rounded-full mr-1"
            />

            <span tw="text-black/80 font-thin text-xl">
              {author?.toString()}
            </span>
          </div>
        </div>
        {images && images?.split(",")[0].trim() ? (
          <img
            width={width}
            tw="flex-1"
            style={{
              objectFit: "cover",
              opacity: 0.6,
            }}
            src={images?.split(",")[0].trim()}
            alt="og"
          />
        ) : null}
      </div>
    ),
    {
      width,
      height,
      headers: {
        "Content-Type": "image/jpeg",
        "content-type": "image/jpeg",
      },
    },
  );
}
