import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewsList = ({ reviews, loading, onRefresh }) => {

  if (loading) {
    return <p className="text-gray-400 mt-6">Loading reviews...</p>;
  }

  if (!reviews.length) {
    return (
      <p className="text-gray-500 mt-6">
        Be the first to review this movie 🎬
      </p>
    );
  }
  
  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-red-500 rounded-full"></div>
        <h2 className="text-md md:text-lg font-black uppercase italic tracking-tighter text-white">
          User Reviews ({reviews.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;