import React, { useState } from "react";
import { Star, User, Edit, Trash2, Check, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const ReviewCard = ({ review, onRefresh }) => {
  const { user } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [hover, setHover] = useState(0);

  const isOwner = user?._id === review.userId?._id;

  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/review/delete/${review._id}`
      );

      if (data.success) {
        toast.success("Review deleted");
        onRefresh();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    if (!editedRating || !editedComment.trim()) {
      toast.error("Rating and comment required");
      return;
    }

    try {
      const { data } = await axiosInstance.put(
        `/api/review/edit/${review._id}`,
        {
          rating: editedRating,
          comment: editedComment,
        }
      );

      if (data.success) {
        toast.success("Review updated");
        setIsEditing(false);
        onRefresh();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-white/10">
            {review.userId?.profilePic ? (
              <img
                src={review.userId.profilePic}
                alt={review.userId.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>

          <div>
            <h4 className="font-bold text-sm text-white">
              {review.userId?.userName}
            </h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-lg border border-yellow-400/20">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-black">
              {review.rating}
            </span>
          </div>
        )}
      </div>

      {!isEditing ? (
        <>
          <p
            className={`text-gray-200 text-sm leading-relaxed ${
              !isExpanded && "line-clamp-4"
            }`}
          >
            {review.comment}
          </p>

          {review.comment?.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 text-xs font-bold mt-2 hover:underline"
            >
              {isExpanded ? "Show Less" : "Read Full Review"}
            </button>
          )}
        </>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setEditedRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={20}
                  className={
                    star <= (hover || editedRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-zinc-600"
                  }
                />
              </button>
            ))}
          </div>

          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpdate}
              className="flex items-center gap-1 text-green-400 hover:text-green-300"
            >
              <Check size={14} /> Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 text-gray-400 hover:text-gray-300"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </>
      )}

      {isOwner && !isEditing && (
        <div className="flex gap-4 mt-4 text-sm">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            <Edit size={14} /> Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-400 hover:text-red-300"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;