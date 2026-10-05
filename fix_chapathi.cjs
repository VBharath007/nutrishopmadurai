const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'MULTI MILLET CHAPPATHI MIX': '/Product-images/Chapathi Mix/MULTI MILLET CHAPATHI.webp',
  'MAPPILLAI SAMBA CHAPPATHI MIX': '/Product-images/Chapathi Mix/MAPPILLI SAMBA CHAPATHI.webp',
  'JOWAR CHAPPATHI MIX': '/Product-images/Chapathi Mix/JOWARA CHAPATHI.webp',
  'KARUPU KAVUNI CHAPPATHI MIX': '/Product-images/Chapathi Mix/KARUPU KAVUNI CHAPATHI.webp'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Images fixed for CHAPATHI MIX items!');
