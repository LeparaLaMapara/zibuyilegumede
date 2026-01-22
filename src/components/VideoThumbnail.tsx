import React, { useState } from 'react';
import { Play, X, Instagram, ExternalLink } from 'lucide-react';

interface VideoThumbnailProps {
  image: string;
  placeholder: string; // Added for the blur-up effect
  title: string;
  category: string;
  isPhoto?: boolean;
  youtubeId?: string;
  externalLink?: string;
  onClick?: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
  image, 
  placeholder,
  title, 
  category, 
  isPhoto = false, 
  youtubeId, 
  externalLink, 
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Track when high-res image is ready

  const handleClick = () => {
    if (youtubeId) {
      setIsPlaying(true);
    } else if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  const stopPlaying = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  const LinkIcon = externalLink?.includes('instagram.com') ? Instagram : ExternalLink;

  if (isPlaying && youtubeId) {
    return (
      <div className="w-full mb-6 bg-black relative group animate-in fade-in duration-500 break-inside-avoid">
         <div className="relative w-full aspect-video">
            <iframe 
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={title}
            />
         </div>
         <button 
           onClick={stopPlaying}
           className="absolute -top-3 -right-3 z-10 bg-black text-white p-1 rounded-full border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-black"
           aria-label="Close video"
         >
           <X size={16} />
         </button>
      </div>
    );
  }

  return (
    <div 
      className="group relative w-full overflow-hidden mb-6 cursor-pointer break-inside-avoid animate-slide-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="border border-black bg-black relative overflow-hidden aspect-auto">
        
        {/* 1. BLUR PLACEHOLDER: Visible immediately, fades out when isLoaded is true */}
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 2. HIGH-RES IMAGE: Fades in over the placeholder */}
        <img
          src={image}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-auto object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'opacity-60 scale-105' : ''}`}
        />
        
        {/* Overlay Content (Remains unchanged) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {!isPhoto && (
            <div className="mb-4 transform transition-transform duration-500 group-hover:scale-110">
              <Play fill="white" stroke="white" size={48} className="drop-shadow-lg" />
            </div>
          )}
          
          {isPhoto && externalLink && (
            <div className="mb-4 transform transition-transform duration-500 group-hover:scale-110">
              <LinkIcon className="text-white drop-shadow-lg w-8 h-8 md:w-10 md:h-10" />
            </div>
          )}

          <h3 className="text-white font-serif text-2xl tracking-wide uppercase text-center px-4 drop-shadow-md translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {title}
          </h3>
          <p className="text-gold font-sans text-xs tracking-widest uppercase mt-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;