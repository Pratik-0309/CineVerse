import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

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
          <img src={logo} width={150} alt="" />
        </Link>

        {/* Center: Nav Items */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/favourites" className={navLinkStyles}>
            Favourites
          </NavLink>
          <NavLink to="/watchlist" className={navLinkStyles}>
            Watchlist
          </NavLink>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/register")}
            className="bg-[#5d51ff] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 shadow-[0_0_20px_rgba(93,81,255,0.3)]"
          >
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
