import React from 'react';
import { SOCIAL_LINKS} from '../constants';


const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-xs tracking-widest font-sans mb-4">
          © ZIBUYILE GUMEDE {new Date().getFullYear()}. ALL RIGHTS RESERVED.
        </p>
        <div className="flex justify-center space-x-8 text-gray-400">
               <a href={SOCIAL_LINKS.instagram} className="text-gray-400 hover:text-gold transition"><span className="sr-only">Instagram</span><i className="fab fa-instagram text-lg"></i></a>
                <a href={SOCIAL_LINKS.linkedin} className="text-gray-400 hover:text-gold transition"><span className="sr-only">LinkedIn</span><i className="fab fa-linkedin-in text-lg"></i></a>
                <a href={SOCIAL_LINKS.youtube} className="text-gray-400 hover:text-gold transition"><span className="sr-only">YouTube</span><i className="fab fa-youtube text-lg"></i></a>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gray-400 hover:text-gold transition"><span className="sr-only">Gmail</span><i className="fas fa-envelope text-lg"></i></a>
                <a href={SOCIAL_LINKS.imdb} className="text-gray-400 hover:text-gold transition" target="_blank" rel="noopener noreferrer"><span className="sr-only">IMDb</span><i className="fab fa-imdb text-lg"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;