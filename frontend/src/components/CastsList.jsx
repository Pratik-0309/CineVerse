import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import Providers from './Providers.jsx'; 
import { useNavigate } from 'react-router-dom';

const CastsList = ({ movieId }) => {
  const navigate = useNavigate(); 
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/api/movies/${movieId}/credits`);
        if (data.success) {
          setCasts(data.movies.cast.slice(0, 8));
          setCrews(data.movies.crew.slice(0, 6)); 
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) fetchCredits();
  }, [movieId]);

  if (loading) return <div className="text-gray-500 animate-pulse py-10 px-2 font-bold uppercase tracking-widest text-xs">Loading Talent...</div>;

  return (
    <div className="space-y-12 mt-12 mb-20">
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-8">Cast</h2>
        <div className="flex overflow-x-auto gap-8 pb-6 no-scrollbar">
          {casts.map((actor) => (
            <div 
              key={actor.id} 
              onClick={() => navigate(`/actor/${actor.id}`)}
              className="min-w-120px md:min-w-140px text-center group cursor-pointer"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-pink-500/50 transition-all duration-500 shadow-xl mb-4">
                <img 
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${actor.name}`} 
                  alt={actor.name} className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white text-sm font-bold truncate group-hover:text-pink-400 transition-colors">{actor.name}</h3>
              <p className="text-gray-500 text-[11px] font-medium truncate">{actor.character}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-8">Crew</h2>
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="flex-1 flex overflow-x-auto gap-8 pb-6 no-scrollbar">
            {crews.map((member) => (
              <div 
                key={member.credit_id} 
                className="min-w-120px md:min-w-140px text-center group cursor-pointer"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-500 shadow-xl mb-4">
                  <img 
                    src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} 
                    alt={member.name} className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white text-sm font-bold truncate group-hover:text-blue-400 transition-colors">{member.name}</h3>
                <p className="text-gray-500 text-[11px] font-medium truncate uppercase tracking-tighter">{member.job}</p>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[350px] shrink-0">
            <Providers movieId={movieId} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CastsList;