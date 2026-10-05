const fs = require('fs');
const content = fs.readFileSync('d:/suriyamillets/src/data/cosmeticsProducts.js', 'utf8');

const updatedContent = content + `
import img_Hibiscus_Facewash from '../assets/Cosmeticimages/Facewash Webp/Hibiscus  Face wash.webp';

// We'll insert the new product at the end
`;
// Let me write a full script that injects it automatically
