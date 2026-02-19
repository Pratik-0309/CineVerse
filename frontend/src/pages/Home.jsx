import { useState, useEffect } from "react";
import Loader from "../components/Loader.jsx";
import MovieCard from "../components/MovieCard.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { Flame, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingDaily, setTrendingDaily] = useState([]);
  const [trendingWeekly, setTrendingWeekly] = useState([]);
  const [trendingTimeframe, setTrendingTimeframe] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [nowPlaying, upcoming, topRated, popular, daily, weekly] =
          await Promise.all([
            axiosInstance.get("/api/movies/now-playing"),
            axiosInstance.get("/api/movies/upcoming"),
            axiosInstance.get("/api/movies/top-rated"),
            axiosInstance.get("/api/movies/popular"),
            axiosInstance.get("/api/movies/trending/day"),
            axiosInstance.get("/api/movies/trending/week"),
          ]);

        setNowPlayingMovies(
          nowPlaying.data.success ? nowPlaying.data.movies : [],
        );
        setUpcomingMovies(upcoming.data.success ? upcoming.data.movies : []);
        setTopRatedMovies(topRated.data.success ? topRated.data.movies : []);
        setPopularMovies(popular.data.movies || []);
        setTrendingDaily(daily.data.success ? daily.data.movies : []);
        setTrendingWeekly(weekly.data.success ? weekly.data.movies : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) return <Loader />;

  const MovieRow = ({ title, movies }) => (
    <div className="mb-14">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight border-l-4 border-red-500 pl-3">
          {title}
        </h2>

        <div className="flex items-center gap-1 text-gray-500 hover:text-white cursor-pointer transition-all text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
          Explore All <ChevronRight size={14} />
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar scroll-smooth">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-135px sm:w-135px md:w-[175px] shrink-0"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );

  const activeTrending =
    trendingTimeframe === "week" ? trendingWeekly : trendingDaily;

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 md:px-12 pb-20 pt-28 lg:pt-36">
      <div className="max-w-1700px mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          <MovieRow title="Now Playing" movies={nowPlayingMovies} />
          <MovieRow title="Top Rated" movies={topRatedMovies} />
          <MovieRow title="Popular Right Now" movies={popularMovies} />
          <MovieRow title="Upcoming Premiers" movies={upcomingMovies} />
        </div>

        <aside className="w-full lg:w-[320px] xl:w-380px shrink-0 order-1 lg:order-2">
          <div className="sticky top-32">
            <div className="flex items-center justify-between mb-10 px-2">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight border-l-4 border-red-500 pl-3">
                  Most Interested
                </h2>
                <div className="w-10 h-2px bg-red-600 mt-1 rounded"></div>
              </div>

              <div className="relative">
                <div className="relative">
                  <select
                    className="appearance-none bg-white/5 backdrop-blur-md text-xs text-gray-200 border border-white/10 rounded-xl px-4 py-2 pr-8 font-medium cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all"
                    onChange={(e) =>
                      setTrendingTimeframe(
                        e.target.value === "Today Top" ? "day" : "week",
                      )
                    }
                  >
                    <option className="bg-black font-semibold">Weekly Top</option>
                    <option className="bg-black font-semibold">Today Top</option>
                  </select>

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
              {activeTrending.slice(0, 8).map((movie, index) => (
                <div
                  onClick={()=> navigate(`/movie/${movie.id}`)}
                  key={movie.id}
                  className="flex items-center gap-4 sm:gap-6 group cursor-pointer border-b border-white/5 pb-6 last:border-0 hover:bg-white/5 p-2 rounded-xl transition-all"
                >
                  <div className="text-5xl xl:text-6xl font-black text-[#bcbcbc] group-hover:text-white transition-colors leading-none w-10 xl:w-14">
                    {index + 1}
                  </div>

                  <div className="w-25 h-30 xl:w-16 xl:h-24 rounded-lg overflow-hidden shrink-0 shadow-2xl border border-white/10 group-hover:scale-105 transition-transform">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h3 className="font-bold text-sm xl:text-[15px] text-[#bcbcbc] group-hover:text-white transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {movie.release_date?.split("-")[0]} • Cinema
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Flame
                        size={12}
                        fill="currentColor"
                        className="text-orange-500"
                      />
                      <span className="text-[10px] xl:text-[11px] text-orange-500 font-black uppercase tracking-tighter">
                        {Math.round(movie.popularity)} Hits
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
