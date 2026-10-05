const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /(\"name\": \"NUTS & SEEDS\"[\s\S]*?\"category\": \"MAX PROTIEN BAR\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"`);

// Just in case category comes first:
const regex2 = /(\"category\": \"MAX PROTIEN BAR\"[\s\S]*?\"name\": \"NUTS & SEEDS\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex2, `$1"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"`);


fs.writeFileSync('src/data/products.js', content);
console.log('Removed Nuts & Seeds image!');
