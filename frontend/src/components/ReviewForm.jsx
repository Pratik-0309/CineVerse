import React, { useState } from "react";
import { Star, Send } from "lucide-react";

const ReviewForm = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="relative bg-linear-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-7 bg-red-500 rounded-full"></div>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Write a Review
        </h2>
      </div>

      <div className="space-y-6">

        <div className="flex items-center">
          <span className="text-xs font-medium text-gray-400 tracking-wide">
            Your Rating
          </span>

          <div className="flex gap-2 ml-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={22}
                  className={`transition-all duration-200 ${
                    star <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                      : "text-zinc-700"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all min-h-[130px] resize-none"
          />

          <div className="absolute bottom-3 right-4 text-[11px] text-gray-500">
            {review.length}/300
          </div>
        </div>

        <button
          className="w-50 flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
        >
          Post Review <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;