const fs = require('fs');
const path = require('path');

const repoDir = 'd:\\\\suriyamillets';
const productsFilePath = path.join(repoDir, 'src', 'data', 'products.js');
const imagesDir = path.join(repoDir, 'public', 'Product-images');

const extractQuantity = (str) => {
    if (!str) return null;
    const match = str.match(/(\d+(?:\.\d+)?)\s*(g|gm|kg|ml|l|lit|pcs?|pieces?)\b/i);
    if (match) {
        let unit = match[2].toLowerCase();
        if (unit === 'g') unit = 'gm';
        if (unit === 'l') unit = 'lit';
        if (unit === 'pc') unit = 'pcs';
        return { value: parseFloat(match[1]), unit: unit };
    }
    return null;
};

const normalizeStr = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const getSimilarity = (s1, s2) => {
    const w1 = s1.toLowerCase().replace(/[-_]/g, ' ').split(/\s+/).filter(Boolean);
    const w2 = s2.toLowerCase().replace(/[-_]/g, ' ').split(/\s+/).filter(Boolean);
    if (w1.length === 0 || w2.length === 0) return 0;

    let common = 0;
    for (const w of w1) {
        if (w2.includes(w)) common++;
    }
    return common / Math.max(w1.length, w2.length);
};

// Index images
const categories = fs.readdirSync(imagesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const imageIndex = {};

for (const cat of categories) {
    const catLower = normalizeStr(cat);
    const files = fs.readdirSync(path.join(imagesDir, cat)).filter(f => !f.startsWith('.'));
    imageIndex[catLower] = files.map(file => {
        return {
            filename: file,
            name: file.replace(/\.[^/.]+$/, ""), // remove extension
            qty: extractQuantity(file),
            relPath: `/Product-images/${cat}/${file}`
        };
    });
}

// Read products
const productsContent = fs.readFileSync(productsFilePath, 'utf8');
const match = productsContent.match(/export const productsData = (\[[\s\S]*\]);?/);
if (!match) {
    console.error("Could not find productsData array");
    process.exit(1);
}

let productsData;
try {
    productsData = Function('return ' + match[1])();
} catch (e) {
    console.error("Failed to parse productsData", e);
    process.exit(1);
}

let matchedCount = 0;
const unmatched = [];

for (const product of productsData) {
    const catLower = normalizeStr(product.category);

    let productQty = extractQuantity(product.name);
    if (!productQty && product.variants && product.variants.length > 0) {
        productQty = extractQuantity(product.variants[0].size);
    }

    let bestMatch = null;
    let highestScore = 0;

    let candidates = [];
    if (imageIndex[catLower]) {
        candidates = imageIndex[catLower];
    } else {
        for (const key in imageIndex) {
            candidates = candidates.concat(imageIndex[key]);
        }
    }

    for (const img of candidates) {
        let score = getSimilarity(product.name, img.name);

        // Exact name match bonus
        if (normalizeStr(product.name) === normalizeStr(img.name)) {
            score += 0.5;
        }

        let isValidQty = true;

        if (productQty && img.qty) {
            if (productQty.value === img.qty.value && productQty.unit === img.qty.unit) {
                score += 0.2; // bonus for exact quantity match
            } else {
                isValidQty = false; // mismatch quantity
            }
        } else if (!productQty && img.qty) {
            isValidQty = false; // image specifies quantity, but product doesn't, likely a specific size image
        }

        if (isValidQty && score > highestScore) {
            highestScore = score;
            bestMatch = img;
        }
    }

    if (bestMatch && highestScore >= 0.3) {
        product.images = [bestMatch.relPath];
        matchedCount++;
    } else {
        unmatched.push(product.name);
    }
}

console.log(`Matched ${matchedCount} out of ${productsData.length} products`);
console.log(`Unmatched: ${unmatched.length}`);

// We stringify the JSON but we need to ensure the format fits
const newProductsStr = 'export const productsData = ' + JSON.stringify(productsData, null, 4) + ';\n';
const newContent = productsContent.replace(/export const productsData = \[[\s\S]*\];?/, newProductsStr);

fs.writeFileSync(productsFilePath, newContent, 'utf8');
console.log("Successfully updated products.js");

if (bestMatch && highestScore >= 0.3) {
    product.images = [bestMatch.relPath];
    matchedCount++;
} else {
    unmatched.push(product.name);
}
}

console.log(`Matched ${matchedCount} out of ${productsData.length} products`);
console.log(`Unmatched: ${unmatched.length}`);

if (unmatched.length > 0) {
    fs.writeFileSync(path.join(repoDir, 'unmatched-products.txt'), unmatched.join('\n'), 'utf8');
    console.log("Unmatched products list saved to unmatched-products.txt");
}

const newProductsStr = 'export const productsData = ' + customStringify(productsData, 0) + ';\n';
const newContent = productsContent.replace(/export const productsData = \[[\s\S]*\];?/, newProductsStr);

fs.writeFileSync(productsFilePath, newContent, 'utf8');
console.log("Successfully updated products.js");
