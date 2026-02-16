import React from 'react';
import {  useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div onClick={() => navigate(`/movie/${movie.id}`)}
    className="group cursor-pointer w-full">
      <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden mb-3 shadow-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <img 
          src={posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/10 text-[10px] text-white">
          <span className="text-blue-500">★</span>
          <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-0.5">
        <h3 className="text-white text-[14px] font-bold leading-tight truncate transition-colors group-hover:text-blue-400">
          {movie.title}
        </h3>
        <p className="text-gray-500 text-[11px] font-medium tracking-wide">
          {movie.release_date}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;