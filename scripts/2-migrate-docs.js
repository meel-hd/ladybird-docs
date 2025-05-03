const fs = require("fs");
const path = require("path");
const { mkdirSync, existsSync, rmSync, copyFileSync } = fs;

// CONFIG
const SOURCE_DIR = path.resolve(__dirname, "../Documentation");
const TARGET_DIR = path.resolve(__dirname, "../content/docs");

// Clean and prepare the target directory
if (existsSync(TARGET_DIR)) {
  rmSync(TARGET_DIR, { recursive: true });
}
mkdirSync(TARGET_DIR, { recursive: true });


function processMarkdownFile(filePath, targetPath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath);

  // Extract the title from the first line that starts with #, or use the filename
  let title = '"';
  const lines = content.split("\n").map(line => line.trim());
  for (const line of lines) {
    if (line.startsWith("#")) {
      title += line.replace(/^#+\s*/, "").trim() + '"';
      // remove the original title line from content
      content = content.replace(line, "");
      break;
    }
  }
  if (!title) {
    title = path.basename(filePath, ".md").replace(/[-_]/g, " ");
  }

  // Skip files that aren't .md
  if (!filename.endsWith(".md")) return;

  const frontmatter = `---\ntitle: ${title}\n---\n\n`;
  const newContent = frontmatter + content;
  // Convert README.md to index.md
  if (filename.toLowerCase() === "readme.md") {
    targetPath = path.join(path.dirname(targetPath), "index.md");
  }
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
console.log("All .md files processed and copied to content/docs.");

// Copy the Images folder to root
const sourceImages = path.join(SOURCE_DIR, "Images");
const targetImages = path.join("/", "Images");
if (existsSync(sourceImages)) {
  if (existsSync(targetImages)) {
    rmSync(targetImages, { recursive: true });
  }
  mkdirSync(targetImages, { recursive: true });
  fs.readdirSync(sourceImages).forEach(file => {
    const srcFile = path.join(sourceImages, file);
    const destFile = path.join(targetImages, file);
    copyFileSync(srcFile, destFile);
  });
}
else {
  console.error("Source Images folder does not exist:", sourceImages);
  process.exit(1);
}


// Delete the documentation source folder SOURCE_DIR
if (existsSync(SOURCE_DIR)) {
  rmSync(SOURCE_DIR, { recursive: true });
}
else {
  console.error("Source Documentation folder does not exist:", SOURCE_DIR);
  process.exit(1);
}

console.log("Documentation migration complete.");
