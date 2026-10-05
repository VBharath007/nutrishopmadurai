const xlsx = require('xlsx');

// The goal of this script is to read the Excel file and see how many categories/items it has.
const wb = xlsx.readFile('public/NUTRISHOPWEBSITE  Filter Product.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

let currentCategory = "UNCATEGORIZED";
const parsedProducts = [];

for (const row of rows) {
    // If the row has ITEM NAME but no PACKING or MRP, it might be a category header
    if (row["ITEM NAME"] && !row["PACKING"] && !row["MRP"]) {
        currentCategory = row["ITEM NAME"].trim();
    } else if (row["ITEM NAME"]) {
        parsedProducts.push({
            name: row["ITEM NAME"].trim(),
            packing: row["PACKING"],
            mrp: row["MRP"],
            category: currentCategory
        });
    }
}

console.log("Total products parsed from Excel:", parsedProducts.length);
console.log("Categories found:", [...new Set(parsedProducts.map(p => p.category))].join(", "));
console.log("Sample product:", parsedProducts[0]);
