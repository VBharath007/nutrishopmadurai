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
    // Checking for MASALA POWDER
    if (line.includes('\"category\": \"MASALA POWDER') || line.includes('MASALA')) {
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
        if(currentProduct.category && currentProduct.category.includes('MASALA')) {
            results.push(currentProduct);
        }
        insideCategory = false;
    }
}
const targets = ["VATHAL PODI", "SAMBAR PODI", "KULAMBU MASALA PODI", "MALLI PODI", "RASAM POWDER", "CHANNA MASALA", "GARAM MASALA", "KASHMIRI CHILLI POWDER", "HOME MADE MANJAL PODI", "VIRALI MANJAL PODI", "HOMEMADE CHICKEN 65 MASALA PODI", "ALL GRAVY MASALA", "SUKKU PODI", "CHICKEN MASALA"];
console.log(JSON.stringify(results.filter(p => targets.includes(p.name) || p.category.includes("MASALA POWDER(GENERALISE)")), null, 2));
