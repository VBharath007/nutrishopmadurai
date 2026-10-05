const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'MORINGA RICE PODI': '/Product-images/Rice mix podis/moringa rice podi.webp',
  'CURRY LEAVES RICE MIX': '/Product-images/Rice mix podis/curry leaves rice mix.webp',
  'VALLARAI RICE PODI': '/Product-images/Rice mix podis/vallarai idly & rice podi.webp',
  'PIRANDAI RICE PODI': '/Product-images/Rice mix podis/pirandai rice podi.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Rice mix podi images fixed!');
