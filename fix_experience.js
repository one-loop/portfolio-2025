const fs = require('fs');
let code = fs.readFileSync('src/pages/Experience.js', 'utf8');

if (!code.includes("import FadeIn")) {
  code = code.replace("import React from 'react';", "import React from 'react';\nimport FadeIn from '../components/FadeIn';");
}

code = code.replace(/<h1 className="experience-title">/, '<FadeIn y={30}><h1 className="experience-title">');
code = code.replace(/<\/h1>/, '</h1></FadeIn>');

code = code.replace(/<div\s+key=\{index\}\s+className="experience-item"\s+style=\{\{\s*animationDelay:\s*`\$\{index \* 0\.12\}s`\s*\}\}\s*>/g, 
  '<FadeIn key={index} className="experience-item" delay={0.2 + index * 0.12} y={24} duration={0.6}>');

code = code.replace(/<\/div>\s*\}\)\}/g, '</FadeIn>\n        ))}');

fs.writeFileSync('src/pages/Experience.js', code);
