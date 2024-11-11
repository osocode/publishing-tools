// imageOptimizer.js - Optimizes images for different platforms
import sharp from 'sharp';
import path from 'path';

const SIZES = {
  web: { width: 1200, quality: 80 },
  social: { width: 1080, quality: 85 },
  thumbnail: { width: 400, quality: 70 }
};

export async function optimizeImage(imagePath) {
  const filename = path.basename(imagePath);
  const directory = path.dirname(imagePath);
  
  for (const [platform, settings] of Object.entries(SIZES)) {
    const outputDir = directory.replace('/original/', `/${platform}/`);
    const outputPath = path.join(outputDir, filename);
    
    await sharp(imagePath)
      .resize(settings.width)
      .webp({ quality: settings.quality })
      .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));
  }
}
