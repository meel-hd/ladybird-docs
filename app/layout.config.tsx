import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import logo from "@/assets/logo.svg";

import Image from "next/image";
import React from "react";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/LadybirdBrowser/ladybird",
  links: [],
  nav: {
    title: (
      <div className="flex items-between gap-2.5 min-w-max">
        <Image
          alt="logo"
          width="30" 
          height="20"
          quality={100}
          src={logo}
        />
        <p>Ladybird {" "}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Docs
          </span>
        </p>
      </div>
    ),
  },
};
