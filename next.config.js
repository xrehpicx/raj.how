const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  env: {
    COMMENTS_REPO: "xrehpicx/raj.how",
    COMMENTS_REPO_ID: "R_kgDOJt-ekg",
    COMMENTS_CATEGORY: "General",
    COMMENTS_CATEGORY_ID: "DIC_kwDOJt-eks4Cd7mb",
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "*.amazonaws.com",
      },
      {
        hostname: "*.raj.how",
      },
    ],
  },
};

module.exports = withMDX(nextConfig);
