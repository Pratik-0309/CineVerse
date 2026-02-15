import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react"; 
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = false; 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
      isActive
        ? "text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-50 px-4">
      <nav className="flex items-center justify-between w-full max-w-6xl bg-[#1e1d1d] backdrop-blur-md border border-gray-600 px-6 py-2.5 rounded-2xl">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} width={150} alt="Logo" />
        </Link>

        {/* Center: Nav Items */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkStyles}>Home</NavLink>
          <NavLink to="/favourites" className={navLinkStyles}>Favourites</NavLink>
          <NavLink to="/watchlist" className={navLinkStyles}>Watchlist</NavLink>
        </div>

        {/* Right: Auth Logic */}
        <div className="flex items-center gap-5">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/register")}
              className="bg-[#5d51ff] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 shadow-[0_0_20px_rgba(93,81,255,0.3)]"
            >
              Get Started
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon Button */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all overflow-hidden"
              >
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-[#1e1d1d] border border-gray-600 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User size={16} /> Profile
                  </button>
                  <hr className="my-1 border-gray-700" />
                  <button
                    onClick={() => { /* Handle Logout */ setShowDropdown(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;