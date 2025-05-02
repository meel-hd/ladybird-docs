const fs = require("fs");
const path = require("path");

/**
 * Recursively walk through a directory and rename `.md` files to `.mdx`
 */
function renameMdToMdx(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      renameMdToMdx(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const newPath = fullPath.replace(/\.md$/, ".mdx");
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${fullPath} → ${newPath}`);
    }
  }
}

// Set root directory to start from
const ROOT_DIR = path.resolve(__dirname, "content/docs");

if (!fs.existsSync(ROOT_DIR)) {
  console.error("Directory not found:", ROOT_DIR);
  process.exit(1);
}

renameMdToMdx(ROOT_DIR);
console.log("All .md files renamed to .mdx.");
