import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    
    // Check if the user is hovering over a VideoThumbnail
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.video-hover-zone')) setIsHoveringVideo(true);
      else setIsHoveringVideo(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isHoveringVideo) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[200] mix-blend-difference"
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="bg-white text-black text-[10px] font-sans tracking-[0.2em] uppercase px-4 py-2 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
        Play
      </div>
    </div>
  );
};