const fs = require('fs');

// We have to extract the data using regex or similar since it's a JS file.
const data = fs.readFileSync('d:/suriyamillets/src/data/products.js', 'utf8');

const getFirstImage = (category) => {
    const rx = new RegExp(`"category": "${category}"[\\s\\S]*?"images":\\s*\\[\\s*([^\\n\\]]+)`, 'i');
    const m = data.match(rx);
    return m ? m[1].trim() : 'not found';
};

console.log('HEALTH SUPPLEMENTS:', getFirstImage('HEALTH SUPPLEMENTS'));
console.log('KANJI MIXES:', getFirstImage('KANJI MIXES'));
console.log('NEEM COMB VARITIES:', getFirstImage('NEEM COMB VARITIES'));
