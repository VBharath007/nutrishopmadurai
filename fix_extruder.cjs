const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'RAGI CHOCO STARS': '/Product-images/Snacks/m60 ragi choco stars.webp',
  'RAGI CENTER FILLS': '/Product-images/Snacks/m60 ragi center fills.webp',
  'CHOCO COATED MONKE': '/Product-images/Snacks/mm choco coated monke.webp',
  'ALMOND HEARTS': '/Product-images/Snacks/mm almond hearts.webp',
  'PEANUT BALLS': '/Product-images/Snacks/mm peanut balls.webp',
  'MULTIGRAIN SMALL RINGS': '/Product-images/Snacks/m60 multigrain  small rings.webp',
  'QUINOA PUFFS': '/Product-images/Snacks/m60 quinoa puffs.webp'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Millet Extruder Snacks images fixed!');
