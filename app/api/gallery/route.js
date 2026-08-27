import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const galleryPath = path.join(process.cwd(), 'public', 'gallery.json');
const backupPath = path.join(process.cwd(), 'public', 'gallery.backup.json');

export async function GET() {
  try {
    if (!fs.existsSync(backupPath) && fs.existsSync(galleryPath)) {
      fs.copyFileSync(galleryPath, backupPath);
    }
    const data = fs.readFileSync(galleryPath, 'utf8');
    const images = JSON.parse(data);
    return NextResponse.json({
      images,
      total: images.length,
      hasBackup: fs.existsSync(backupPath),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, images } = body;

    // Ensure backup exists before any modifying action
    if (!fs.existsSync(backupPath) && fs.existsSync(galleryPath)) {
      fs.copyFileSync(galleryPath, backupPath);
    }

    if (action === 'restore') {
      if (!fs.existsSync(backupPath)) {
        return NextResponse.json({ error: 'No backup found' }, { status: 404 });
      }
      fs.copyFileSync(backupPath, galleryPath);
      const restoredData = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));
      return NextResponse.json({
        success: true,
        message: 'Restored successfully from original backup',
        images: restoredData,
        total: restoredData.length,
      });
    }

    if (action === 'save' && Array.isArray(images)) {
      fs.writeFileSync(galleryPath, JSON.stringify(images, null, 4), 'utf8');
      return NextResponse.json({
        success: true,
        message: `Saved ${images.length} images to gallery.json`,
        total: images.length,
      });
    }

    return NextResponse.json({ error: 'Invalid action or payload' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
