# Ladybird Docs

This repository contains the structured and Fumadocs-compatible documentation for the [Ladybird browser](https://github.com/LadybirdBrowser/ladybird).

> [!IMPORTANT]  
> This is a community-maintained documentation site. Ladybird is under active development, and parts of the documentation may become outdated. If you spot something inaccurate or unclear, please open an issue or submit a pull request.

---

## Purpose

The goal of this repository is to provide:

- A user-friendly, navigable site powered by [Fumadocs](https://fumadocs.dev)
- Updated and structured documentation for developers and contributors
- A single source of truth that replaces the original `/Documentation` folder in the [main Ladybird repository](https://github.com/LadybirdBrowser/ladybird)

---

## Structure

```
content/
└── docs/
    ├── meta.json                    # Sidebar structure and page order
    ├── index.mdx                    # Docs main page
    ├── BuildInstructionsLadybird.mdx
    ├── AdvancedBuildInstructions.mdx
    ├── ...
    ├── EditorConfiguration/
    │   ├── meta.json
    │   ├── VSCode.mdx
    │   └── ...
    └── HumanInterfaceGuidelines/
        ├── meta.json
        └── ...
```

All pages are written in MDX format and enriched with frontmatter (e.g., `title`) to integrate seamlessly with Fumadocs.

---

## Running Locally

To preview the docs site locally:

```bash
bun install
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to browse the site.

---

## Contributing

We welcome contributions! Please:

- Follow the existing structure and naming conventions
- Use proper frontmatter in each \`.mdx\` file:

```mdx
---
title: Page Title
description: Optional short description
---
```

- Run the dev server locally to preview your changes
- Keep content accurate and up to date as Ladybird evolves

---

## Known Issues & Warnings

- Some documents were migrated from plaintext or Markdown and may need cleanup
- Outdated information may exist — feel free to submit fixes
- Fumadocs uses MDX, so avoid raw HTML and use \`{/* */}\` for comments instead of \`<!-- -->\`
- All files must have a \`.mdx\` extension

