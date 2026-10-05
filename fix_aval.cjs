const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'MA.SAMBHA AVAL': '/Product-images/Aval/sambhaa aval.webp',
  'KARUPUKAVUNI AVAL': '/Product-images/Aval/karuppu karwari aval.webp',
  'SIVAPPU AVAL': '/Product-images/Aval/sivapu arisi aval.webp',
  'SIVAPPU KAVUNI AVAL': '/Product-images/Aval/sivapu arisi aval.webp',
  'POONGAR AVAL': '/Product-images/Aval/poongar aval.webp',
  'THOOYAMALLI AVAL': '/Product-images/Aval/thooyamalli aval.webp',
  'KATTUYANUM AVAL': '/Product-images/Aval/kaatuyanam aval.webp',
  'RICE AVUL': '/Product-images/Aval/vellai aval.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Aval images fixed!');
