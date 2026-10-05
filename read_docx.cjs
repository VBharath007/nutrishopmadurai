const mammoth = require('mammoth');
const fs = require('fs');

mammoth.extractRawText({path: "public/nutrishop testimonial.docx"})
    .then(function(result){
        const text = result.value; // The raw text
        console.log(text);
    })
    .catch(function(error) {
        console.error(error);
    });
