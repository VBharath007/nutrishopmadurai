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
    // Checking for MAX PROTEIN BAR or similar
    if (line.includes('\"category\": \"MAX PROTEIN BAR\"') || line.includes('\"category\": \"MAX PROTIEN BAR\"') || line.includes('\"category\": \"MAX PROTEIN CHIPS\"') && line.includes('BAR')) {
        insideCategory = true;
    }
    if (insideCategory && line.includes('\"category\": ')) {
        currentProduct.category = line.match(/\"category\": \"([^\"]+)\"/)[1];
    }
    if (insideCategory && line.includes('\"price\": ')) {
        const priceMatch = line.match(/\"price\": (\d+)/);
        if (priceMatch && !currentProduct.price) {
            currentProduct.price = priceMatch[1];
        }
    }
    if (insideCategory && line.includes('\"size\": ')) {
        const sizeMatch = line.match(/\"size\": \"([^\"]+)\"/);
        if (sizeMatch) {
            const size = sizeMatch[1];
            // Read next line for price of variant
            const priceMatch = lines[i+1].match(/\"price\": (\d+)/);
            if(priceMatch) {
                currentProduct.variants.push({ size, price: priceMatch[1] });
            }
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
const targets = ["CHOCO BERRY BAR", "CHOCO CLASSIC BAR", "CHOCO ALMOND BAR", "DATES & ALMOND BAR", "FRUIT & NUT", "CHOCO DELIGHT", "FRUIT & SEED", "SPORTS BAR", "PEANUT BUTTER", "NUTS & SEEDS", "MELTING CHOCOLATE BAR", "FIG & DATES BAR", "BERRY DELITE BAR", "CHOCO SLIM BAR", "CHOCO FUDGE BAR", "CHOCO WAFER", "STRAWBERRY WAFER", "CHOCO SPREAD"];
console.log(JSON.stringify(results.filter(p => targets.includes(p.name)), null, 2));
