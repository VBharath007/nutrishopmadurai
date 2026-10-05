const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/products.js');
let content = fs.readFileSync(filePath, 'utf8');

const newProducts = 
    ,{
        "name": "FOX TAIL COCONUT BUDS",
        "slug": "fox-tail-coconut-buds",
        "category": "MILLET SNACKS",
        "price": 50,
        "oldPrice": null,
        "discount": null,
        "rating": 4.5,
        "reviews": 10,
        "tag": "New",
        "metaTitle": "FOX TAIL COCONUT BUDS | Nutrishop",
        "metaDescription": "Buy high quality FOX TAIL COCONUT BUDS from Nutrishop. 100% natural and healthy.",
        "images": [
            "/Product-images/Millet Snacks/Fox tail coconut  buds.webp"
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality FOX TAIL COCONUT BUDS from Nutrishop. Carefully sourced and hygienically packed.",
        "variants": [
            {
                "size": "100GM",
                "price": 50
            }
        ],
        "offers": [],
        "faqs": [],
        "id": 1410
    },
    {
        "name": "MM SOUR CREAM ONION",
        "slug": "mm-sour-cream-onion",
        "category": "MILLET SNACKS",
        "price": 50,
        "oldPrice": null,
        "discount": null,
        "rating": 4.5,
        "reviews": 10,
        "tag": "New",
        "metaTitle": "MM SOUR CREAM ONION | Nutrishop",
        "metaDescription": "Buy high quality MM SOUR CREAM ONION from Nutrishop. 100% natural and healthy.",
        "images": [
            "/Product-images/Millet Snacks/mm sour cream onion.webp"
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality MM SOUR CREAM ONION from Nutrishop. Carefully sourced and hygienically packed.",
        "variants": [
            {
                "size": "100GM",
                "price": 50
            }
        ],
        "offers": [],
        "faqs": [],
        "id": 1411
    },
    {
        "name": "TANGY TOMATO",
        "slug": "tangy-tomato",
        "category": "MILLET SNACKS",
        "price": 50,
        "oldPrice": null,
        "discount": null,
        "rating": 4.5,
        "reviews": 10,
        "tag": "New",
        "metaTitle": "TANGY TOMATO | Nutrishop",
        "metaDescription": "Buy high quality TANGY TOMATO from Nutrishop. 100% natural and healthy.",
        "images": [
            "/Product-images/Millet Snacks/tangy tomato.webp"
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality TANGY TOMATO from Nutrishop. Carefully sourced and hygienically packed.",
        "variants": [
            {
                "size": "100GM",
                "price": 50
            }
        ],
        "offers": [],
        "faqs": [],
        "id": 1412
    }
;

content = content.replace(/\];\s*$/, newProducts + '\n];\n');
fs.writeFileSync(filePath, content, 'utf8');
console.log("Injected new snacks.");
