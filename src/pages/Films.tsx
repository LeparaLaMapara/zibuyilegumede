import React, { useState } from 'react';
import { Play } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import VideoThumbnail from '../components/VideoThumbnail';
import VideoModal from '../components/VideoModal';
import { FILMS, SOCIAL_LINKS, SHOWREEL_ID } from '../constants';
// 1. Import your optimization utilities
import { getOptimizedUrl, getPlaceholderUrl } from '../utils/cloudinary';

export default function Films() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  // 2. Refined Thumbnail Logic
  const getThumbnailData = (film: typeof FILMS[0]) => {
    let rawUrl = '';
    
    if (film.image) {
      rawUrl = film.image;
    } else if (film.youtubeId) {
      // Note: Cloudinary can also fetch/cache YouTube thumbnails if configured,
      // but for now, we apply optimization to your direct image links.
      rawUrl = `https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg`;
    }

    return {
      optimized: getOptimizedUrl(rawUrl),
      placeholder: getPlaceholderUrl(rawUrl)
    };
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      
      <div className="text-center mb-16 px-4 animate-slide-up delay-200">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-4">Selected Works</h1>
        <p className="font-sans text-sm text-gray-500 tracking-widest uppercase">Narrative & Commercial Cinematography</p>
      </div>

      <div className="animate-slide-up delay-300">
        <MasonryGrid>
          {FILMS.map((film) => {
            const { optimized, placeholder } = getThumbnailData(film);
            return (
              <VideoThumbnail 
                key={film.id}
                image={optimized}
                placeholder={placeholder} // 3. Pass the placeholder for the blur-up effect
                title={film.title}
                category={film.category}
                youtubeId={film.youtubeId}
              />
            );
          })}
        </MasonryGrid>
      </div>

      <div className="flex justify-center mt-16 animate-slide-up delay-500">
        <a 
          href={SOCIAL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-transparent border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase"
        >
          View More Projects
        </a>
      </div>

      <VideoModal 
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoId={SHOWREEL_ID}
      />
    </div>
  );
}