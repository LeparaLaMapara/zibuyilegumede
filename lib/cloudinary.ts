import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryImage {
  id: number; // We'll derive a number or use string
  publicId: string;
  title: string;
  image: string;
  width: number;
  height: number;
  category: string;
}

/**
 * Fetches images from a specific folder (category) using Cloudinary Search API.
 * This allows for dynamic discovery without hardcoding paths.
 */
export async function getCategoryImages(category: string = 'All'): Promise<CloudinaryImage[]> {
  try {
    // Construct the search expression
    // Base folder matches the one used in your GitHub Action
    const baseFolder = 'thabang_portfolio/images';
    
    let expression = `folder:${baseFolder}/*`;
    
    if (category !== 'All') {
      // Assuming folder structure is thabang_portfolio/images/{Category}
      expression = `folder:${baseFolder}/${category}/*`;
    }

    const results = await cloudinary.search
      .expression(expression)
      .sort_by('public_id', 'desc')
      .max_results(100) // Adjust based on pagination needs
      .with_field('context')
      .execute();

    // Map Cloudinary resources to your Project interface
    return results.resources.map((resource: any, index: number) => {
      // Derive category from folder path if currently viewing 'All'
      // Path format: thabang_portfolio/images/Nature/img123
      const folders = resource.folder.split('/');
      const imgCategory = folders[folders.length - 1]; 
      
      return {
        id: index, // or hash resource.asset_id
        publicId: resource.public_id,
        title: resource.public_id.split('/').pop() || 'Untitled',
        image: resource.secure_url,
        width: resource.width,
        height: resource.height,
        category: imgCategory === 'images' ? 'Uncategorized' : imgCategory,
      };
    });
  } catch (error) {
    console.error('Cloudinary Search Error:', error);
    return [];
  }
}