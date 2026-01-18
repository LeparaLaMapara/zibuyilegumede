import React from 'react';
import MasonryGrid from '../components/MasonryGrid';
import VideoThumbnail from '../components/VideoThumbnail';
import { FILMS , SOCIAL_LINKS} from '../constants';

const Films: React.FC = () => {
  // Helper to get high-res YouTube thumbnail
  const getThumbnail = (film: typeof FILMS[0]) => {
    if (film.youtubeId) {
      return `https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg`;
    }
    return film.image;
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="text-center mb-16 px-4">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-4">Selected Works</h1>
        <p className="font-sans text-sm text-gray-500 tracking-widest uppercase">Narrative & Commercial Cinematography</p>
      </div>

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

      <div className="flex justify-center mt-16">
       <a 
          href={SOCIAL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-transparent border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase"
        >
          View More Projects
        </a>
      </div>
    </div>
  );
};

export default Films;