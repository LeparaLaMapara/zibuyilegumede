import React from 'react';

interface MasonryGridProps {
  children: React.ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
      {/* 'break-inside-avoid' is the secret. 
        We apply it to a wrapper div so the browser doesn't slice your images in half.
      */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {React.Children.map(children, (child) => (
          <div className="break-inside-avoid mb-6 transform transition-all duration-500 hover:scale-[1.01]">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;