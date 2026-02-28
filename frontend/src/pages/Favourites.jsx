import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      if (!isLoggedIn) return;
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/api/favourite");
        if (data.success) {
          const normalizedMovies = data.favourites.map((m) => ({
            ...m,
            id: m.movieId,
            poster_path: m.posterPath,
            vote_average: m.voteAverage,
            release_date: m.releaseDate,
          }));
          setMovies(normalizedMovies);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchFavs();
  }, [isLoggedIn, authLoading]);

  if (authLoading || (isLoggedIn && loading)) return <Loader />;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Heart size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Show some love</h2>
        <p className="text-gray-400 mb-6">Log in to save your all-time favorite movies here.</p>
        <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
          Sign In
        </Link>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Heart size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No favourites yet</h2>
        <p className="text-gray-400 mb-6">Tap the heart icon on any movie to add it here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 mt-15">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-8 bg-red-500 rounded-full"></div>
        <h1 className="text-2xl font-black uppercase tracking-tighter italic text-white">My Favourites</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;