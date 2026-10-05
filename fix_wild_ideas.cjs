const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'WILD IDEAS KAJAL': '/Product-images/Wild Ideas/wild ideas kajal.png',
  'LIPBALM LAVENDAR': '/Product-images/Wild Ideas/lipbalm Lavender.png'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Images fixed for Wild Ideas Kajal and Lipbalm Lavender!');
