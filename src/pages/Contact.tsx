import React from 'react';
import { CLIENT_LIST, ON_SET_IMAGES, SOCIAL_LINKS} from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Contact Info Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-dark">Contact.</h2>

          
          <div className="space-y-3 font-sans text-sm md:text-base tracking-wide text-dark">
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="block hover:text-gold transition-colors">
              {SOCIAL_LINKS.email}
            </a>
            <p className="block">{SOCIAL_LINKS.phone}</p>
          </div>
          
          <div className="flex justify-center space-x-8 mt-8">
                <a href={SOCIAL_LINKS.instagram} className="text-gray-400 hover:text-gold transition"><span className="sr-only">Instagram</span><i className="fab fa-instagram text-lg"></i></a>
                <a href={SOCIAL_LINKS.linkedin} className="text-gray-400 hover:text-gold transition"><span className="sr-only">LinkedIn</span><i className="fab fa-linkedin-in text-lg"></i></a>
                <a href={SOCIAL_LINKS.youtube} className="text-gray-400 hover:text-gold transition"><span className="sr-only">YouTube</span><i className="fab fa-youtube text-lg"></i></a>
                {/* <a href="#" className="text-gray-400 hover:text-gold transition"><span className="sr-only">Vimeo</span><i className="fab fa-vimeo-v text-lg"></i></a> */}
                <a href={SOCIAL_LINKS.imdb} className="text-gray-400 hover:text-gold transition"><span className="sr-only">IMDb</span><i className="fab fa-imdb text-lg"></i></a>
                <a href={SOCIAL_LINKS.email} className="text-gray-400 hover:text-gold transition"><span className="sr-only">Gmail</span><i className="fas fa-envelope text-lg"></i></a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-gold mx-auto mb-16"></div>

          {/* Previous Clients Grid */}
      <div className="max-w-4xl mx-auto px-4 mb-24 text-center border-t border-gray-100 pt-16">
        <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-gray-400 mb-8 font-semibold">
          Previous Clients Include:
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 font-serif text-lg text-gray-600 leading-relaxed">
          {CLIENT_LIST.map((client, index) => (
            <React.Fragment key={index}>
              <span className="hover:text-gold transition-colors cursor-default">{client.name}</span>
              {index < CLIENT_LIST.length - 1 && <span className="text-gray-300 mx-2">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

        {/* Kit Section */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
           <h3 className="text-xs font-bold tracking-[0.2em] mb-4 uppercase text-gray-400">Kit:</h3>
           <p className="text-sm text-gray-600 leading-relaxed">
             I have a select amount of personal equipment for smaller projects. This includes a Sony Apha And Canon 700D camera package.
           </p>
        </div>

        {/* Magazine Feature - Full Width Card */}
        <div className="mb-24 relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-900 group overflow-hidden">
           <img 
             src="media/others/mentions_1.png" 
             alt="Crew on hill" 
             loading="lazy"
             className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
           />
           <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
              <div className="text-white/80 text-[10px] md:text-xs font-bold tracking-widest uppercase border-l-2 border-gold pl-3">
                 Shooting Summary <br/> Cinematographers We Love Working With
              </div>
              
              <div className="max-w-2xl">
                 <h2 className="text-white font-serif text-4xl md:text-7xl italic mb-4">Sunshine Co.</h2>
                 <p className="text-white/90 text-xs md:text-sm font-light leading-relaxed max-w-lg border-l border-white/30 pl-4">
                    We loved meeting everyone and learning together at The Plug. This week we’re showing off some of our workshop attendees starting with Zibuyile Gumede. The Plug Issue 011  
                 </p>
              </div>
           </div>
        </div>

        {/* On Set Gallery */}
        <div className="mb-12">
           <h3 className="text-center text-3xl font-serif mb-12">On Set.</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ON_SET_IMAGES.map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 overflow-hidden relative group">
                   <img 
                      src={img} 
                      alt={`On Set ${idx + 1}`} 
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   />
                </div>
              ))}
           </div>
           <p className="text-center text-[10px] text-gray-400 mt-6 tracking-wide uppercase">
              Some on set images from various projects I've worked on.
           </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;