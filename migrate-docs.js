const fs = require("fs");
const path = require("path");
const { mkdirSync, existsSync, rmSync, copyFileSync } = fs;

// CONFIG
const SOURCE_DIR = path.resolve(__dirname, "ladybird/Documentation");
const TARGET_DIR = path.resolve(__dirname, "content/docs");

// Clean and prepare the target directory
if (existsSync(TARGET_DIR)) {
  rmSync(TARGET_DIR, { recursive: true });
}
mkdirSync(TARGET_DIR, { recursive: true });

/**
 * Converts a filename to a title
 * e.g., "Building.md" => "Building"
 */
function filenameToTitle(filename) {
  return filename
    .replace(/[-_]/g, " ")
    .replace(/\..+$/, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function processMarkdownFile(filePath, targetPath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath);
  const title = filenameToTitle(filename);

  // Skip files that aren't .md
  if (!filename.endsWith(".md")) return;

  const frontmatter = `---\ntitle: ${title}\n---\n\n`;
  const newContent = frontmatter + content;

  fs.writeFileSync(targetPath, newContent, "utf-8");
}

function walkAndProcess(dir, relative = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(dir, entry.name);
    const relPath = path.join(relative, entry.name);
    const targetPath = path.join(TARGET_DIR, relPath);

    if (entry.isDirectory()) {
      mkdirSync(targetPath, { recursive: true });
      walkAndProcess(srcPath, path.join(relative, entry.name));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      mkdirSync(path.dirname(targetPath), { recursive: true });
      processMarkdownFile(srcPath, targetPath);
    }
  }
}

// Run it
if (!existsSync(SOURCE_DIR)) {
  console.error("Source Documentation folder does not exist:", SOURCE_DIR);
  process.exit(1);
}

walkAndProcess(SOURCE_DIR);
console.log("Documentation migration complete.");
