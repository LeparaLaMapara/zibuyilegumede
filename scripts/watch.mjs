import { v2 as cloudinary } from 'cloudinary';
import chokidar from 'chokidar';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// 1. Setup Environment Variables (Same path fix as upload.mjs)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// 2. Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const LOCAL_PATH = './local_photography_assets';
const CLOUDINARY_ROOT = 'zibuyile_portfolio/media/photography';

// Helper: Create unique hash
const getFileHash = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex').substring(0, 16);
};

// 3. The Upload Function (The same logic as your sync script)
async function handleUpload(file) {
  const filename = path.parse(file).name;
  const category = path.basename(path.dirname(file));
  const hash = getFileHash(file);
  const publicId = `${hash}_${filename}`;
  const fullPublicId = `${CLOUDINARY_ROOT}/${category}/${publicId}`;

  try {
    // Check if it already exists to avoid duplicate work
    await cloudinary.api.resource(fullPublicId);
    console.log(`⏭️  Skipping: ${filename} (Already exists)`);
  } catch (error) {
    const statusCode = error.http_code || (error.error && error.error.http_code);

    if (statusCode === 404) {
      console.log(`🚀 New File Detected! Processing: ${filename}...`);
      
      try {
        const optimizedBuffer = await sharp(file)
          .resize(2500, null, { withoutEnlargement: true })
          .jpeg({ quality: 85, progressive: true })
          .toBuffer();

        await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream({
            folder: `${CLOUDINARY_ROOT}/${category}`,
            public_id: publicId,
            overwrite: false,
            resource_type: 'image'
          }, (err, res) => {
            if (err) return reject(err);
            resolve(res);
          });
          uploadStream.end(optimizedBuffer);
        });

        console.log(`✅ Auto-Uploaded: ${filename}`);
      } catch (err) {
        console.error(`❌ Sharp Error for ${filename}:`, err.message);
      }
    } else {
      console.error(`❌ Watcher API Error:`, error.message);
    }
  }
}

// 4. Initialize Watcher
console.log(`👀 Watcher Active: Waiting for new photos in ${LOCAL_PATH}...`);

const watcher = chokidar.watch(LOCAL_PATH, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true // Don't upload everything again on start; only watch for CHANGES
});

watcher.on('add', (filePath) => {
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(filePath).toLowerCase())) {
    handleUpload(filePath);
  }
});

// Handle errors
watcher.on('error', error => console.error(`Watcher error: ${error}`));