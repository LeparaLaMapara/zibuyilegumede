import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, isOpen, onClose }) => {
  // Prevent scrolling and handle 'Escape' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-500"
      role="dialog"
      aria-modal="true"
    >
      {/* Background overlay (Click outside to close) */}
      <div 
        className="absolute inset-0 cursor-zoom-out" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-gold transition-all duration-300 z-[110] hover:rotate-90"
        aria-label="Close modal"
      >
        <X size={32} strokeWidth={1} />
      </button>

      {/* Video Container with Slide-Up Animation */}
      <div className="w-full max-w-6xl aspect-video bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-[105] animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 ease-out">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;