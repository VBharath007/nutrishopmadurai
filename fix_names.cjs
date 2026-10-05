const fs = require('fs');
const file = 'd:/suriyamillets/src/data/products.js';
let data = fs.readFileSync(file, 'utf8');

const replacements = [
  ['Bodylotion Avacadojojoba', 'Avocado & Jojoba Body Lotion'],
  ['Bodylotion Lavender', 'Lavender Body Lotion'],
  ['Bodylotion Morningbreeze', 'Morning Breeze Body Lotion'],
  ['Bodywash Honeymilk', 'Honey & Milk Body Wash'],
  ['Bodywash Lavender', 'Lavender Body Wash'],
  ['Bodywash Neemaloevera', 'Neem & Aloevera Body Wash'],
  ['Enriching Cream Avocado', 'Avocado Enriching Cream'],
  ['Facecream Almondsaffron', 'Almond & Saffron Face Cream'],
  ['Facecream Antiageing', 'Anti-Aging Face Cream'],
  ['Facecream Lemonturmeric', 'Lemon & Turmeric Face Cream'],
  ['Facecream Lustre', 'Lustre Face Cream'],
  ['Facecream Neemtulsi', 'Neem & Tulsi Face Cream'],
  ['Facecream Papaya', 'Papaya Face Cream'],
  ['Facecream Sandal', 'Sandal Face Cream'],
  ['Facegel Aloevera', 'Aloevera Face Gel'],
  ['Facegel Cucumber', 'Cucumber Face Gel'],
  ['Facegel Saffron', 'Saffron Face Gel'],
  ['Facegel Teatree', 'Tea Tree Face Gel'],
  ['Facescrub Avocado', 'Avocado Face Scrub'],
  ['Facescrub Charcoal', 'Charcoal Face Scrub'],
  ['Facescrub Coffee', 'Coffee Face Scrub'],
  ['Facescrub Orange', 'Orange Face Scrub'],
  ['Facescrub Walnut', 'Walnut Face Scrub'],
  ['Serum Faceregen', 'Faceregen Serum'],
  ['Facetoner Rosewater', 'Rosewater Face Toner'],
  ['Facetoner Saffron', 'Saffron Face Toner'],
  ['Facetoner Teatree', 'Tea Tree Face Toner'],
  ['Facewash Avacado', 'Avocado Face Wash'],
  ['Facewash Neempapaya', 'Neem & Papaya Face Wash'],
  ['Facewash Orange', 'Orange Face Wash'],
  ['Facewash Teatree', 'Tea Tree Face Wash'],
  ['Floorcleaner Herbal', 'Herbal Floor Cleaner'],
  ['Footcare Cream', 'Footcare Cream'], // ok
  ['Laundrywash Herbal', 'Herbal Laundry Wash'],
  ['Lipbalm Lavender', 'Lavender Lip Balm'],
  ['Hairoil Herbal', 'Herbal Hair Oil'],
  ['Hariserum Herbal', 'Herbal Hair Serum'],
  ['Jointpainoil', 'Joint Pain Oil'],
  ['Lemongrassoil', 'Lemongrass Oil'],
  ['Oil Almond', 'Almond Oil'],
  ['Oil Avocado', 'Avocado Oil'],
  ['Oil Lavender', 'Lavender Oil'],
  ['Oil Rosemary', 'Rosemary Oil'],
  ['Perfume Desire', 'Desire Perfume'],
  ['Perfume Flora', 'Flora Perfume'],
  ['Perfume Jasmine', 'Jasmine Perfume'],
  ['Perfume Passion', 'Passion Perfume'],
  ['Perfume Sandal', 'Sandal Perfume'],
  ['Shampoo Hennapapaya', 'Henna & Papaya Shampoo'],
  ['Shampoo Herbal', 'Herbal Shampoo'],
  ['Shampoo Hibiscus', 'Hibiscus Shampoo'],
  ['Shampoo Oatmeal', 'Oatmeal Shampoo'],
  ['Soap Aloevera', 'Aloevera Soap'],
  ['Soap Avacado', 'Avocado Soap'],
  ['Soap Charcoal', 'Charcoal Soap'],
  ['Soap Cucumber', 'Cucumber Soap'],
  ['Soap Freshcream', 'Fresh Cream Soap'],
  ['Soap Goatmilk', 'Goat Milk Soap'],
  ['Soap Jasmine', 'Jasmine Soap'],
  ['Soap Kasturimanjal', 'Kasturi Manjal Soap'],
  ['Soap Lavender', 'Lavender Soap'],
  ['Soap Lemongrass', 'Lemongrass Soap'],
  ['Soap Multanimitti', 'Multani Mitti Soap'],
  ['Soap Neemtulsi', 'Neem & Tulsi Soap'],
  ['Soap Papaya', 'Papaya Soap'],
  ['Soap Rose', 'Rose Soap'],
  ['Soap Sandal', 'Sandal Soap'],
  ['Soap Sheabutter', 'Shea Butter Soap'],
  ['Soap Teatree', 'Tea Tree Soap'],
  ['Soap Vettiver', 'Vettiver Soap'],
  ['Stick Dhoop', 'Dhoop Stick'],
  ['Stick Jasmine', 'Jasmine Stick'],
  ['Stick Lavender', 'Lavender Stick'],
  ['Stick Lemongrass', 'Lemongrass Stick'],
  ['Stick Mosquito', 'Mosquito Stick'],
  ['Stick Sandal', 'Sandal Stick'],
];

replacements.forEach(([oldName, newName]) => {
  // Replace in name: "..." and metaTitle: "... | Nutri Shop" and description: "..."
  // It's safer to just do a global replace for the string if it's unique enough.
  // We'll replace exact matches in quotes for name and metaTitle
  data = data.replace(new RegExp(`name: "${oldName}"`, 'g'), `name: "${newName}"`);
  data = data.replace(new RegExp(`metaTitle: "${oldName} \\| Nutri Shop"`, 'g'), `metaTitle: "${newName} | Nutri Shop"`);
  data = data.replace(new RegExp(`of our ${oldName}.`, 'g'), `of our ${newName}.`);
});

fs.writeFileSync(file, data, 'utf8');
console.log('Names fixed!');
