import React, { useState, useMemo } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import VideoThumbnail from '../components/VideoThumbnail';
import { PHOTOS } from '../constants';

const Photography: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories from photos dynamically
  const categories = useMemo(() => {
    const allCategories = PHOTOS.map(photo => photo.category);
    // Remove duplicates and add 'All' at the beginning
    return ['All', ...Array.from(new Set(allCategories))];
  }, []);

  // Filter photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return PHOTOS;
    return PHOTOS.filter(photo => photo.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
       <div className="text-center mb-10 px-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-4">Stills</h1>
        <p className="font-sans text-sm text-gray-500 tracking-widest uppercase">Photography & Behind The Scenes</p>
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 px-4">
        {categories.map((category) => (
          <button
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
              className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold transform transition-transform duration-300 origin-center ${
                activeCategory === category ? 'scale-x-100' : 'scale-x-0'
              }`}
            ></span>
          </button>
        ))}
      </div>

      <MasonryGrid>
        {filteredPhotos.map((photo) => (
          <VideoThumbnail 
            key={photo.id}
            image={photo.image}
            // title={photo.title}
            category={photo.category}
            isPhoto={true}
            externalLink={photo.externalLink}
          />
        ))}
      </MasonryGrid>
    </div>
  );
};

export default Photography;