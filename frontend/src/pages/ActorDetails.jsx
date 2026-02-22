import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Loader from '../components/Loader';
import { MapPin, Calendar, Star, Info, Film } from 'lucide-react';

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <p className="text-gray-500 text-[11px] uppercase tracking-wide">
        {label}
      </p>
      <p className="text-white font-medium">{value}</p>
    </div>
  </div>
);

const ActorDetails = () => {
  const { actorId } = useParams();
  const navigate = useNavigate(); 
  const [actor, setActor] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        setLoading(true);
        const [actorRes, moviesRes] = await Promise.all([
          axiosInstance.get(`/api/movies/actor/${actorId}`),
          axiosInstance.get(`/api/movies/actor/${actorId}/movie`)
        ]);
        
        if (actorRes.data.success) setActor(actorRes.data.data);
        if (moviesRes.data.success) setTopMovies(moviesRes.data.movies);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActorDetails();
  }, [actorId]);

  if (loading) return <Loader />;
  if (!actor) return <div className="pt-32 text-center text-white font-bold">Actor not found.</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">

        <div className="relative flex flex-col md:flex-row gap-14 items-start">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full -z-10" />

          <div className="w-full md:w-80 shrink-0">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={`https://image.tmdb.org/t/p/h632${actor.profile_path}`}
                alt={actor.name}
                className="w-full object-cover"
              />
            </div>

            <div className="mt-8 bg-white/[0.04] backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-6">
              <StatItem
                icon={<Calendar size={18} className="text-blue-500" />}
                label="Birthday"
                value={actor.birthday || "N/A"}
              />
              <StatItem
                icon={<MapPin size={18} className="text-red-500" />}
                label="Place of Birth"
                value={actor.place_of_birth || "N/A"}
              />
              <StatItem
                icon={<Star size={18} className="text-yellow-500" />}
                label="Popularity"
                value={actor.popularity?.toFixed(1)}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-10">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight italic uppercase">
                {actor.name}
              </h1>
              <span className="inline-block mt-4 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold tracking-wide">
                {actor.known_for_department}
              </span>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                <Info size={18} className="text-blue-500" />
                Biography
              </h3>
              <div className="relative">
                <p className="text-gray-400 leading-relaxed text-base whitespace-pre-line">
                  {actor.biography || `We don't have a biography for ${actor.name} yet.`}
                </p>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 italic uppercase">
                  <Film size={20} className="text-blue-500" />
                  Known For
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {topMovies.map((movie) => (
                  <div 
                    key={movie.id} 
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 mb-3">
                      <img 
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                         <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                            <Star size={12} fill="currentColor" /> {movie.vote_average?.toFixed(1)}
                         </div>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold truncate text-gray-200 group-hover:text-blue-400 transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {movie.release_date?.split('-')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Gender</p>
                <p className="text-white font-medium">
                  {actor.gender === 2 ? "Male" : actor.gender === 1 ? "Female" : "Not specified"}
                </p>
              </div>

              {actor.imdb_id && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">External</p>
                  <a
                    href={`https://www.imdb.com/name/${actor.imdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition underline underline-offset-4 font-medium"
                  >
                    IMDb Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;