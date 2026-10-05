const fs = require('fs');

const data = fs.readFileSync('src/data/products.js', 'utf8');

// Quick and dirty parser for productsData to get names
// We can just regex match the names since it's much safer than eval-ing imports again
const nameRegex = /"name":\s*"(.*?)"/g;
const names = [];
let match;
while ((match = nameRegex.exec(data)) !== null) {
  names.push(match[1].trim());
}

const uniqueNames = [...new Set(names)];
console.log("Total unique names:", uniqueNames.length);

const similar = [];
for (let i = 0; i < uniqueNames.length; i++) {
  for (let j = i + 1; j < uniqueNames.length; j++) {
    const n1 = uniqueNames[i].toUpperCase();
    const n2 = uniqueNames[j].toUpperCase();
    
    if (n1 === n2) continue;
    
    // Check if one is a substring of another (like "APPLE" and "APPLE 500G")
    // or if they are very close in Levenshtein distance
    
    if (Math.abs(n1.length - n2.length) <= 2) {
      let diff = 0;
      for (let k = 0; k < Math.min(n1.length, n2.length); k++) {
        if (n1[k] !== n2[k]) diff++;
      }
      if (diff <= 2) {
        similar.push(n1 + ' | ' + n2);
      }
    }
  }
}

console.log('Similar names found:');
similar.forEach(s => console.log(s));
