import fs from 'fs';
import path from 'path';

const PHOTO_EXTS = ['jpg', 'jpeg', 'png', 'webp'];

export function findPhoto(slug: string): string | undefined {
  for (const ext of PHOTO_EXTS) {
    const abs = path.join(process.cwd(), 'public', 'imgs', 'businesses', `${slug}.${ext}`);
    if (fs.existsSync(abs)) return `/imgs/businesses/${slug}.${ext}`;
  }
}
