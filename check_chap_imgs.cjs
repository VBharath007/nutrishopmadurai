const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');
const lines = content.split('\n');

const updates = [
    "BAJJI BONDA MIX",
    "BAMBOO CHAPATHI MIX",
    "JOWAR CHAPPATHI MIX",
    "KARUPU KAVUNI CHAPPATHI MIX",
    "MAPPILLAI SAMBA CHAPPATHI MIX",
    "MULTI MILLET CHAPPATHI MIX",
    "VARAGU VENPONGAL MIX"
];

for (const name of updates) {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`"name": "${name}"`)) {
            console.log(`\nProduct: ${name}`);
            for (let j = i; j < i + 15; j++) {
                if (lines[j].includes('"images":')) {
                    console.log(lines[j].trim());
                    console.log(lines[j+1].trim());
                    console.log(lines[j+2].trim());
                    break;
                }
            }
        }
    }
}
