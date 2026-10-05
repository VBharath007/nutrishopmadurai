const fs = require('fs');

const cosmeticsPath = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
const productsPath = 'd:/suriyamillets/src/data/products.js';

let cosmeticsContent = fs.readFileSync(cosmeticsPath, 'utf8');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// We know from previous grep that INCENSE STICKS imports are:
// import img_274 from '../assets/Cosmeticimages/Incense Sticks/dhoop.webp';
// etc.
// And floor cleaner:
// import img_231 from '../assets/Cosmeticimages/other home needs/floorcleaner_herbal.webp';
// import img_floorcleaner from '../assets/Cosmeticimages/other home needs/floorcleaner_herbal.webp';

// Let's use a simpler approach: 
// 1. We will use a script to find all objects that have category INCENSE STICKS or name Herbal Floor Cleaner
// 2. Remove them from cosmeticsProductsData
// 3. Add them to productsData

function extractObjects(content, conditions) {
    let extracted = [];
    let remaining = content;
    
    // Simple state machine to find objects in an array
    let arrayStartIndex = remaining.indexOf('export const cosmeticProductsData = [');
    if (arrayStartIndex === -1) arrayStartIndex = remaining.indexOf('export const productsData = [');
    
    let startIndex = remaining.indexOf('[', arrayStartIndex) + 1;
    let bracketCount = 0;
    let inString = false;
    let escape = false;
    
    let currentObjStart = -1;
    
    let newArrayContent = "";
    newArrayContent += remaining.substring(0, startIndex);
    
    let lastPushedIndex = startIndex;
    
    for (let i = startIndex; i < remaining.length; i++) {
        const char = remaining[i];
        
        if (!inString && char === '{') {
            if (bracketCount === 0) {
                currentObjStart = i;
            }
            bracketCount++;
        } else if (!inString && char === '}') {
            bracketCount--;
            if (bracketCount === 0) {
                // We have a full object from currentObjStart to i+1
                let objStr = remaining.substring(currentObjStart, i + 1);
                
                // check conditions
                let match = conditions.some(cond => objStr.includes(cond));
                if (match) {
                    extracted.push(objStr);
                    // don't add to newArrayContent
                    // also skip trailing comma if present
                    let nextCharIdx = i + 1;
                    while (nextCharIdx < remaining.length && /\s/.test(remaining[nextCharIdx])) {
                        nextCharIdx++;
                    }
                    if (remaining[nextCharIdx] === ',') {
                        i = nextCharIdx; // skip the comma
                    }
                } else {
                    newArrayContent += remaining.substring(lastPushedIndex, i + 1);
                }
                lastPushedIndex = i + 1;
            }
        } else if (char === '"' || char === "'") {
            if (!escape) {
                if (!inString) {
                    inString = char;
                } else if (inString === char) {
                    inString = false;
                }
            }
        }
        
        if (char === '\\') {
            escape = !escape;
        } else {
            escape = false;
        }
    }
    newArrayContent += remaining.substring(lastPushedIndex);
    
    return { extracted, remaining: newArrayContent };
}

let result = extractObjects(cosmeticsContent, ['"category": "INCENSE STICKS"', '"name": "Herbal Floor Cleaner"']);
console.log(`Extracted ${result.extracted.length} products`);

if (result.extracted.length > 0) {
    // Write back to cosmetics
    fs.writeFileSync(cosmeticsPath, result.remaining, 'utf8');
    
    // Now append these to productsData
    let prodArrayEnd = productsContent.lastIndexOf(']');
    if (prodArrayEnd !== -1) {
        // Need to add comma to the last element if it doesn't have one
        let beforeEnd = productsContent.substring(0, prodArrayEnd);
        if (!beforeEnd.trim().endsWith(',')) {
            beforeEnd += ',';
        }
        
        let appendedProducts = beforeEnd + '\n    ' + result.extracted.join(',\n    ') + '\n]';
        productsContent = appendedProducts + productsContent.substring(prodArrayEnd + 1);
        
        // We also need to extract imports from cosmeticsContent and move them to productsContent
        // We can just copy all imports that match 'Incense Sticks' or 'floorcleaner'
        let importLines = cosmeticsContent.split('\n').filter(line => line.startsWith('import ') && (line.includes('Incense Sticks') || line.includes('floorcleaner_herbal')));
        
        let uniqueImports = [...new Set(importLines)].join('\n');
        
        productsContent = uniqueImports + '\n' + productsContent;
        
        fs.writeFileSync(productsPath, productsContent, 'utf8');
        console.log('Successfully moved products and imports!');
    }
} else {
    console.log('No products found to move.');
}

