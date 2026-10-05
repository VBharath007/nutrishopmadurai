const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

// Find all products in the category "Hand Made Soaps" and append "Hand Made Soap" instead of "Soap"
const regex = /("name":\s*"[^"]+?)\s*Soap"(,\s*"slug"[^}]+?"category":\s*"Hand Made Soaps")/g;
content = content.replace(regex, (match, p1, p2) => {
    return p1 + " Hand Made Soap\"" + p2;
});

// Replace in metaTitle and metaDescription as well? The user asked for "product name", but it's better to be consistent.
const regexMeta = /("metaTitle":\s*"[^"]+?)\s*Soap(\s*\|\s*Nutrishop",\s*"metaDescription":\s*"Buy high quality [^"]+?)\s*Soap(\s*from Nutrishop)/g;
content = content.replace(regexMeta, (match, p1, p2, p3) => {
    return p1 + " Hand Made Soap" + p2 + " Hand Made Soap" + p3;
});

// Let's also do a fallback simple replace for names if the above regex was too strict
// Parse it as an array? No, it's a JS file. Let's do a simple regex that only looks at "name"
const nameRegex = /("category":\s*"Hand Made Soaps"[\s\S]*?"name":\s*"[^"]+?)\s+Soap"/gi;
// Wait, "category" comes AFTER "name" in the objects!
// Let's look at the structure:
// "name": "Aloevera Soap",
// "slug": "aloevera-soap",
// "category": "Hand Made Soaps",

const correctRegex = /("name":\s*"([^"]+?))\s*Soap"(,\s*"slug":\s*"[^"]+",\s*"category":\s*"Hand Made Soaps")/gi;
let updatedContent = content.replace(correctRegex, (match, p1, p2, p3) => {
    return p1 + " Hand Made Soap\"" + p3;
});

// Since metaTitle and metaDescription also have "Soap", let's just do a generic replace but ONLY inside the Hand Made Soaps blocks.
// Let's split by `{` and `}` or simply use a function that parses the JS array.

const startIndex = content.indexOf('export const cosmeticProductsData = [');
if (startIndex !== -1) {
    let before = content.slice(0, startIndex);
    let dataStr = content.slice(startIndex);
    
    // We can just replace "Soap" with "Hand Made Soap" for objects that have "category": "Hand Made Soaps"
    let parts = dataStr.split(/(\{\s*"id":\s*\d+,[\s\S]*?\})/);
    for (let i = 1; i < parts.length; i += 2) {
        if (parts[i].includes('"category": "Hand Made Soaps"')) {
            // Replace " Soap" with " Hand Made Soap" inside this object block
            // except if it already says "Hand Made Soap"
            parts[i] = parts[i].replace(/([a-zA-Z&]+)\s+Soap\b/g, (match, p1) => {
                if (p1.toLowerCase().includes('hand made')) {
                    return match; // already has hand made
                }
                return p1 + " Hand Made Soap";
            });
        }
    }
    
    fs.writeFileSync(file, before + parts.join(''), 'utf8');
    console.log('Update complete.');
} else {
    console.log('Could not find data array');
}
