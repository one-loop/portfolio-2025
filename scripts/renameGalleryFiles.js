// Node.js script to rename gallery images and update gallery.json accordingly
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '../public/gallery');
const JSON_FILE = path.join(__dirname, '../public/gallery.json');

function getExtension(filename) {
  const ext = path.extname(filename).toLowerCase();
  // Normalize .jpg and .jpeg to .jpeg
  if (ext === '.jpg' || ext === '.jpeg') return '.jpeg';
  if (ext === '.png') return '.png';
  return ext;
}

function main() {
  // Read and parse the JSON file
  const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

  // Map of old filename to new filename
  const renameMap = {};

  data.forEach((item, idx) => {
    const ext = getExtension(item.filename);
    const newFilename = `${idx + 1}${ext}`;
    renameMap[item.filename] = newFilename;
    item.filename = newFilename; // update in JSON
  });

  // Rename files in the gallery directory
  Object.entries(renameMap).forEach(([oldName, newName]) => {
    const oldPath = path.join(GALLERY_DIR, oldName);
    const newPath = path.join(GALLERY_DIR, newName);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${oldName} -> ${newName}`);
    } else {
      console.warn(`File not found: ${oldName}`);
    }
  });

  // Write the updated JSON back
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
  console.log('gallery.json updated with new filenames.');
}

main(); 