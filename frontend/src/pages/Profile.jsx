import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import Loader from "../components/Loader.jsx";
import { User, Mail, Camera, Edit2, Save, X, Bookmark, Heart, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, updateUser, loading: authLoading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ userName: "", email: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [collections, setCollections] = useState({ watchlist: [], favourites: [] });
  const [colLoading, setColLoading] = useState(true);


  useEffect(() => {
    if (user) {
      setFormData({ userName: user.userName || "", email: user.email || "" });
      setPreviewUrl(user.profilePic || "");
    }
    fetchCollections();
  }, [user]);

  const fetchCollections = async () => {
    try {
      setColLoading(true);
      const [wRes, fRes] = await Promise.all([
        axiosInstance.get("/api/watchlist"),
        axiosInstance.get("/api/favourite"),
      ]);
      setCollections({
        watchlist: wRes.data.watchlists || [],
        favourites: fRes.data.favourites || [],
      });
    } catch (err) {
      console.error("Failed to fetch collections", err);
    } finally {
      setColLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", formData.userName);
    if (profilePic) data.append("profilePic", profilePic);

    const res = await updateUser(data);
    if (res.success) {
      toast.success("Profile updated!");
      setIsEditing(false);
    } else {
      toast.error("Update failed.");
    }
  };

  if (authLoading) return <Loader />;
  if (!user) return <div className="text-white text-center mt-20">Please log in to view your profile.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white mt-15">
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 mb-10 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600/30 shadow-2xl">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-4xl font-bold">
                  {user.userName?.charAt(0)}
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500 transition-all shadow-lg">
                <Camera size={18} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">My Account</h1>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                {isEditing ? <X size={20} className="text-red-500" /> : <Edit2 size={20} className="text-blue-400" />}
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold ml-2 text-gray-200 tracking-widest">Username</label>
                  <input 
                    type="text"
                    disabled={!isEditing}
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 focus:border-blue-500 outline-none transition-all disabled:opacity-60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold ml-2 text-gray-200 tracking-widest">Email Address</label>
                  <input 
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 opacity-40 cursor-not-allowed"
                  />
                </div>
              </div>
              
              {isEditing && (
                <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold transition-all mt-4">
                  <Save size={18} /> Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bookmark className="text-blue-500" size={20} />
              <h2 className="font-bold uppercase tracking-tight">Watchlist ({collections.watchlist.length})</h2>
            </div>
            <Link to="/watchlist" className="text-xs text-blue-400 hover:underline flex items-center">View All <ChevronRight size={14}/></Link>
          </div>
          <div className="space-y-2">
            {colLoading ? <div className="h-20 flex items-center justify-center"><Loader /></div> : 
              collections.watchlist.slice(0, 5).map(m => (
                <div key={m.movieId} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <span className="text-sm font-medium truncate pr-4">{m.title}</span>
                  <Link to={`/movie/${m.movieId}`} className="text-gray-500 hover:text-white"><ChevronRight size={16}/></Link>
                </div>
              ))
            }
            {collections.watchlist.length === 0 && !colLoading && <p className="text-gray-500 text-sm italic">Nothing saved yet.</p>}
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              <h2 className="font-bold uppercase tracking-tight">Favourites ({collections.favourites.length})</h2>
            </div>
            <Link to="/favourites" className="text-xs text-red-400 hover:underline flex items-center">View All <ChevronRight size={14}/></Link>
          </div>
          <div className="space-y-2">
            {colLoading ? <div className="h-20 flex items-center justify-center"><Loader /></div> : 
              collections.favourites.slice(0, 5).map(m => (
                <div key={m.movieId} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <span className="text-sm font-medium truncate pr-4">{m.title}</span>
                  <Link to={`/movie/${m.movieId}`} className="text-gray-500 hover:text-white"><ChevronRight size={16}/></Link>
                </div>
              ))
            }
            {collections.favourites.length === 0 && !colLoading && <p className="text-gray-500 text-sm italic">No favourites found.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;