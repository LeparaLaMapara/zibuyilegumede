import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Mail, Film } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS, BRAND } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-white py-4 md:py-6'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center h-12 md:h-auto">
        
        {/* Branding */}
        <div className="flex flex-col z-50 shrink-0">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="font-serif text-lg sm:text-2xl md:text-3xl tracking-tight text-dark font-semibold cursor-pointer hover:text-gold-hover transition-colors whitespace-nowrap"
          >
            {BRAND.name}
          </a>
          <span className="font-sans text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] text-gray-500 uppercase mt-0.5 md:mt-1">
            {BRAND.tagline}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 lg:space-x-10">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `font-sans text-xs lg:text-sm tracking-widest uppercase pb-1 border-b-2 transition-colors duration-300 ${
                isActive ? 'border-gold text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-gold'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4 text-gray-400">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Instagram size={18} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Linkedin size={18} />
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Film size={18} />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-gold transition-colors">
                <Mail size={18} />
            </a>
          </div>
          <a 
            href="/cv.pdf" 
            download
            className="border border-gold text-gold font-sans text-[10px] lg:text-xs tracking-widest uppercase px-4 py-2 hover:bg-gold hover:text-white transition-all duration-300"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-dark focus:outline-none z-50 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white h-screen w-screen z-40 flex flex-col pt-32 items-center transition-transform duration-500 ease-in-out md:hidden ${
      mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center space-y-8 w-full px-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `font-serif text-2xl tracking-wide ${isActive ? 'text-gold' : 'text-dark'}`}
            >
              {item.label}
            </NavLink>
          ))}
          
          <div className="w-16 h-px bg-gray-200 my-6"></div>

          <div className="flex space-x-8">
            <a href={SOCIAL_LINKS.instagram} className="text-gray-400 hover:text-gold"><Instagram size={24} /></a>
            <a href={SOCIAL_LINKS.linkedin} className="text-gray-400 hover:text-gold"><Linkedin size={24} /></a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gray-400 hover:text-gold"><Mail size={24} /></a>
          </div>
          
          <a 
            href="/cv.pdf"
            download
            className="mt-6 border border-gold text-gold font-sans text-xs tracking-widest uppercase px-10 py-3 hover:bg-gold hover:text-white transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;