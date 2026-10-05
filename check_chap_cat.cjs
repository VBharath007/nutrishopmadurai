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
            let category = "NOT FOUND";
            for (let j = i; j < i + 30; j++) {
                if (lines[j].includes('"category":')) {
                    category = lines[j].trim();
                    break;
                }
            }
            console.log(`Product: ${name} -> ${category}`);
        }
    }
}
