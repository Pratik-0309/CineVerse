import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Sign Up");

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center px-6 md:px-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-600px h-600px bg-linear-to-r from-blue-600/15 via-violet-600/15 to-transparent blur-[120px] pointer-events-none"></div>
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 mb-12 md:mb-0 md:pl-10">
        <Link to="/" className="mb-8">
          <img src={logo} width={350} alt="CineVerse Logo" className="hover:opacity-80 transition-opacity" />
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          {currentState === "Sign Up" ? "Every Story" : "Welcome" } <br /> 
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

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-center z-10 md:pr-10"> 
        <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{currentState}</h2>
            <p className="text-gray-400 text-sm">
              {currentState === "Sign Up" ? "Join CineVerse today." : "Please sign in to continue."}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {currentState === "Sign Up" && (
              <div>
                <label className="block text-gray-300 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#5d51ff] transition-all placeholder:text-gray-600"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#5d51ff] transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-[#5d51ff] transition-all placeholder:text-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5d51ff] hover:bg-[#4f46e5] text-white py-4 rounded-2xl font-bold text-sm mt-4 transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(93,81,255,0.3)]"
            >
              {currentState === "Sign Up" ? "Get Started" : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              {currentState === "Sign Up" ? "Already a member? " : "Don't have an account? "}
              <button 
                onClick={() => setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up")}
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