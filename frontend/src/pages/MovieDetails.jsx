import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader.jsx";
import CastsList from "../components/CastsList.jsx";
import TrailerModal from "../components/TrailerModal.jsx";
import SimilarMovies from "../components/SimilarMovies.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import ReviewsList from "../components/ReviewList.jsx";
import {
  Play,
  Star,
  Heart,
  Bookmark,
  Clock,
  Calendar,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { formatDuration } from "../utils/formatDuration.js";
import MovieNotFound from "./MovieNotFound.jsx";

const MovieDetails = () => {
  const { movieId } = useParams();
  const { isLoggedIn } = useAuth();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavourites, setIsInFavourites] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/movies/${movieId}`);
      if (data.success) setMovie(data.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = useCallback(async () => {
    try {
      setReviewLoading(true);
      const { data } = await axiosInstance.get(`/api/review/movie/${movieId}`);
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Review fetch error:", error);
    } finally {
      setReviewLoading(false);
    }
  }, [movieId]);

  const addToWatchlist = async () => {
    if (!isLoggedIn)
      return toast.error("Please log in to manage your watchlist.");

    try {
      setWatchlistLoading(true);
      const { data } = await axiosInstance.post(
        `/api/watchlist/update/${movieId}`,
        {
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        },
      );

      if (data.success) {
        toast.success(data.message);
        setIsInWatchlist(data.added);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update watchlist",
      );
    } finally {
      setWatchlistLoading(false);
    }
  };

  const addToFavourite = async () => {
    if (!isLoggedIn)
      return toast.error("Please log in to manage your favourites.");

    try {
      setFavouriteLoading(true);
      const { data } = await axiosInstance.post(
        `/api/favourite/update/${movieId}`,
        {
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        },
      );

      if (data.success) {
        toast.success(data.message);
        setIsInFavourites(data.added);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update favourites",
      );
    } finally {
      setFavouriteLoading(false);
    }
  };

  const checkInitialStatus = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const [watchlistRes, favsRes] = await Promise.all([
        axiosInstance.get("/api/watchlist"),
        axiosInstance.get("/api/favourite"),
      ]);

      if (watchlistRes.data.success) {
        setIsInWatchlist(
          watchlistRes.data.watchlists.some((m) => m.movieId === movieId),
        );
      }
      if (favsRes.data.success) {
        setIsInFavourites(
          favsRes.data.favourites.some((m) => m.movieId === movieId),
        );
      }
    } catch (error) {
      console.error("Error checking movie status", error);
    }
  }, [movieId, isLoggedIn]);

  const handleWatchTrailer = () => {
  if (!isLoggedIn) {
    return toast.error("Please log in to watch the trailer");
  }
  setShowTrailer(true);
};

  useEffect(() => {
    fetchMovieDetails();
    fetchReviews();
    checkInitialStatus();
  }, [movieId, fetchReviews, checkInitialStatus]);

  if (loading) return <Loader />;
  if (!movie) return <MovieNotFound />;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full h-[50vh] lg:h-[60vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover opacity-40"
          alt=""
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 -mt-64 relative z-20">
        <div className="flex flex-col md:flex-row gap-10 items-end md:items-start">
          <div className="w-64 md:w-80 shrink-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 space-y-6 pb-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-400">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="" /> {movie.vote_average?.toFixed(1)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {formatDuration(movie.runtime)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleWatchTrailer}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Play size={18} fill="currentColor" /> Watch Trailer
              </button>

              <button
                onClick={addToWatchlist}
                disabled={watchlistLoading}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-all disabled:opacity-50"
                title={
                  isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
                }
              >
                {watchlistLoading ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <Bookmark
                    size={22}
                    className={`transition-colors ${isInWatchlist ? "text-blue-500 fill-blue-500" : "text-white"}`}
                  />
                )}
              </button>

              <button
                onClick={addToFavourite}
                disabled={favouriteLoading}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-all disabled:opacity-50"
                title={
                  isInFavourites
                    ? "Remove from Favourites"
                    : "Add to Favourites"
                }
              >
                {favouriteLoading ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <Heart
                    size={22}
                    className={`transition-colors ${isInFavourites ? "text-red-500 fill-red-500" : "text-white"}`}
                  />
                )}
              </button>
            </div>

            <div className="pt-8 max-w-3xl">
              <h3 className="text-white text-xl font-black uppercase tracking-widest mb-3">
                Storyline
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                {movie.overview}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-tighter"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-1400px mx-auto px-6 md:px-12 lg:px-20 py-20">
        <CastsList movieId={movieId} />
        <SimilarMovies movieId={movieId} />
        <div className="max-w-4xl mt-2">
          {" "}
          <ReviewForm movieId={movieId} onReviewAdded={fetchReviews} />
          <ReviewsList
            reviews={reviews}
            loading={reviewLoading}
            onRefresh={fetchReviews}
          />
        </div>
      </div>

      {showTrailer && (
        <TrailerModal movieId={movieId} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
};

export default MovieDetails;
