const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// I'm using an exact replacement here for the specific image array inside the PERI PERI product block that we moved.
// Or we can just do a regex if we assume PERI PERI's image array needs replacing.
const regex = /(\"name\": \"PERI PERI\"[\s\S]*?\"category\": \"MILLET EXTRUDER SNACKS\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1\"/Product-images/Millet Extruder Snacks/peri peri snacks.png\"`);

// Just in case the order is different (e.g., category before name):
const regex2 = /(\"category\": \"MILLET EXTRUDER SNACKS\"[\s\S]*?\"name\": \"PERI PERI\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex2, `$1\"/Product-images/Millet Extruder Snacks/peri peri snacks.png\"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Peri Peri snacks image fixed!');
