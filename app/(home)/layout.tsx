import type { LinkItemType } from "fumadocs-ui/layouts/links";
import type { ReactNode } from "react";

import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";

const links = [
  {
    active: "nested-url",
    text: "Docs",
    url: "/docs",
  },
  {
    active: "nested-url",
    text: "Roadmap",
    url: "/docs/roadmap",
  },
  {
    active: "nested-url",
    text: "FAQ",
    url: "/docs/FAQ",
  },
  {
    text: "Sponsors",
    url: "https://ladybird.org/#sponsors",
    external: true,
  },
  {
    text: "News",
    url: "https://ladybird.org/#news",
    external: true,
  },
] as const satisfies LinkItemType[];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={links}
    >
      {children}
    </HomeLayout>
  );
}
