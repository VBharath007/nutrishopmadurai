const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'CHOLA DOSAI MAAVU': '/Product-images/Dosai Mix/choladosaimaavu.webp',
  'THANIA DOSAI MAAVU': '/Product-images/Dosai Mix/thaniadosamaavu.webp',
  'RAGI DOSAI MAAVU': '/Product-images/Dosai Mix/ragidosamaavu.webp',
  'KAMBU DOSAI MAAVU': '/Product-images/Dosai Mix/kambudosamaavu.webp',
  'ADAI DOSAI MAAVU': '/Product-images/Dosai Mix/adaidosamaavu.webp'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Images fixed for DOSA MAAVU items!');
