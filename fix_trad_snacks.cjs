const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'KARUPATTI CHOCOLATE': '/Product-images/Traditional Snack Varieties/KARUPATTI CHOCOLATE.webp',
  'MANIMARK PEANUT BURFI': '/Product-images/Snacks/manimark ppeanut burfi.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

// Fix typo B0X -> BOX for KARUPATTI CHOCOLATE
const regexTypo = /(\"name\": \"KARUPATTI CHOCOLATE\"[\s\S]*?\"size\": \")B0X(\")/g;
content = content.replace(regexTypo, `$1BOX$2`);

fs.writeFileSync('src/data/products.js', content);
console.log('Traditional Snacks Varities images and typos fixed!');
