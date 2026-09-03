const fs = require('fs');

// Photos.js
let photos = fs.readFileSync('src/pages/Photos.js', 'utf8');
if (!photos.includes('import FadeIn')) {
  photos = photos.replace("import PhotoItem from './PhotoItem';", "import PhotoItem from './PhotoItem';\nimport FadeIn from '../components/FadeIn';");
  // The title wrapper
  photos = photos.replace(/<div className="photos-title-wrapper"[^>]*>/, '<FadeIn y={30} delay={0.1}><div className="photos-title-wrapper">');
  photos = photos.replace(/<\/h1>\s*<\/div>/, '</h1></div></FadeIn>');
}
fs.writeFileSync('src/pages/Photos.js', photos);

// Contact.js
let contact = fs.readFileSync('src/pages/Contact.js', 'utf8');
if (!contact.includes('import FadeIn')) {
  contact = contact.replace("import React from 'react';", "import React from 'react';\nimport FadeIn from '../components/FadeIn';");
  
  contact = contact.replace(/<h1 className="contact-page-title">/, '<FadeIn y={30}><h1 className="contact-page-title">');
  contact = contact.replace(/<\/h1>/, '</h1></FadeIn>');
  
  // Also wrap <div className="contact-content">
  contact = contact.replace(/<div className="contact-content">/, '<FadeIn y={30} delay={0.2}><div className="contact-content">');
  
  // Close the FadeIn right before <FooterMain />
  contact = contact.replace(/<\/div>\s*<FooterMain \/>/, '</div></FadeIn>\n      <FooterMain />');
}
fs.writeFileSync('src/pages/Contact.js', contact);
