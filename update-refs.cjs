const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, 'src');

function updateFileReferences(dir) {
  const files = fs.readdirSync(dir);
  let updatedFiles = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      updatedFiles += updateFileReferences(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (!['.jsx', '.js', '.css', '.ts', '.tsx'].includes(ext)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    const original = content;

    // Replace .png with .webp in imports and url() references
    // Only replace when the PNG file has a corresponding webp
    content = content.replace(/(['"`(])([^'"`()]+)\.png(['"`)])/g, (match, q1, base, q3) => {
      // Resolve the path to check if webp exists
      const fileDir = path.dirname(fullPath);
      let absPath;
      if (base.startsWith('/')) {
        absPath = path.join(__dirname, 'public', base + '.png');
      } else {
        absPath = path.resolve(fileDir, base + '.png');
      }
      const webpPath = absPath.replace(/\.png$/i, '.webp');

      if (fs.existsSync(webpPath)) {
        return `${q1}${base}.webp${q3}`;
      }
      return match; // Keep original if no webp available
    });

    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      updatedFiles++;
      console.log(`✅ Updated: ${path.relative(__dirname, fullPath)}`);
    }
  }

  return updatedFiles;
}

console.log('🔄 Updating source file references from .png to .webp...\n');
const count = updateFileReferences(srcDir);
console.log(`\n✨ Done! Updated ${count} source files.`);
