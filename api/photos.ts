import { v2 as cloudinary } from 'cloudinary';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dzymetqjr",
  api_key: "299338729251248",
  api_secret: "EuxYnoyrOfNLIN_BdwSLpbK463A",
});
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const results = await cloudinary.search
      .expression('folder:zibuyile_portfolio/media/photography/*')
      .sort_by('public_id', 'desc')
      .max_results(500)
      .execute();

    const photos = results.resources.map((resource: any, index: number) => {
      // 1. Get the full folder path from the log you shared
      // Example: "zibuyile_portfolio/media/photography/potraits"
      const folderPath = resource.asset_folder || "";
      
      // 2. Split by slashes
      const folderParts = folderPath.split('/');
      
      // 3. Pop the last item to get the category (e.g., "potraits")
      const category = folderParts.length > 0 ? folderParts.pop() : 'Uncategorized';

      // 4. Clean up the title from the filename
      const title = resource.filename || 'Untitled';

      return {
        id: 1000 + index,
        title: title.replace(/[-_]/g, ' '),
        category: category, 
        image: resource.secure_url,
      };
    });

    // Cache the response to save API credits
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(photos);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}