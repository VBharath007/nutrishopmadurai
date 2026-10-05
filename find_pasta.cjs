const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('"name":') && lines[i].toLowerCase().includes('d2e')) {
        console.log(`Line ${i + 1}: ${lines[i].trim()}`);
    }
}
