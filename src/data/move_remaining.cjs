const fs = require('fs');

const cosmeticsPath = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
const productsPath = 'd:/suriyamillets/src/data/products.js';

let cosmeticsContent = fs.readFileSync(cosmeticsPath, 'utf8');
let productsContent = fs.readFileSync(productsPath, 'utf8');

function extractObjects(content, category) {
    let extracted = [];
    let remaining = content;
    
    let arrayStartIndex = remaining.indexOf('export const cosmeticProductsData = [');
    let startIndex = remaining.indexOf('[', arrayStartIndex) + 1;
    let bracketCount = 0;
    let inString = false;
    let escape = false;
    
    let currentObjStart = -1;
    let newArrayContent = remaining.substring(0, startIndex);
    let lastPushedIndex = startIndex;
    
    for (let i = startIndex; i < remaining.length; i++) {
        const char = remaining[i];
        
        if (!inString && char === '{') {
            if (bracketCount === 0) currentObjStart = i;
            bracketCount++;
        } else if (!inString && char === '}') {
            bracketCount--;
            if (bracketCount === 0) {
                let objStr = remaining.substring(currentObjStart, i + 1);
                
                if (objStr.includes(`"category": "${category}"`)) {
                    extracted.push(objStr);
                    let nextCharIdx = i + 1;
                    while (nextCharIdx < remaining.length && /\s/.test(remaining[nextCharIdx])) nextCharIdx++;
                    if (remaining[nextCharIdx] === ',') i = nextCharIdx;
                } else {
                    newArrayContent += remaining.substring(lastPushedIndex, i + 1);
                }
                lastPushedIndex = i + 1;
            }
        } else if (char === '"' || char === "'") {
            if (!escape) {
                if (!inString) inString = char;
                else if (inString === char) inString = false;
            }
        }
        
        escape = char === '\\' ? !escape : false;
    }
    newArrayContent += remaining.substring(lastPushedIndex);
    
    // Fix any leftover commas like }, } or }, ]
    newArrayContent = newArrayContent.replace(/\},\s*\n\s*\}/g, '}\n}');
    newArrayContent = newArrayContent.replace(/\},\s*\n\s*\]/g, '}\n]');
    
    return { extracted, remaining: newArrayContent };
}

let result = extractObjects(cosmeticsContent, 'OTHER HOME NEEDS');
console.log(`Extracted ${result.extracted.length} products for OTHER HOME NEEDS`);

if (result.extracted.length > 0) {
    // We also need to fix the IDs of extracted objects (add 1000)
    let updatedExtracted = result.extracted.map(objStr => {
        return objStr.replace(/"id":\s*(\d+)/g, (match, p1) => {
            let id = parseInt(p1);
            if (id < 1000) return `"id": ${id + 1000}`;
            return match;
        });
    });

    fs.writeFileSync(cosmeticsPath, result.remaining, 'utf8');
    
    let prodArrayEnd = productsContent.lastIndexOf(']');
    if (prodArrayEnd !== -1) {
        let beforeEnd = productsContent.substring(0, prodArrayEnd);
        if (!beforeEnd.trim().endsWith(',')) beforeEnd += ',';
        
        let appendedProducts = beforeEnd + '\n    ' + updatedExtracted.join(',\n    ') + '\n]';
        productsContent = appendedProducts + productsContent.substring(prodArrayEnd + 1);
        
        let importLines = cosmeticsContent.split('\n').filter(line => line.startsWith('import ') && (line.includes('Diswash liquid') || line.includes('laundrywash_herbal')));
        let uniqueImports = [...new Set(importLines)].join('\n');
        
        productsContent = uniqueImports + (uniqueImports ? '\n' : '') + productsContent;
        fs.writeFileSync(productsPath, productsContent, 'utf8');
        
        console.log('Successfully moved products!');
    }
}
