import { v2 as cloudinary } from 'cloudinary';
import { glob } from 'glob';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// 1. Setup Environment Variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// 2. Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log(`✅ Connected to Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}`);

// 3. Configuration & Constants
const LOCAL_PATH = './local_photography_assets';
const CLOUDINARY_ROOT = 'zibuyile_portfolio/media/photography';
const MAX_FILE_SIZE = 3 * 1024 * 1024; // Target: 3MB

const getFileHash = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex').substring(0, 16);
};

// 4. Main Sync Function
async function syncPhotography() {
  const files = await glob(`${LOCAL_PATH}/**/*.{jpg,jpeg,png,webp}`, { nocase: true });
  console.log(`📡 Checking sync status for ${files.length} photos...`);

  for (const file of files) {
    const filename = path.parse(file).name;
    const category = path.basename(path.dirname(file));
    const hash = getFileHash(file);
    const publicId = `${hash}_${filename}`;
    const fullPublicId = `${CLOUDINARY_ROOT}/${category}/${publicId}`;

    let success = false;
    while (!success) {
      try {
        // Step A: Check existence
        await cloudinary.api.resource(fullPublicId);
        console.log(`⏭️  Skipping: ${filename} (Already in Cloudinary)`);
        success = true;

      } catch (error) {
        const statusCode = error.http_code || (error.error && error.error.http_code);
        
        // Handle Network Drops (DNS or Reset)
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
          console.log(`📡 Network issue (${error.code}). Retrying in 5s for ${filename}...`);
          await new Promise(res => setTimeout(res, 5000));
          continue; // Try the loop again for this specific file
        }

        // Step B: Handle 404 (Upload needed)
        if (statusCode === 404) {
          console.log(`📸 New photo detected: ${filename}. Processing...`);
          
          try {
            // Step C: Optimize with 3MB Target
            let quality = 85;
            let optimizedBuffer = await sharp(file)
              .resize(2500, null, { withoutEnlargement: true })
              .jpeg({ quality, progressive: true, mozjpeg: true })
              .toBuffer();

            while (optimizedBuffer.length > MAX_FILE_SIZE && quality > 50) {
              quality -= 10;
              optimizedBuffer = await sharp(file)
                .resize(2500, null, { withoutEnlargement: true })
                .jpeg({ quality, progressive: true, mozjpeg: true })
                .toBuffer();
              console.log(`⚠️  Compressing harder: ${quality}% for ${filename}`);
            }

            // Step D: Upload Stream
            await new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream({
                folder: `${CLOUDINARY_ROOT}/${category}`,
                public_id: publicId,
                overwrite: false,
                resource_type: 'image'
              }, (err, res) => err ? reject(err) : resolve(res));
              stream.end(optimizedBuffer);
            });

            const finalSize = (optimizedBuffer.length / (1024 * 1024)).toFixed(2);
            console.log(`✅ Successfully Uploaded: ${filename} (${finalSize} MB)`);
            success = true;

          } catch (procErr) {
            console.error(`❌ Processing Failed for ${filename}:`, procErr.message);
            success = true; // Move to next file to avoid infinite loop on bad files
          }
        } else {
          console.error(`❌ API Error for ${filename}:`, error.message || JSON.stringify(error));
          success = true; // Move to next file
        }
      }
    }
  }
  console.log('🏁 Sync Process Complete.');
}

syncPhotography().catch(err => console.error("Fatal Sync Error:", err));