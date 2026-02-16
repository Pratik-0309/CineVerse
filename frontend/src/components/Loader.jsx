import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-6 bg-[#000000]">
      
      {/* Cinematic Spinner */}
      <div className="relative w-16 h-16 animate-spin">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-blue-600/20 rounded-full"></div>
        
        {/* Glowing Top Arc */}
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.4)]"></div>
        
        {/* Inner Film Reel Details */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600/30 rounded-full flex items-center justify-center">
             <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className="text-yellow-500/80 text-xs font-medium tracking-[0.3em] uppercase animate-pulse">
          Loading CineVerse
        </p>
        {/* Subtle glow effect beneath the text */}
        <div className="w-12 h-1px bg-linear-to-r from-transparent via-yellow-500/40 to-transparent mx-auto mt-2"></div>
      </div>
    </div>
  );
};

export default Loader;