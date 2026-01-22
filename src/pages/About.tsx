import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import VideoModal from '../components/VideoModal';
import { CLIENT_LIST, TESTIMONIALS, SOCIAL_LINKS, SHOWREEL_ID } from '../constants';
// Import your Cloudinary utilities for the milli-second load speed
import { getOptimizedUrl, getPlaceholderUrl } from '../utils/cloudinary';

const About: React.FC = () => {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Define the local path for your showreel cover
  const showreelCoverPath = "/media/others/showreel_cover.jpg";

  return (
    // Reduced pt-20 for mobile so the header doesn't push the showreel off-screen
    <div className="min-h-screen pt-20 md:pt-32 pb-20 animate-fade-in">
      
      {/* Showreel Section: Fixed height for mobile to prevent overflow */}
      <section 
        className={`relative w-full aspect-[21/9] md:aspect-[2.39/1] bg-black flex items-center justify-center overflow-hidden mb-24 group ${
          SHOWREEL_ID ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={() => SHOWREEL_ID && setShowreelOpen(true)}
      >
        {/* Placeholder (Blur) - Visible immediately */}
        <img 
          src={getPlaceholderUrl(showreelCoverPath)} 
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        
        {/* Optimized High-Res - Fades in over the blur */}
        <img 
          src={getOptimizedUrl(showreelCoverPath)} 
          alt="Zibuyile Gumede Showreel" 
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-90' : 'opacity-0'
          }`} 
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-wide drop-shadow-lg mb-6">SHOW REEL</h2>
          
          {SHOWREEL_ID ? (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
              <Play fill="white" className="ml-1 text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
          ) : (
             <div className="mt-2 border-y border-white/50 py-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-white font-medium pl-2">
                  Coming Soon
                </p>
             </div>
          )}
        </div>
      </section>

      {/* Biography Section */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h2 className="font-serif text-3xl mb-6 text-dark">Biography</h2>
            <p className="font-sans text-sm text-gray-500 leading-7 tracking-wide text-justify">
              <strong>Zibuyile Gumede</strong> is a South African Cinematographer and the founder of{' '}
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-dark hover:text-gold transition-colors">
                ABANTU PICTURES
              </a>. Her work is defined by a balance of emotive lighting and technical precision, spanning narrative features, high-end commercials, and music videos.
            </p>
          </div>
          <div className="font-sans text-sm text-gray-500 leading-7 tracking-wide text-justify">
            <p className="mb-4">
              Specializing in both film and digital formats, Zibuyile is an advocate for emerging technologies, including Virtual Production and AI. She believes that cinematography is the bridge between traditional craft and modern meaning.
            </p>
            <p>
              Through ABANTU PICTURES, she offers a collaborative approach that respects the integrity of the story while pushing creative boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Movie Section: One Last Try */}
      <section className="bg-white py-20 mb-24 border-y border-gray-100">
         <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-center font-serif text-3xl mb-12">"ONE LAST TRY"</h3>
            <div className="grid md:grid-cols-12 gap-8 items-start">
               <div className="md:col-span-3">
                  <div className="aspect-[2/3] bg-gray-200 overflow-hidden">
                    <img 
                      src="/media/others/best_movie_2.png" 
                      alt="One Last Try Poster" 
                      loading="lazy" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>
               </div>
               
               <div className="md:col-span-9">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <img src="/media/others/best_movie_1.png" loading="lazy" className="w-full h-48 object-cover" alt="Still 1" />
                     <img src="/media/others/best_movie_4.png" loading="lazy" className="w-full h-48 object-cover" alt="Still 2" />
                  </div>
                  <h4 className="font-bold text-sm tracking-widest mb-2">SYNOPSIS</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Under a Johannesburg bridge, hope is measured in lipstick, mirrors, and one last chance. One Last Try is an intimate drama where two homeless women confront the possibility of change.
                  </p>
               </div>
            </div>
         </div>
      </section>

    {/* Clients Section */}
    <section className="max-w-screen-xl mx-auto px-4 mb-24">
      <div className="text-center mb-12">
        <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400">
          Collaborated with
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CLIENT_LIST.map((client, idx) => {
          // Logic check: only render an <a> tag if a valid link exists
          const isLink = client.link && client.link !== '#';
          const Component = isLink ? 'a' : 'div';
          
          return (
            <Component 
              key={idx} 
              href={isLink ? client.link : undefined}
              target={isLink ? "_blank" : undefined}
              rel={isLink ? "noopener noreferrer" : undefined}
              className={`group flex items-center justify-center h-28 border border-gray-100 p-4 transition-all duration-500 
                ${isLink ? 'hover:border-gold hover:bg-white cursor-pointer' : 'cursor-default'}`}
            >
              <span className="font-serif text-lg text-gray-400 group-hover:text-dark transition-colors text-center">
                {client.name}
              </span>
            </Component>
          );
        })}
      </div>
    </section>
      {/* Testimonials Section */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-8 border border-white/10 relative">
                   <div className="text-gold text-4xl font-serif absolute top-4 left-4 opacity-30">"</div>
                   <p className="text-sm text-gray-400 mt-6 mb-8 leading-relaxed italic">
                     {t.quote}
                   </p>
                   <div>
                      <p className="text-gold text-xs font-bold tracking-widest uppercase">{t.author}</p>
                      <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-tighter">{t.role}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoId={SHOWREEL_ID}
      />
    </div>
  );
};

export default About;