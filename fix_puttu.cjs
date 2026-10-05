const fs = require('fs');
const path = './src/data/products.js';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /"name": "RED ARISI PUTTU MAVU",[\s\S]*?"https:\/\/images\.unsplash\.com\/photo-1574316071802-0d684efa7bf5\?auto=format&fit=crop&w=600&q=80"/g,
  (match) => match.replace('https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80', '/Product-images/Puttu Maavu/redarisiputtumaavu.webp')
);

content = content.replace(
  /"name": "WHEAT  PUTTU MAVU",[\s\S]*?"\/Product-images\/Amma Mavu\/ununthukali mavu\.webp"/g,
  (match) => match.replace('/Product-images/Amma Mavu/ununthukali mavu.webp', '/Product-images/Puttu Maavu/wheatputtumaavu.webp')
);

content = content.replace(
  /"name": "THANIA PUTTU MAVU",[\s\S]*?"\/Product-images\/Amma Mavu\/ununthukali mavu\.webp"/g,
  (match) => match.replace('/Product-images/Amma Mavu/ununthukali mavu.webp', '/Product-images/Puttu Maavu/thaniaputtumaavu.webp')
);

content = content.replace(
  /"name": "ARISI PUTTU MAVU",[\s\S]*?"\/Product-images\/Amma Mavu\/ununthukali mavu\.webp"/g,
  (match) => match.replace('/Product-images/Amma Mavu/ununthukali mavu.webp', '/Product-images/Puttu Maavu/arisiputtumaavu.webp')
);

content = content.replace(
  /"name": "POONGAR RICE PUTTU MIX",[\s\S]*?"\/Product-images\/Podi Varieties\/curry leaves rice mix\.webp"/g,
  (match) => match.replace('/Product-images/Podi Varieties/curry leaves rice mix.webp', '/Product-images/Puttu Maavu/arisiputtumaavu.webp')
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed Puttu mix image paths!');
