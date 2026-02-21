import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import ReviewCard from './ReviewCard';

const ReviewsList = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/api/movies/${movieId}/reviews`);
        if (data.success) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchReviews();
  }, [movieId]);

  if (loading || reviews.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-red-500 rounded-full"></div>
        <h2 className="text-md md:text-lg font-black uppercase italic tracking-tighter text-white">
          User Reviews  ({reviews.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;