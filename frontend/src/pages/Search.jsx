import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/api/movies/search-movies?query=${query}`,
        );
        if (data.success) {
          setResults(data.movies);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
  <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 md:px-12 lg:px-20 pb-24">
    <div className="max-w-[1400px] mx-auto">

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Search Results
          </h1>
        </div>

        {query && (
          <p className="text-gray-400 text-sm ml-2">
            Showing results for{" "}
            <span className="text-white font-medium bg-white/5 px-3 py-1 rounded-md border border-white/10">
              {query}
            </span>
          </p>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">
            No Results Found
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            We couldn’t find anything matching your search.
            Try using different keywords.
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default Search;
