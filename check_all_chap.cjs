const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');
const lines = content.split('\n');
const cats = new Set();

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"category":')) {
        const cat = lines[i].split('"category":')[1].trim().replace(/",?$/, '').replace(/^"/, '');
        if (cat.toUpperCase().includes('CHAP')) {
            cats.add(cat);
        }
    }
}
console.log("Categories with CHAP:", Array.from(cats));
