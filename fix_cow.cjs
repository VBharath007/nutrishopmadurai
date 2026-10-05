const { Jimp } = require('jimp');

async function fixImage() {
    try {
        const image = await Jimp.read('d:\\suriyamillets\\src\\assets\\cows.png');
        image.scan((x, y, idx) => {
            const alpha = image.bitmap.data[idx + 3];
            
            // If the pixel is semi-transparent, it's causing the background to show through.
            // We force any pixel with significant opacity to be fully opaque.
            if (alpha > 0 && alpha < 255) {
                if (alpha > 30) {
                    image.bitmap.data[idx + 3] = 255; // Make fully solid
                } else {
                    image.bitmap.data[idx + 3] = 0;   // Make fully transparent
                }
            }
        });
        await image.write('d:\\suriyamillets\\src\\assets\\cows.png');
        console.log("Fixed cow image alpha channel!");
    } catch (e) {
        console.error(e);
    }
}
fixImage();
