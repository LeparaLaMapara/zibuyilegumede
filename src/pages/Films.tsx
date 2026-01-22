import React, { useState } from 'react';
import { Play } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import VideoThumbnail from '../components/VideoThumbnail';
import VideoModal from '../components/VideoModal';
import { FILMS, SOCIAL_LINKS, SHOWREEL_ID } from '../constants';

export default function Films() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  const getThumbnail = (film: typeof FILMS[0]) => {
    if (film.image) return film.image;
    if (film.youtubeId) {
      return `https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg`;
    }
    return '';
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      
      {/* Showreel Section */}
      <section 
        className={`relative w-full h-[60vh] bg-gray-100 flex items-center justify-center overflow-hidden mb-20 group animate-slide-up ${SHOWREEL_ID ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => SHOWREEL_ID && setShowreelOpen(true)}
      >
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
             alt="Showreel Cover" 
             className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
           />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-wide drop-shadow-lg mb-8 animate-slide-up delay-200">SHOW REEL</h1>
          
          {SHOWREEL_ID ? (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 animate-slide-up delay-300">
              <Play fill="white" className="ml-2 text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
          ) : (
             <div className="mt-2 border-y border-white/50 py-3 animate-slide-up delay-300">
                <p className="font-sans text-sm md:text-base tracking-[0.4em] uppercase text-white font-medium pl-2">
                  Coming Soon
                </p>
             </div>
          )}
        </div>
      </section>

      <div className="text-center mb-16 px-4 animate-slide-up delay-200">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-4">Selected Works</h1>
        <p className="font-sans text-sm text-gray-500 tracking-widest uppercase">Narrative & Commercial Cinematography</p>
      </div>

      <div className="animate-slide-up delay-300">
        <MasonryGrid>
          {FILMS.map((film) => (
            <VideoThumbnail 
              key={film.id}
              image={getThumbnail(film)}
              title={film.title}
              category={film.category}
              youtubeId={film.youtubeId}
            />
          ))}
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