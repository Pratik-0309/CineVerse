import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/movies/${movieId}/videos`);
        if (data.success && data.youtubeUrl) {
          setTrailerUrl(data.youtubeUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (movieId) getTrailer();
  }, [movieId]);

  if (!trailerUrl) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose} 
      />
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[100] bg-black/60 hover:bg-pink-600 text-white p-2 rounded-full transition-all border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="w-full h-full">
          <ReactPlayer
            src={trailerUrl}
            width="100%"
            height="100%"
            playing={true}
            controls={true}
            config={{
              youtube: {
                playerVars: { 
                  autoplay: 1, 
                  modestbranding: 1, 
                  rel: 0,
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;