const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'KAMBU MAAVU': '/Product-images/Maavu/kambumaavu.webp',
  'RAGI MAAVU': '/Product-images/Maavu/ragimaavu.webp',
  'KOLUKATTAI FLOUR': '/Product-images/Maavu/kolukattai maavu.webp',
  'RAVA DOSAI FLOUR': '/Product-images/Maavu/rava dosai maavu.webp',
  'SAMBHA WHEAT RAVA': '/Product-images/Maavu/sambha wheat rava.webp',
  'ORGANIC RAVA': '/Product-images/Maavu/organic rava.webp',
  'ORGANIC MAIDA': '/Product-images/Maavu/organic maida.webp',
  'SPROUTED RAGI FLOUR': '/Product-images/Maavu/sprouted ragi flour.webp',
  'SPROUTED THINAI  FLOUR': '/Product-images/Maavu/sprouted thinai flour.webp',
  'SPROUTED KAMBHU FLOUR': '/Product-images/Maavu/sprouted kambu flour.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

// Fix variants for HOME MADE WHEAT FLOUR
const homeMadeRegex = /(\"name\": \"HOME MADE WHEAT FLOUR\"[\s\S]*?\"variants\": \[\s*\{\s*\"size\": \"1KG\",\s*\"price\": 120\s*\})/;
content = content.replace(homeMadeRegex, `$1,\n            {\n                "size": "500GM",\n                "price": 60\n            }`);

// Fix variants for ORGANIC MAIDA
const maidaRegex = /(\"name\": \"ORGANIC MAIDA\"[\s\S]*?\"variants\": \[\s*\{\s*\"size\": \"500GM\",\s*\"price\": 120\s*\})/;
content = content.replace(maidaRegex, `$1,\n            {\n                "size": "1KG",\n                "price": 130\n            }`);

fs.writeFileSync('src/data/products.js', content);
console.log('MAAVU VARITIES fixed!');
