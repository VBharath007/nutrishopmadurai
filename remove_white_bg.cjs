const { Jimp } = require("jimp");

async function removeWhiteBg() {
  try {
    const inputPath = "C:\\Users\\ELCOT\\.gemini\\antigravity-ide\\brain\\57385427-aadb-40d3-b865-0755e008d83b\\wooden_signboard_1787658301871.png";
    const outputPath = "d:\\suriyamillets\\public\\wooden_signboard.png";
    
    // Read the image
    const image = await Jimp.read(inputPath);
    
    // Iterate over all pixels
    image.scan((x, y, idx) => {
      const red = image.bitmap.data[idx + 0];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];
      
      // If the pixel is close to white, make it transparent
      // Generous threshold because AI images might have off-white or shadows
      if (red > 220 && green > 220 && blue > 220) {
        image.bitmap.data[idx + 3] = 0; // Set alpha to 0
      } else if (red > 200 && green > 200 && blue > 200) {
        // Semi transparent for anti-aliased edges
        image.bitmap.data[idx + 3] = 100;
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
