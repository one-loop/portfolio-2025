// Node.js script to rename gallery images and update gallery.json accordingly
// run npm run rename-gallery to rename the files
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

  // Get all existing files in the gallery directory
  const existingFiles = fs.readdirSync(GALLERY_DIR).filter(file => 
    fs.statSync(path.join(GALLERY_DIR, file)).isFile()
  );

  // Step 1: Rename all files to temporary names to avoid conflicts
  const tempRenameMap = {};
  const missingFiles = [];

  data.forEach((item, idx) => {
    const ext = getExtension(item.filename);
    const tempFilename = `temp_${idx + 1}${ext}`;
    tempRenameMap[item.filename] = tempFilename;
    
    // Check if the file actually exists
    if (!existingFiles.includes(item.filename)) {
      missingFiles.push(item.filename);
      console.warn(`⚠️  File not found in gallery: ${item.filename}`);
    }
  });

  // Rename files to temporary names
  Object.entries(tempRenameMap).forEach(([oldName, tempName]) => {
    const oldPath = path.join(GALLERY_DIR, oldName);
    const tempPath = path.join(GALLERY_DIR, tempName);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, tempPath);
      console.log(`✅ Renamed ${oldName} -> ${tempName} (temporary)`);
    } else {
      console.warn(`❌ File not found: ${oldName}`);
    }
  });

  // Step 2: Rename from temporary names to final names
  const finalRenameMap = {};
  data.forEach((item, idx) => {
    const ext = getExtension(item.filename);
    const tempFilename = `temp_${idx + 1}${ext}`;
    const finalFilename = `${idx + 1}${ext}`;
    finalRenameMap[tempFilename] = finalFilename;
    item.filename = finalFilename; // update in JSON
  });

  // Rename files from temporary to final names
  Object.entries(finalRenameMap).forEach(([tempName, finalName]) => {
    const tempPath = path.join(GALLERY_DIR, tempName);
    const finalPath = path.join(GALLERY_DIR, finalName);
    if (fs.existsSync(tempPath)) {
      fs.renameSync(tempPath, finalPath);
      console.log(`✅ Renamed ${tempName} -> ${finalName}`);
    } else {
      console.warn(`❌ Temporary file not found: ${tempName}`);
    }
  });

  // Write the updated JSON back
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
  console.log('📝 gallery.json updated with new filenames.');
  
  // Summary
  if (missingFiles.length > 0) {
    console.log(`\n⚠️  Warning: ${missingFiles.length} files referenced in JSON but not found in gallery folder:`);
    missingFiles.forEach(file => console.log(`   - ${file}`));
    console.log('\n💡 Tip: Make sure all files referenced in gallery.json exist in the gallery folder.');
  }
  
  console.log(`\n✅ Renaming complete! ${data.length} images processed.`);
}

main(); 