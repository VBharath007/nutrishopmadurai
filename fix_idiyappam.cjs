const fs = require('fs');
const path = './src/data/products.js';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /"name": "THANIYA IDIYAPPA MAAVU",[\s\S]*?"\/Product-images\/Idiyaapa Maavu\/KODHUMAI IDIYAPPA MAAVU\.webp"/g,
  (match) => match.replace('KODHUMAI IDIYAPPA MAAVU.webp', 'THANIYA IDIYAPA MAAVU.webp')
);

content = content.replace(
  /"name": "MAPILLAI SAMBHA IDIYAPPA MAAVU",[\s\S]*?"\/Product-images\/Idiyaapa Maavu\/KARUDAN SAMBA IDIYAPPA MAAVU\.webp"/g,
  (match) => match.replace('KARUDAN SAMBA IDIYAPPA MAAVU.webp', 'MAPILLAI SHAMBA IDIYAPA MAAVU.webp')
);

content = content.replace(
  /"name": "THOOYAMALLI IDIYAPPA MAAVU",[\s\S]*?"\/Product-images\/Idiyaapa Maavu\/KODHUMAI IDIYAPPA MAAVU\.webp"/g,
  (match) => match.replace('KODHUMAI IDIYAPPA MAAVU.webp', 'THOOYAMALAI IDIYAPA MAAVU.webp')
);

content = content.replace(
  /"name": "POONGAR IDIYAPPA MAAVU",[\s\S]*?"\/Product-images\/Idiyaapa Maavu\/KODHUMAI IDIYAPPA MAAVU\.webp"/g,
  (match) => match.replace('KODHUMAI IDIYAPPA MAAVU.webp', 'poongar idiyaappa maavu.webp')
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed Idiyappam image paths!');
