const fs = require('fs');
const path = require('path');

// Directory to process
const docsDir = path.join(__dirname, '..', 'content', 'docs');

// Regex to match markdown links like [Label](path/to/file.md) or .mdx
const linkRegex = /\[([^\]]+)\]\(([^)]+)\.(md|mdx)\)/g;

/**
 * Recursively traverse a directory and collect all .md/.mdx files
 */
function getMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

/**
 * Process and rewrite file contents
 */
function rewriteLinksInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = content.replace(linkRegex, (match, label, linkPath, ext) => {
    return `[${label}](${linkPath})`;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`Updated links in: ${filePath}`);
  }
}

/**
 * Main script
 */
function main() {
  if (!fs.existsSync(docsDir)) {
    console.error('Directory not found:', docsDir);
    process.exit(1);
  }

  const files = getMarkdownFiles(docsDir);
  files.forEach(rewriteLinksInFile);

  console.log('✅ Finished updating Markdown links.');
}

main();
