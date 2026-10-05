const { Jimp } = require("jimp");

async function removeWhiteBg() {
  try {
    const inputPath = "src/assets/realbee.jpg";
    const outputPath = "src/assets/realbee_transparent.png";
    
    // Read the image
    const image = await Jimp.read(inputPath);
    
    // Iterate over all pixels
    image.scan((x, y, idx) => {
      const red = image.bitmap.data[idx + 0];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];
      
      // If the pixel is close to white, make it transparent
      if (red > 230 && green > 230 && blue > 230) {
        image.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    // Save the image
    await image.write(outputPath);
    console.log("Background removed successfully!");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

removeWhiteBg();
