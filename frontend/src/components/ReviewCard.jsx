import React, { useState } from 'react';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { author, author_details, content, created_at } = review;

  const date = new Date(created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const avatarUrl = author_details.avatar_path 
    ? `https://image.tmdb.org/t/p/original/${author_details.avatar_path}`
    : null;

  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-white/10">
            {avatarUrl ? (
              <img src={avatarUrl} alt={author} className="w-full h-full object-cover" />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
          
          <div>
            <h4 className="font-bold text-sm text-white">{author}</h4>
          </div>
        </div>

        {author_details.rating && (
          <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-lg border border-yellow-400/20">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-black">{author_details.rating/2}</span>
          </div>
        )}
      </div>

      <div className="relative">
        <p className={`text-gray-200 text-sm leading-relaxed ${!isExpanded && 'line-clamp-4'}`}>
          {content}
        </p>
        
        {content.length > 300 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 text-xs font-bold mt-2 hover:underline focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Read Full Review'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;