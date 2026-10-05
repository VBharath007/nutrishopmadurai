const fs = require('fs');

const path = 'd:/suriyamillets/src/data/products.js';
let content = fs.readFileSync(path, 'utf8');

// Replace Dishwash Liquid image
content = content.replace(/img_dishwash\s*$/gm, '"/Product-images/Floor Cleaner Webp/dishwash.webp"');
content = content.replace(/img_dishwash,/g, '"/Product-images/Floor Cleaner Webp/dishwash.webp",');

// Replace Floor Cleaner image
content = content.replace(/img_floorcleaner\s*$/gm, '"/Product-images/Floor Cleaner Webp/floorcleaner_herbal.webp"');
content = content.replace(/img_floorcleaner,/g, '"/Product-images/Floor Cleaner Webp/floorcleaner_herbal.webp",');

// Replace Laundry Wash image
content = content.replace(/img_laundry\s*$/gm, '"/Product-images/Floor Cleaner Webp/laundrywash_herbal.webp"');
content = content.replace(/img_laundry,/g, '"/Product-images/Floor Cleaner Webp/laundrywash_herbal.webp",');

// Replace Incense Sticks
content = content.replace(/img_274\s*$/gm, '"/Product-images/Incense Sticks/dhoop.webp"');
content = content.replace(/img_274,/g, '"/Product-images/Incense Sticks/dhoop.webp",');

content = content.replace(/img_275\s*$/gm, '"/Product-images/Incense Sticks/jasmine.webp"');
content = content.replace(/img_275,/g, '"/Product-images/Incense Sticks/jasmine.webp",');

content = content.replace(/img_276\s*$/gm, '"/Product-images/Incense Sticks/Lavender.webp"');
content = content.replace(/img_276,/g, '"/Product-images/Incense Sticks/Lavender.webp",');

content = content.replace(/img_277\s*$/gm, '"/Product-images/Incense Sticks/lemongrass.webp"');
content = content.replace(/img_277,/g, '"/Product-images/Incense Sticks/lemongrass.webp",');

content = content.replace(/img_278\s*$/gm, '"/Product-images/Incense Sticks/mosquito Repellant.webp"');
content = content.replace(/img_278,/g, '"/Product-images/Incense Sticks/mosquito Repellant.webp",');

content = content.replace(/img_279\s*$/gm, '"/Product-images/Incense Sticks/sandal.webp"');
content = content.replace(/img_279,/g, '"/Product-images/Incense Sticks/sandal.webp",');

content = content.replace(/img_davana\s*$/gm, '"/Product-images/Incense Sticks/davana incense stick.webp"');
content = content.replace(/img_davana,/g, '"/Product-images/Incense Sticks/davana incense stick.webp",');

content = content.replace(/img_vettiver\s*$/gm, '"/Product-images/Incense Sticks/vettiver incense stick.webp"');
content = content.replace(/img_vettiver,/g, '"/Product-images/Incense Sticks/vettiver incense stick.webp",');

content = content.replace(/img_mattipal\s*$/gm, '"/Product-images/Incense Sticks/sandal.webp"');
content = content.replace(/img_mattipal,/g, '"/Product-images/Incense Sticks/sandal.webp",');

// Now remove the imports from the top of the file
const lines = content.split('\n');
const newLines = lines.filter(line => {
    if (line.startsWith('import ')) {
        if (line.includes('Incense Sticks')) return false;
        if (line.includes('other home needs')) return false;
        if (line.includes('Floor Cleaner Webp')) return false;
    }
    return true;
});

fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Successfully updated paths in products.js');
