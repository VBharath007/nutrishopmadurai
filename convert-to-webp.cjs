const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target PNG files to convert (sorted by size, biggest first)
const assetsDir = path.join(__dirname, 'src', 'assets');

async function convertPngsToWebp(dir) {
  const files = fs.readdirSync(dir);
  let converted = 0;
  let totalSaved = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      const { c, s } = await convertPngsToWebp(fullPath);
      converted += c;
      totalSaved += s;
      continue;
    }

    if (path.extname(file).toLowerCase() !== '.png') continue;

    const webpPath = fullPath.replace(/\.png$/i, '.webp');
    const originalSize = stat.size;

    try {
      await sharp(fullPath)
        .webp({ quality: 85, effort: 4 })
        .toFile(webpPath);

      const newSize = fs.statSync(webpPath).size;
      const saved = originalSize - newSize;
      totalSaved += saved;
      converted++;
      console.log(
        `✅ ${file} → ${path.basename(webpPath)}  (${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB, saved ${(saved / 1024).toFixed(0)} KB)`
      );
    } catch (err) {
      console.error(`❌ Failed: ${file} — ${err.message}`);
    }
  }

  return { c: converted, s: totalSaved };
}

(async () => {
  console.log('🔄 Starting PNG → WebP conversion...\n');
  const { c, s } = await convertPngsToWebp(assetsDir);
  console.log(`\n✨ Done! Converted ${c} files. Total saved: ${(s / 1024 / 1024).toFixed(2)} MB`);
})();
