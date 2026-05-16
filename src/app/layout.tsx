import type { Metadata, Viewport } from 'next';
import { Fraunces, Lavishly_Yours, Newsreader } from 'next/font/google';
import './globals.css';

const bodyFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const headingFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const titleFont = Lavishly_Yours({
  subsets: ['latin'],
  variable: '--font-title',
  weight: '400',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#151515',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: {
    default: 'Raj Sharma',
    template: '%s - Raj Sharma',
  },
  creator: 'Raj Sharma',
  metadataBase: new URL('https://raj.how/'),
  description: 'Breaking and building.',
  twitter: {
    card: 'summary',
    site: '@xrehpicx',
    creator: '@xrehpicx',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${titleFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
