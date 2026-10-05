const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cosmeticsProducts.js');
let content = fs.readFileSync(filePath, 'utf-8');

// We want to replace `"rating": 4.8,` with random between 4.2 and 4.9
// and `"reviews": 120,` with random between 45 and 350.

let newContent = content.replace(/"rating":\s*[\d.]+,/g, () => {
    const randomRating = (Math.random() * (4.9 - 4.2) + 4.2).toFixed(1);
    return `"rating": ${randomRating},`;
});

newContent = newContent.replace(/"reviews":\s*\d+,/g, () => {
    const randomReviews = Math.floor(Math.random() * (350 - 45 + 1)) + 45;
    return `"reviews": ${randomReviews},`;
});

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Cosmetic ratings and reviews randomized successfully!');
