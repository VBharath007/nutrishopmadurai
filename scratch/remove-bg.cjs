const Jimp = require('jimp');

async function removeBg() {
  try {
    console.log('Reading image...');
    const image = await Jimp.read('d:/suriyamillets/src/assets/shoplg.png');
    console.log('Image read successfully. Scanning pixels...');
    
    // We will make white/near-white pixels transparent
    // Tolerance for "white"
    const threshold = 240;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      if (red > threshold && green > threshold && blue > threshold) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });

    console.log('Writing transparent image...');
    await image.writeAsync('d:/suriyamillets/src/assets/shoplg-transparent.png');
    console.log('Done!');
  } catch (error) {
    console.error('Error removing background:', error);
  }
}

removeBg();
