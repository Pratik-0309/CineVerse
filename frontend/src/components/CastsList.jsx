import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CastsList = ({ movieId }) => {
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

  const TalentRow = ({ title, data, type }) => (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h2>
        <div className="flex items-center gap-3 text-gray-600">
           <ChevronLeft size={20} className="hover:text-white cursor-pointer transition-colors" />
           <ChevronRight size={20} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="flex overflow-x-auto gap-8 pb-6 no-scrollbar scroll-smooth">
        {data.map((item) => (
          <div key={item.id || item.credit_id} className="min-w-120px md:min-w-140px text-center group">
            <div className={`w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden border-2 border-transparent transition-all duration-500 shadow-xl mb-4 ${type === 'cast' ? 'group-hover:border-pink-500/50' : 'group-hover:border-blue-500/50'}`}>
              <img 
                src={item.profile_path ? `https://image.tmdb.org/t/p/w200${item.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <h3 className="text-white text-sm font-bold truncate px-1">{item.name}</h3>
            <p className="text-gray-500 text-[11px] font-medium truncate px-1 mt-0.5 leading-tight uppercase tracking-tighter">
              {type === 'cast' ? item.character : item.job}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-16 mt-12 mb-20 px-2 md:px-4">
      <TalentRow title="Cast" data={casts} type="cast" />
      <TalentRow title="Crew" data={crews} type="crew" />
    </div>
  );
};

export default CastsList;