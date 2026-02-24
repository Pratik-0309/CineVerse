import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentState, setCurrentState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axiosInstance.post("/api/user/register", formData);
      } else {
        response = await axiosInstance.post("/api/user/login", {
          email: formData.email,
          password: formData.password
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
        login(response.data.user); 
        navigate("/"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center px-6 md:px-16 overflow-hidden">
      {/* Background blur stays the same */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-blue-600/15 via-violet-600/15 to-transparent blur-[120px] pointer-events-none"></div>
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 mb-12 md:mb-0 md:pl-10">
          <img src={logo} width={350} alt="CineVerse Logo" className="hover:opacity-80 transition-opacity" />
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          {currentState === "Sign Up" ? "Every Story" : "Welcome"} <br /> 
          <span className="text-[#5d51ff]">
            {currentState === "Sign Up" ? "Starts Here." : "Back to Cinema."}
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
          {currentState === "Sign Up" 
            ? "Join a community of cinema lovers. Create your watchlist and discover hidden gems." 
            : "Log in to access your personalized watchlist and favorite movies."}
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center z-10 md:pr-10"> 
        <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{currentState}</h2>
            <p className="text-gray-400 text-sm">
              {currentState === "Sign Up" ? "Join CineVerse today." : "Please sign in to continue."}
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmitHandler}>
            {currentState === "Sign Up" && (
              <div>
                <label className="block text-gray-300 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <input 
                  required
                  name="userName"
                  type="text" 
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#5d51ff] transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#5d51ff] transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Password</label>
              <input 
                required
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#5d51ff] transition-all"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#5d51ff] hover:bg-[#4f46e5] text-white py-4 rounded-2xl font-bold text-sm mt-4 transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(93,81,255,0.3)] disabled:opacity-50"
            >
              {loading ? "Processing..." : currentState === "Sign Up" ? "Get Started" : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              {currentState === "Sign Up" ? "Already a member? " : "Don't have an account? "}
              <button 
                type="button"
                onClick={() => {
                   setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
                   setFormData({userName: "", email: "", password: ""}); 
                }}
                className="text-white font-semibold hover:text-[#5d51ff] transition-colors"
              >
                {currentState === "Sign Up" ? "Sign in" : "Register"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;