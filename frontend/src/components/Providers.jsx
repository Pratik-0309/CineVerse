import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";

const Providers = ({ movieId }) => {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/movies/${movieId}/providers`,
        );
        if (data.success) setProviders(data.providers);
      } catch (error) {
        console.error("Provider fetch error:", error);
      }
    };
    if (movieId) fetchProviders();
  }, [movieId]);

  const allProviders = [
    ...(providers?.flatrate || []),
    ...(providers?.ads || []),
  ].slice(0, 4);

  if (allProviders.length === 0) {
    return (
      <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 w-full shadow-2xl">
        <span className="text-[15px] font-black uppercase tracking-[0.15em] text-gray-100 block mb-2">
          Available On
        </span>
        <p className="text-[13px] font-bold text-gray-300 italic">
          No streaming info available for this region.
        </p>
      </div>
    );
  }

 
  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 w-full shadow-2xl">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[12px] font-black uppercase tracking-[0.15em] text-gray-400">
          Available On
        </span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      </div>

      <div className="flex items-center gap-4">
        {allProviders.map((item) => (
          <div key={item.provider_id} className="group relative">
            <div className="w-15 h-15 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-blue-500/50 group-hover:scale-110 shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                alt={item.provider_name}
                className="w-full h-full object-cover transition-all"
              />
            </div>
            <div className="text-[11px] mt-3 font-black text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest text-center max-w-[70px] leading-tight">
              {item.provider_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
