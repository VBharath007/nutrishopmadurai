const fs = require('fs');
const xlsx = require('xlsx');

// 1. Read existing products.js
const productsFileStr = fs.readFileSync('src/data/products.js', 'utf-8');

const exportIndex = productsFileStr.indexOf('export const productsData =');
if (exportIndex === -1) {
    console.error("Could not find 'export const productsData ='");
    process.exit(1);
}

const importsStr = productsFileStr.substring(0, exportIndex).trim();
const arrayStr = productsFileStr.substring(exportIndex + 'export const productsData ='.length).trim().replace(/;$/, '');

// Find all imports to mock them
const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from/g;
let match;
let mocks = '';
while ((match = importRegex.exec(importsStr)) !== null) {
    mocks += `const ${match[1]} = "IMPORT_REF:${match[1]}";\n`;
}

let oldProducts = [];
try {
    oldProducts = eval(mocks + '\n(' + arrayStr + ')');
} catch (e) {
    console.error("Error parsing old products array:", e);
    process.exit(1);
}

console.log(`Loaded ${oldProducts.length} existing products.`);

function findOldProduct(name) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return oldProducts.find(p => p.slug === slug || p.name.toLowerCase() === name.toLowerCase());
}

// 2. Read Excel file
const wb = xlsx.readFile('public/NUTRISHOPWEBSITE  Filter Product.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

let currentCategory = "UNCATEGORIZED";
const newProductsMap = new Map();

// Map to fix spelling mistakes in the Excel file so variants group correctly
const nameCorrection = {
    "KADALENNAI": "KADALAENNAI",
    "IDIYAIPPAM MAAVU": "IDIYAIPPAM MAVU",
    "MALLI PODI": "MALLI POWDER",
    "SAMBAR PODI": "SAMBAR POWDER",
    "KULAMBU MASALA PODI": "KULAMBU MASALA POWDER",
    "FACE PACK POWDER": "FACE PACK POWDERS"
};

for (const row of rows) {
    let itemName = row["ITEM NAME"] ? String(row["ITEM NAME"]).trim() : "";
    if (!itemName) continue;

    // Apply correction to group variants of the same product
    if (nameCorrection[itemName]) {
        itemName = nameCorrection[itemName];
    }

    // Check if it's a category row
    if (!row["PACKING"] && row["MRP"] === undefined) {
        currentCategory = itemName;
        continue;
    }

    // Skip ignored categories
    if (currentCategory.includes("(NOT NEEDED)") || currentCategory.includes("(NOT NECESSARY")) {
        continue;
    }

    const packing = row["PACKING"] ? String(row["PACKING"]).trim() : "Standard";
    const mrp = parseFloat(row["MRP"]) || 0;

    const slug = itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (!newProductsMap.has(slug)) {
        newProductsMap.set(slug, {
            name: itemName,
            slug: slug,
            category: currentCategory,
            variants: [],
        });
    }

    const product = newProductsMap.get(slug);
    
    // Avoid duplicate variants
    if (!product.variants.some(v => v.size === packing)) {
        product.variants.push({
            size: packing,
            price: mrp
        });
    }
}

// 3. Merge data
const newProductsData = [];
let idCounter = 1000;

for (const [slug, product] of newProductsMap.entries()) {
    const oldProduct = findOldProduct(product.name);
    
    // Price logic: lowest variant price, no discount
    const lowestPrice = product.variants.length > 0 
        ? Math.min(...product.variants.map(v => v.price)) 
        : 0;
        
    const finalProduct = {
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: lowestPrice,
        oldPrice: null, // User requested no discount, so oldPrice is null
        discount: null, // No discount
        rating: oldProduct ? oldProduct.rating : 4.5,
        reviews: oldProduct ? oldProduct.reviews : 100,
        tag: oldProduct ? oldProduct.tag : null,
        metaTitle: oldProduct ? oldProduct.metaTitle : `${product.name} | Suriya Millets`,
        metaDescription: oldProduct ? oldProduct.metaDescription : `Buy high quality ${product.name} from Suriya Millets. 100% natural, healthy, and organic.`,
        images: oldProduct ? oldProduct.images : ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"],
        highlights: oldProduct ? oldProduct.highlights : ["100% Organic", "Pure & Natural", "Packed with Nutrition"],
        description: oldProduct ? oldProduct.description : `Premium quality ${product.name} from Suriya Millets. Carefully sourced and hygienically packed to retain all natural goodness.`,
        variants: product.variants,
        offers: oldProduct ? oldProduct.offers : [],
        faqs: oldProduct ? oldProduct.faqs : [],
        id: idCounter++
    };

    newProductsData.push(finalProduct);
}

console.log(`Successfully mapped ${newProductsData.length} products from Excel.`);

// 4. Generate new file content
let newArrayStr = JSON.stringify(newProductsData, null, 4);

// Un-mock the imports
// Replace "IMPORT_REF:cosmetic_200" with cosmetic_200
newArrayStr = newArrayStr.replace(/"IMPORT_REF:([a-zA-Z0-9_]+)"/g, '$1');

const newFileContent = `${importsStr}\n\nexport const productsData = ${newArrayStr};\n`;

fs.writeFileSync('src/data/products.js', newFileContent, 'utf-8');
console.log("Successfully updated src/data/products.js");
