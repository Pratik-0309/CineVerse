import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import MovieCard from './MovieCard';
import { ChevronRight } from "lucide-react";

const SimilarMovies = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/api/movies/${movieId}/similar`);
        if (data.success) {
          setSimilarMovies(data.movies || []);
        }
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchSimilarMovies();
  }, [movieId]);

  if (loading || similarMovies.length === 0) return null;

  return (
    <div className="mb-14 mt-12">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight border-l-4 border-red-500 pl-3 italic uppercase">
          Similar Movies
        </h2>

        <div className="flex items-center gap-1 text-gray-500 hover:text-white cursor-pointer transition-all text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
          Explore All <ChevronRight size={14} />
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar scroll-smooth">
        {similarMovies.map((movie) => (
          <div
            key={movie.id}
            className="w-[135px] sm:w-[135px] md:w-[175px] shrink-0"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;