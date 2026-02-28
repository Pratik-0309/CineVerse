import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";
import { Bookmark, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const WatchList = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!isLoggedIn) return;
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/api/watchlist");
        if (data.success) {
          const normalizedMovies = data.watchlists.map((m) => ({
            ...m,
            id: m.movieId,
            poster_path: m.posterPath,
            vote_average: m.voteAverage,
            release_date: m.releaseDate,
          }));
          setMovies(normalizedMovies);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchWatchlist();
  }, [isLoggedIn, authLoading]);

  if (authLoading || (isLoggedIn && loading)) return <Loader />;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Bookmark size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your Watchlist is private</h2>
        <p className="text-gray-400 mb-6">Log in to see the movies you've saved to watch later.</p>
        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
          Sign In
        </Link>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <LayoutGrid size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your Watchlist is empty</h2>
        <p className="text-gray-400 mb-6">Explore movies and add them to your list!</p>
        <Link to="/" className="text-blue-500 font-bold hover:underline">Browse Movies</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 mt-15">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
        <h1 className="text-2xl font-black uppercase tracking-tighter italic text-white">My Watchlist</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchList;