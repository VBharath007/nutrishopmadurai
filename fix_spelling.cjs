const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'products.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace exact cases
content = content.replace(/CHAPPATHI/g, 'CHAPATHI');
content = content.replace(/Chappathi/g, 'Chapathi');
content = content.replace(/chappathi/g, 'chapathi');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated spelling of Chapathi everywhere in products.js");
