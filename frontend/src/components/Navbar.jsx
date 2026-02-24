import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, Search as SearchIcon } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const { isLoggedIn, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
  await logout();
  setShowDropdown(false);
  navigate("/");
};

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
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} width={150} alt="Logo" />
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
            <>
              <NavLink to="/favourites" className={navLinkStyles}>
                Favourites
              </NavLink>
              <NavLink to="/watchlist" className={navLinkStyles}>
                Watchlist
              </NavLink>
            </>
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative group"
        >
          <SearchIcon
            className="absolute left-4 text-gray-500 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 py-2 pl-12 pr-4 rounded-full text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
          />
        </form>

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
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all overflow-hidden"
              >
                <img
                  src={
                    user?.profilePic ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.userName}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-[#1e1d1d] border border-gray-600 rounded-xl shadow-2xl py-2 z-50">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User size={16} /> Profile
                  </button>

                  <hr className="my-1 border-gray-700" />

                  <button
                    onClick={handleLogout}
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
