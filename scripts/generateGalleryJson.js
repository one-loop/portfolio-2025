// Node.js script to generate gallery.json with image filenames and EXIF dates
// run node scripts/renameGalleryFiles.js to rename files
const fs = require('fs');
const path = require('path');
const exifr = require('exifr');

const GALLERY_DIR = path.join(__dirname, '../public/gallery');
const OUTPUT_FILE = path.join(__dirname, '../public/gallery.json');

function getSeasonLabel(date) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS months are 0-based
  const day = date.getDate();
  // Jan 20 - May 20: Fall
  if ((month === 1 && day >= 20) || (month > 1 && month < 5) || (month === 5 && day <= 20)) {
    return `Fall ${year}`;
  }
  // May 21 - Aug 20: Summer
  if ((month === 5 && day > 20) || (month > 5 && month < 8) || (month === 8 && day <= 20)) {
    return `Summer ${year}`;
  }
  // Aug 21 - Dec 20: Spring
  if ((month === 8 && day > 20) || (month > 8 && month < 12) || (month === 12 && day <= 20)) {
    return `Spring ${year}`;
  }
  // Dec 21 - Jan 19: Winter (note: Dec 21+ is Winter of current year, Jan 1-19 is Winter of previous year)
  if ((month === 12 && day > 20)) {
    return `Winter ${year}`;
  }
  if ((month === 1 && day < 20)) {
    return `Winter ${year - 1}`;
  }
  return null;
}

async function getImagesWithDates() {
  const files = fs.readdirSync(GALLERY_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
  const images = [];

  for (const file of files) {
    const filePath = path.join(GALLERY_DIR, file);
    try {
      const exif = await exifr.parse(filePath, ['DateTimeOriginal', 'CreateDate', 'ModifyDate']);
      const date = exif?.DateTimeOriginal || exif?.CreateDate || exif?.ModifyDate || null;
      const dateObj = date ? new Date(date) : null;
      images.push({
        filename: file,
        date: dateObj ? dateObj.toISOString() : null,
        location: 'Dubai, UAE 🇦🇪',
        season: getSeasonLabel(dateObj)
      });
    } catch (e) {
      images.push({
        filename: file,
        date: null,
        location: 'Dubai, UAE 🇦🇪',
        season: null
      });
    }
  }

  // Sort by date (oldest first), null dates last
  images.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(images, null, 2)
  );
  console.log(`Wrote ${images.length} images to gallery.json`);
}

getImagesWithDates(); 