import type { Metadata, Viewport } from 'next';
import { Fraunces, Newsreader } from 'next/font/google';
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

export const viewport: Viewport = {
  themeColor: '#f5efe3',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: {
    default: 'Raj Sharma',
    template: '%s - Raj Sharma',
  },
  creator: 'Raj Sharma',
  metadataBase: new URL('https://raj.how/'),
  description: 'Software builder and writer in San Francisco.',
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
        className={`${bodyFont.variable} ${headingFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
