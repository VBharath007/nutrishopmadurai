const fs = require('fs');
const content = fs.readFileSync('src/data/products.js', 'utf8');
const lines = content.split('\n');
let insideCategory = false;
let currentProduct = null;
const results = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('\"name\": ')) {
        currentProduct = { name: line.match(/\"name\": \"([^\"]+)\"/)[1], variants: [] };
    }
    if (line.includes('\"category\": \"MAAVU VARITIES\"')) {
        insideCategory = true;
    }
    if (insideCategory && line.includes('\"price\": ')) {
        const price = line.match(/\"price\": (\d+)/);
        if (price) currentProduct.price = price[1];
    }
    if (insideCategory && line.includes('\"size\": ')) {
        const size = line.match(/\"size\": \"([^\"]+)\"/)[1];
        // We will just read the next line which is price for variants
        const priceMatch = lines[i+1].match(/\"price\": (\d+)/);
        if(priceMatch) {
            currentProduct.variants.push({ size, price: priceMatch[1] });
        }
    }
    if (insideCategory && line.includes('\"images\": [')) {
        const match = lines[i+1].match(/\"([^\"]+)\"/);
        if(match) currentProduct.image = match[1];
    }
    if (insideCategory && (line.includes('    },') && !line.includes('            },'))) {
        results.push(currentProduct);
        insideCategory = false;
    }
}
console.log(JSON.stringify(results, null, 2));
