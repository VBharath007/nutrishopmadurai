const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replaceRules = [
  { search: /Suriya Millets/g, replace: 'Nutrishop' },
  { search: /SuriyaMillets/g, replace: 'Nutrishop' },
  { search: /suriyamillets/g, replace: 'nutrishop' },
  { search: /SURIYA MILLETS/g, replace: 'NUTRISHOP' }
];

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (['.js', '.jsx', '.html', '.json', '.css'].includes(ext)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replaceRules.forEach(rule => {
      content = content.replace(rule.search, rule.replace);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
}

walkDir(path.join(__dirname, 'src'), processFile);
processFile(path.join(__dirname, 'index.html'));
processFile(path.join(__dirname, 'package.json'));

console.log("Done replacing brand names.");
