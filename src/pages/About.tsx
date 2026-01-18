import React, { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from '../components/VideoModal';
import { CLIENT_LIST, TESTIMONIALS, SOCIAL_LINKS, SHOWREEL_ID } from '../constants';

const About: React.FC = () => {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-20 animate-fade-in">
      
            {/* Showreel Section */}
      <section 
        className={`relative w-full h-[50vh] md:h-[60vh] bg-gray-100 flex items-center justify-center overflow-hidden mb-24 group ${SHOWREEL_ID ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => SHOWREEL_ID && setShowreelOpen(true)}
      >
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" alt="Showreel Cover" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
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

        <section className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div>
             <h2 className="font-serif text-3xl mb-6">Biography</h2>
             <p className="font-sans text-sm text-gray-500 leading-7 tracking-wide text-justify">
               Zibuyile Gumede is a South African Cinematographer, visual storyteller, and the founder of <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-dark hover:text-gold transition-colors">ABANTU PICTURES</a>, a production company dedicated to culturally grounded, people-centered storytelling. Her passion for cinema was sparked at a young age by trips to the local DVD rental store with her father. These formative experiences ignited a deep fascination with the art of storytelling and visual interpretation, which has since evolved into a career defined by both academic discipline and practical innovation.
             </p>
          </div>
          <div className="font-sans text-sm text-gray-500 leading-7 tracking-wide text-justify">
             <p className="mb-4">
               With a keen eye for lighting and composition, Zibuyile strives to create images that are both emotive and technically precise. Her work spans narrative shorts, feature films, high-end commercials, and music videos. An advocate for innovation, she is experienced in both film and digital formats, as well as emerging technologies like Virtual Production. She believes that every project dictates its own visual language and enjoys the challenge of finding the perfect aesthetic for each story.
             </p>
             <p>
               Through <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-700 hover:text-gold transition-colors">ABANTU PICTURES</a>, she operates at the intersection of craft and meaning, offering a collaborative approach that respects story and delivers visuals that connect across borders. When not on set, Zibuyile can be found exploring the outdoors or pushing creative boundaries in the modern era of AI.
             </p>
          </div>
        </div>
      </section>

      {/* Call Me Back Feature */}
      <section className="bg-white py-20 mb-24 border-y border-gray-100">
         <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-center font-serif text-3xl mb-12">"ONE LAST TRY"</h3>
            <div className="grid md:grid-cols-12 gap-8 items-start">
               {/* Poster */}
               <div className="md:col-span-3">
                  <div className="aspect-[2/3] bg-gray-200">
                    <img src="media/others/best_movie_2.png" alt="Poster" loading="lazy" className="w-full h-full object-cover grayscale" />
                  </div>
               </div>
               
               {/* Content */}
               <div className="md:col-span-9">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <img src="media/others/best_movie_1.png" loading="lazy" className="w-full h-48 object-cover" alt="Still 1" />
                     <img src="media/others/best_movie_4.png" loading="lazy" className="w-full h-48 object-cover" alt="Still 2" />
                  </div>
                  <h4 className="font-bold text-sm tracking-widest mb-2">SYNOPSIS</h4>
                  <p className="text-sm text-gray-600 mb-6">
                  Under a Johannesburg bridge, hope is measured in lipstick, mirrors, and one last chance.

                  One Last Try is an intimate drama set beneath a bridge in Johannesburg, where two homeless women confront the possibility of change.
                  Zandile, quiet and determined, prepares for a date shZandile steps into the city lights, leaving Gugusharp, and deeply protectivesu pports her with humour, concern, and the little she has to give. As they talk, hope and doubt intertwine, revealing the fragile courage it takes to believe in something more.
                  With a cracked mirror and a final touch of lipstick, Zandile steps into the city lights, leaving Gugu behind holding onto the same uncertain hope that tonight might be different.                  </p>
                  <div className="flex flex-wrap gap-4">
                     {/* <span className="px-3 py-1 border border-gray-300 text-[10px] tracking-widest uppercase">Official Selection Sundance</span>
                     <span className="px-3 py-1 border border-gray-300 text-[10px] tracking-widest uppercase">Best Cinematography LFF</span> */}
                  </div>
               </div>
            </div>
         </div>
      </section>

         {/* Clients Section */}
      <section className="max-w-screen-xl mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400">I've worked on projects for</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLIENT_LIST.map((client, idx) => (
             client.link ? (
               <a 
                 key={idx} 
                 href={client.link}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group flex items-center justify-center h-32 border border-gray-100 hover:border-gold hover:bg-white transition-all duration-500 p-4 relative overflow-hidden"
               >
                 <span className="font-serif text-xl text-gray-400 group-hover:text-dark transition-colors text-center relative z-10">
                   {client.name}
                 </span>
               </a>
             ) : (
               <div 
                 key={idx} 
                 className="group flex items-center justify-center h-32 border border-gray-100 p-4 cursor-default"
               >
                 <span className="font-serif text-xl text-gray-300 group-hover:text-gray-400 transition-colors text-center">
                   {client.name}
                 </span>
               </div>
             )
          ))}
        </div>
      </section>


      {/* Testimonials */}
      <section className="bg-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-6 border border-gray-800 relative">
                   <div className="text-gold text-4xl font-serif absolute top-4 left-4">"</div>
                   <p className="text-sm text-gray-300 mt-6 mb-6 leading-relaxed relative z-10">{t.quote}</p>
                   <div>
                      <p className="text-gold text-xs font-bold tracking-widest uppercase">{t.author}</p>
                      <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;