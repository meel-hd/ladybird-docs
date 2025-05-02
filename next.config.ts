/* eslint-disable perfectionist/sort-objects */
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  experimental: {
    // ppr: true,
    inlineCss: true,
    // reactCompiler: true,
    // viewTransition: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: [
    "typescript",
    "twoslash",
  ],
  images: {
    remotePatterns: [
      new URL("https://github.com/**"),
    ]
  }
};

export default withMDX(config);
