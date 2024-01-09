import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopBlur } from "@/components/top-blur";

const inter = Inter({ subsets: ["latin"], variable: "--body-font" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--display-font" });

export const metadata: Metadata = {
  title: "Raj Sharma - Portfolio",
  creator: "Raj Sharma",
  metadataBase: new URL("https://raj.how/"),
  description: "Building experimental design systems",
  twitter: {
    card: "summary_large_image",
    site: "@xrehpicx",
    creator: "@xrehpicx",
    images: ["twitter-image.png"],
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(inter.className, inter.variable, dm.variable, "relative")}
      >
        <TopBlur />
        {children}
      </body>
    </html>
  );
}
