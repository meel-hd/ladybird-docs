const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { rmSync, cpSync, existsSync } = fs;

const repoUrl = 'https://github.com/LadybirdBrowser/ladybird';
const tmpDir = path.join(__dirname, 'ladybird-temp');
const sourceDocs = path.join(tmpDir, 'Documentation');
const destDocs = path.join(__dirname, '..', 'Documentation');

try {
  // Step 1: Clean up any existing temp directory
  if (existsSync(tmpDir)) {
    rmSync(tmpDir, { recursive: true, force: true });
  }

  // Step 2: Clone the repository
  console.log('Cloning Ladybird repo...');
  execSync(`git clone --depth 1 ${repoUrl} "${tmpDir}"`, { stdio: 'inherit' });

  // Step 3: Check if Documentation exists
  if (!existsSync(sourceDocs)) {
    throw new Error('Documentation folder not found in cloned repository.');
  }

  // Step 4: Ensure destination doesn't already exist or clear it
  if (existsSync(destDocs)) {
    rmSync(destDocs, { recursive: true, force: true });
  }

  // Step 5: Copy the Documentation folder
  console.log('Copying Documentation...');
  cpSync(sourceDocs, destDocs, { recursive: true });

  // Step 6: Clean up the cloned repo
  console.log('Cleaning up...');
  rmSync(tmpDir, { recursive: true, force: true });

  console.log('✅ Done! Documentation copied successfully.');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
