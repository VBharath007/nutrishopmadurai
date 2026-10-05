const fs = require('fs');

const files = [
    'd:/suriyamillets/src/pages/Cosmetics.jsx',
    'd:/suriyamillets/src/data/cosmeticsProducts.js',
    'd:/suriyamillets/src/data/products.js'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content.replace(/"Hand Made Soap"/g, '"Hand Made Soaps"');
        // also replace without quotes just in case
        newContent = newContent.replace(/Hand Made Soap/g, 'Hand Made Soaps');
        // to avoid pluralizing twice if it was already "Hand Made Soaps"
        newContent = newContent.replace(/Hand Made Soapss/g, 'Hand Made Soaps');
        
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
}
console.log('Update complete.');
