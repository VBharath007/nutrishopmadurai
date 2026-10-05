const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /(\"name\": \"KARUPPUKAVUNI\\(NADU\\)\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1\"/Product-images/Traditional Rice/karupukavuni nadu.webp\"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Karuppukavuni(Nadu) image fixed!');
