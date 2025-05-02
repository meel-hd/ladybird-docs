import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootProvider } from "fumadocs-ui/provider";
import { ViewTransitions } from "next-view-transitions";
import { Nunito_Sans } from "next/font/google";
import { baseUrl } from "../lib/metadata";
import "./base.css";

import "./overrides.css";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "500", "700"],
});

export const metadata = {
  description: "Ladybird Browser documentation and resources.",
  title: {
    default: "Ladybird Docs",
    template: "%s | Ladybird Docs",
  },
  metadataBase: baseUrl,
} as const satisfies Metadata;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html className={nunito_sans.variable} lang="en" suppressHydrationWarning>
        <meta content="#fff" name="msapplication-TileColor" />
        <meta content="en" httpEquiv="Content-Language" />
        <meta content="Ladybird Docs" name="apple-mobile-web-app-title" />
        <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="https://ladybird.org" name="twitter:site" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <body className="flex flex-col min-h-screen">
          <RootProvider>{children}</RootProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
