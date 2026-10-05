const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const targets = [
  "MANIMARK SESAME BURFI", 
  "MANIMARK FINE PEANUT BURFI", 
  "MANIMARK PEANUT BURFI", 
  "MANIMARK GINGER BURFI"
];

for (const name of targets) {
  // Regex to match the variants array of the specific product
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"variants\": \\[\\s*\\{\\s*\"size\": \")PKT(\",\\s*\"price\": )5(\\s*\\})`, 'g');
  content = content.replace(regex, `$1Pack of 10$250$3`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Updated 5 rupee burfis to Pack of 10 for 50 rupees!');
