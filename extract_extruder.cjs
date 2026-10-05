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
    // Checking for MILLET EXTRUDER SNACKS
    if (line.includes('\"category\": \"MILLET EXTRUDER SNACKS\"') || line.includes('\"category\": \"EXTRUDER SNACKS\"') || line.includes('\"category\": \"SNACKS\"') && line.includes('MILLET')) {
        insideCategory = true;
    }
    if (insideCategory && line.includes('\"category\": ')) {
        // Just checking category field
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
// Filter the exact items we are looking for
const targets = ["RAGI CHOCO STARS", "RAGI CENTER FILLS", "CHOCO COATED MONKE", "ALMOND HEARTS", "PEANUT BALLS", "MULTIGRAIN SMALL RINGS", "QUINOA PUFFS", "ACHARI MASALA", "PERI PERI"];
console.log(JSON.stringify(results.filter(p => targets.includes(p.name) || p.category === "MILLET EXTRUDER SNACKS"), null, 2));
