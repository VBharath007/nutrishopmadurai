const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'src', 'assets', 'nutrishop-logo.webp');
const publicDir = path.join(__dirname, 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  if (!fs.existsSync(logoPath)) {
    console.error('Logo not found at', logoPath);
    return;
  }

  for (const item of sizes) {
    const outPath = path.join(publicDir, item.name);
    await sharp(logoPath)
      .resize(item.size, item.size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(outPath);
    console.log(`Generated ${item.name}`);
  }

  // Also convert one to favicon.ico (using 32x32 png, browsers accept png as ico or we can just use the png as the main favicon)
  // We will just update index.html to use the PNGs.
}

generateFavicons().catch(console.error);
