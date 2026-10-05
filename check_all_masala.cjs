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
    
    if (line.includes('\"category\": ') && currentProduct) {
        currentProduct.category = line.match(/\"category\": \"([^\"]+)\"/)[1];
    }
    if (line.includes('\"price\": ') && currentProduct && !currentProduct.price) {
        const priceMatch = line.match(/\"price\": (\d+)/);
        if (priceMatch) {
            currentProduct.price = priceMatch[1];
        }
    }
    if (line.includes('\"size\": ') && currentProduct) {
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
    if (line.includes('\"images\": [') && currentProduct) {
        const match = lines[i+1].match(/\"([^\"]+)\"/);
        if(match) currentProduct.image = match[1];
    }
    if ((line.includes('    },') && !line.includes('            },')) && currentProduct) {
        if(currentProduct.category && currentProduct.category.includes('MASALA POWDERS')) {
            results.push(currentProduct);
        }
        currentProduct = null;
    }
}
const targets = ["VATHAL PODI", "SAMBAR PODI", "KULAMBU MASALA PODI", "MALLI PODI", "RASAM POWDER", "CHANNA MASALA", "GARAM MASALA", "KASHMIRI CHILLI POWDER", "HOME MADE MANJAL PODI", "VIRALI MANJAL PODI", "HOMEMADE CHICKEN 65 MASALA PODI", "ALL GRAVY MASALA", "SUKKU PODI", "CHICKEN MASALA"];
console.log(JSON.stringify(results.filter(p => targets.includes(p.name)), null, 2));
