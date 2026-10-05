const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'RAGI COOKIES': '/Product-images/Snacks/mm ragi cookies.webp',
  'MULTI  MILLET COOKIES': '/Product-images/Snacks/mm multi millet cookies.webp',
  'VARAGU COOKIES': '/Product-images/Millet Cookies/VARAGU COOKIES.webp',
  'THINAI COOKIES': '/Product-images/Millet Cookies/THINAI COOKIES.webp',
  'KUDIRAIVOLLY COOKIES': '/Product-images/Millet Cookies/KUDIRAIVOLLY COOKIES.webp',
  'SAMAI COOKIES': '/Product-images/Millet Cookies/SAMAI COOKIES.webp',
  'KAMBU COOKIES': '/Product-images/Millet Cookies/KAMBU COOKIES.webp'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Millet Cookies images fixed!');
