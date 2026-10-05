const fs = require('fs');
let data = fs.readFileSync('d:/suriyamillets/src/data/products.js', 'utf8');

// 1. KANJI MIXES -> BARELY KANJI MIX
data = data.replace(/"https:\/\/images\.unsplash\.com\/photo-1596040033229-a9821ebd058d\?auto=format&fit=crop&w=600&q=80"/g, '"/Product-images/Kanji Mix/barleykanji.webp"');

// 2. NEEM COMB VARITIES -> COCONUT SCRUBER
data = data.replace(/"https:\/\/images\.unsplash\.com\/photo-1542838132-92c53300491e\?auto=format&fit=crop&w=600&q=80"/g, '"/Product-images/Chekku Oils/coconutoil.webp"');

// 3. HEALTH SUPPLEMENTS -> Apple Cider Vinegar (replace `hs_acv` with a direct string)
// We need to replace `hs_acv` inside the Apple Cider Vinegar object
data = data.replace(
    /"name": "Apple Cider Vinegar",[\s\S]*?"images": \[\s*hs_acv\s*\]/g,
    (match) => {
        return match.replace(/hs_acv/, '"/Product-images/Healthsupplements/apple-cider-vinegar ginger garlic and Honey.webp"');
    }
);

fs.writeFileSync('d:/suriyamillets/src/data/products.js', data);
console.log('Images updated!');
