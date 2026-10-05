const fs = require('fs');

const path = 'd:\\suriyamillets\\src\\data\\cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

// The IDs to delete completely
const idsToDelete = [238, 239, 240, 241, 242, 243, 244, 245, 246, 281];

for (let id of idsToDelete) {
    // A regex to match the entire object from { to }, for a specific ID.
    // It looks for `{ \n "id": ID, ... },`
    let regex = new RegExp(`[ \\t]*\\{[\\s]*"id":[\\s]*${id},[\\s\\S]*?\\},?\\n`, 'g');
    content = content.replace(regex, '');
}

// Ensure the array ends correctly (if we removed the last item and left a trailing comma on the new last item)
content = content.replace(/,[ \t]*\n[ \t]*\];/g, '\n];');

// Now modify ID 236
content = content.replace(/"name": "Sundari Beauty Oil",[\s]*"slug": "beautyoil",[\s]*"category": "THAILAM",/, '"name": "Sundari Beauty Oil",\n        "slug": "beautyoil",\n        "category": "BEAUTY OIL",');

// Modify ID 237
content = content.replace(/"name": "Carrotrootoil",[\s]*"slug": "carrotrootoil",[\s]*"category": "THAILAM",/, '"name": "Carrot Root Oil",\n        "slug": "carrot-root-oil",\n        "category": "BEAUTY OIL",');
content = content.replace(/"metaTitle": "Carrotrootoil/g, '"metaTitle": "Carrot Root Oil');
content = content.replace(/quality Carrotrootoil/g, 'quality Carrot Root Oil');

// Modify ID 280
content = content.replace(/"name": "Kumkumadi Thailam",[\s]*"slug": "kumkumadi-thailam",[\s]*"category": "THAILAM",/, '"name": "Kumkumadi Oil",\n        "slug": "kumkumadi-oil",\n        "category": "BEAUTY OIL",');
content = content.replace(/"metaTitle": "Kumkumadi Thailam/g, '"metaTitle": "Kumkumadi Oil');
content = content.replace(/quality Kumkumadi Thailam/g, 'quality Kumkumadi Oil');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated cosmeticsProducts.js');
