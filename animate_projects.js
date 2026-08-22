const fs = require('fs');

let code = fs.readFileSync('src/pages/Projects.js', 'utf8');

// Add import motion
if (!code.includes('import { motion }')) {
  code = code.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { motion } from 'framer-motion';");
}

// In Projects.js, replace `<div className="grid-item itemX" style={...}>` with `<motion.div ...>`
const regex = /<div className="grid-item (item\d+)" style=\{(.*?)\}>/g;
let match;
const replacements = [];

while ((match = regex.exec(code)) !== null) {
  replacements.push({
    index: match.index,
    length: match[0].length,
    replacement: `<motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: 'easeOut' }} 
      viewport={{ once: true, margin: '-50px' }} 
      className="grid-item ${match[1]}" 
      style={${match[2]}}>`
  });
}

for (let i = replacements.length - 1; i >= 0; i--) {
  const r = replacements[i];
  code = code.slice(0, r.index) + r.replacement + code.slice(r.index + r.length);
}

// Now replace the closing tags.
// Each grid item has <div className="grid-item-overlay"> ... </div>
// and then the grid-item closes with </div>.
// We can use a regex to find `</div>\n            <motion.div` and replace with `</motion.div>\n            <motion.div`
code = code.replace(/<\/div>\s*<motion\.div className="grid-item/g, "</motion.div>\n            <motion.div className=\"grid-item");

// The last item (item11) will end before `</div>\n        </div>\n        <FooterMain />`
code = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<FooterMain \/>/g, "</motion.div>\n          </div>\n        </div>\n        <FooterMain />");


fs.writeFileSync('src/pages/Projects.js', code);
