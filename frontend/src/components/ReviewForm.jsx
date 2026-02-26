import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const { isLoggedIn } = useAuth();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to post a review");
      return;
    }

    if (!rating || !review.trim()) {
      toast.error("Please provide rating and comment");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(
        `/api/review/add/${movieId}`,
        {
          rating,
          comment: review,
        }
      );

      if (data.success) {
        toast.success(data.message);

        setRating(0);
        setReview("");

        if (onReviewAdded) onReviewAdded();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to post review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-linear-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

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
                      ? "text-yellow-400 fill-yellow-400"
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
            maxLength={300}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all min-h-[130px] resize-none"
          />

          <div className="absolute bottom-3 right-4 text-[11px] text-gray-500">
            {review.length}/300
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-50 flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
        >
          {loading ? "Posting..." : "Post Review"} <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;