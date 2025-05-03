const fs = require("fs");
const path = require("path");

/**
 * Function to replace HTML-style comments with MDX-style comments
 * @param {string} content - The content of the MDX file
 * @returns {string} - The content with comments fixed
 */
function fixComments(content) {
  // Replace all occurrences of HTML-style comments with MDX-style
  return content.replace(/<!--(.*?)-->/gs, '{/*$1*/}');
}

/**
 * Recursively walk through the docs directory and fix comments in .mdx files
 */
function fixCommentsInFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixCommentsInFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      const fixedContent = fixComments(content);
      
      // Only write back if content changed
      if (content !== fixedContent) {
        fs.writeFileSync(fullPath, fixedContent, "utf-8");
        console.log(`Fixed comments in: ${fullPath}`);
      }
    }
  }
}

// Set root directory to start from
const ROOT_DIR = path.resolve(__dirname, "content/docs");

if (!fs.existsSync(ROOT_DIR)) {
  console.error("Directory not found:", ROOT_DIR);
  process.exit(1);
}

fixCommentsInFiles(ROOT_DIR);
console.log("MDX comment fix completed.");
