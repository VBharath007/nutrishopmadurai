const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'KARUPPU KAVUNI RICE': '/Product-images/Traditional Rice/karuppukavuni rice.webp',
  'KARUPPUKAVUNI\\(NADU\\)': '/Product-images/Traditional Rice/karuppukavuni rice.webp',
  'KATTUYANUM RICE': '/Product-images/Traditional Rice/kattuyanam rice.webp',
  'SEERAGA SAMBHA ARISI': '/Product-images/Traditional Rice/seeraga samba rice.webp',
  'SIVAPPU RICE': '/Product-images/Traditional Rice/sivappu arisi.webp',
  'POONGAR RICE': '/Product-images/Traditional Rice/poongar arisi.webp',
  'MATTAI RICE': '/Product-images/Traditional Rice/mattai arisi.webp',
  'THANGA SAMBA': '/Product-images/Traditional Rice/thanga sambha arisi.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Traditional Rice images fixed!');
