import React from 'react';

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  // Using Tailwind's column count for CSS-only masonry effect
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {children}
    </div>
  );
};

export default MasonryGrid;