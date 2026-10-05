const fs = require('fs');
const content = fs.readFileSync('src/data/products.js', 'utf8');
const lines = content.split('\n');
let insideDosaMix = false;
let currentProduct = null;
const results = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('\"name\": ')) {
        currentProduct = { name: line.match(/\"name\": \"([^\"]+)\"/)[1] };
    }
    if (line.includes('\"category\": \"DOSAMIX\"')) {
        insideDosaMix = true;
    }
    if (insideDosaMix && line.includes('\"price\": ')) {
        currentProduct.price = line.match(/\"price\": (\d+)/)[1];
    }
    if (insideDosaMix && line.includes('\"size\": ')) {
        if (!currentProduct.size) {
            currentProduct.size = line.match(/\"size\": \"([^\"]+)\"/)[1];
        }
    }
    if (insideDosaMix && line.includes('\"images\": [')) {
        currentProduct.image = lines[i+1].match(/\"([^\"]+)\"/)[1];
    }
    if (insideDosaMix && (line.includes('    },') && !line.includes('            },'))) {
        results.push(currentProduct);
        insideDosaMix = false;
    }
}
console.log(JSON.stringify(results, null, 2));
