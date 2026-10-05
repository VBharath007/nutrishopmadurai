const { Jimp } = require('jimp');

async function fillHoles() {
    try {
        const image = await Jimp.read('d:\\suriyamillets\\src\\assets\\cows.png');
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        // Create a 2D array to track visited background pixels
        const visited = Array.from({ length: height }, () => new Uint8Array(width));
        
        // Queue for BFS flood fill
        const queue = [];
        
        // Add all edge pixels to queue if they are transparent
        for (let x = 0; x < width; x++) {
            for (let y of [0, height - 1]) {
                const idx = (image.bitmap.width * y + x) << 2;
                if (image.bitmap.data[idx + 3] === 0) {
                    queue.push({x, y});
                    visited[y][x] = 1;
                }
            }
        }
        for (let y = 1; y < height - 1; y++) {
            for (let x of [0, width - 1]) {
                const idx = (image.bitmap.width * y + x) << 2;
                if (image.bitmap.data[idx + 3] === 0) {
                    queue.push({x, y});
                    visited[y][x] = 1;
                }
            }
        }
        
        // BFS to find all connected transparent background pixels
        const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
        let qIdx = 0;
        while (qIdx < queue.length) {
            const p = queue[qIdx++];
            for (let d of dirs) {
                const nx = p.x + d[0];
                const ny = p.y + d[1];
                if (nx >= 0 && nx < width && ny >= 0 && ny < height && visited[ny][nx] === 0) {
                    const idx = (image.bitmap.width * ny + nx) << 2;
                    if (image.bitmap.data[idx + 3] === 0) {
                        visited[ny][nx] = 1;
                        queue.push({x: nx, y: ny});
                    }
                }
            }
        }
        
        // Now, any pixel with alpha === 0 that was NOT visited is a hole!
        let holesFilled = 0;
        image.scan((x, y, idx) => {
            if (image.bitmap.data[idx + 3] === 0 && visited[y][x] === 0) {
                // It's a hole inside the cow! Make it solid black/dark.
                // Or just make it solid with the color it currently has (which is probably black)
                image.bitmap.data[idx + 3] = 255;
                holesFilled++;
            }
        });
        
        await image.write('d:\\suriyamillets\\src\\assets\\cows.png');
        console.log(`Successfully filled ${holesFilled} hole pixels inside the cow!`);
    } catch (e) {
        console.error(e);
    }
}
fillHoles();
