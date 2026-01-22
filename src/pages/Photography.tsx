import React, { useState, useMemo, useEffect } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import VideoThumbnail from '../components/VideoThumbnail';
import { Link, useSearchParams } from 'react-router-dom';
import { getOptimizedUrl, getPlaceholderUrl } from '../utils/cloudinary';

// Inside your .map() function:
<VideoThumbnail 
  key={photo.id}
  image={getOptimizedUrl(photo.image)} 
  placeholder={getPlaceholderUrl(photo.image)}
  category={photo.category}
/>

// Define the shape of our Cloudinary photo data
interface CloudinaryPhoto {
  id: number;
  title: string;
  category: string;
  image: string;
  externalLink?: string;
}

const Photography: React.FC = () => {
  const [photos, setPhotos] = useState<CloudinaryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch photos from the Vercel Serverless Function
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (!response.ok) throw new Error('Failed to fetch gallery');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Gallery Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  // Extract unique categories from the fetched photos
  const categories = useMemo(() => {
    if (photos.length === 0) return ['All'];
    const allCategories = photos.map(photo => photo.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [photos]);

  // Filter photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return photos;
    return photos.filter(photo => photo.category === activeCategory);
  }, [activeCategory, photos]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="text-center mb-10 px-4 animate-slide-up">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-4">Stills</h1>
        <p className="font-sans text-sm text-gray-500 tracking-widest uppercase">Photography & Behind The Scenes</p>
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 px-4 animate-slide-up delay-200">
        {categories.map((category) => (
          <Link
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative pb-1 font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeCategory === category 
                ? 'text-dark' 
                : 'text-gray-400 hover:text-gold'
            }`}
          >
            {category}
            {/* Animated underline for active state */}

            <span 
              className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold transform transition-transform duration-300 origin-center  ${
                activeCategory === category ? 'scale-x-100' : 'scale-x-0'
              }`}
            ></span>
          </Link>
        ))}
      </div>

      {/* Loading State or Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
           <div className="w-8 h-8 border-t-2 border-gold border-solid rounded-full animate-spin mb-4"></div>
           <p className="font-sans text-xs tracking-widest text-gray-400 uppercase">Fetching Assets...</p>
        </div>
      ) : (
        <MasonryGrid>
          {filteredPhotos.map((photo) => (
            <VideoThumbnail 
              key={photo.id}
              image={getOptimizedUrl(photo.image)}
              category={photo.category}
              isPhoto={true}
              externalLink={photo.externalLink}
            />
          ))}
        </MasonryGrid>
      )}
    </div>
  );
};

export default Photography;