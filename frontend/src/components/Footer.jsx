import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {useAuth} from "../context/AuthContext.jsx";

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} width={170} alt="CineVerse Logo" />
            </Link>
            <p className="text-gray-400 text-md max-w-xs">
              Your ultimate destination for discovering and tracking your
              favorite cinema.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold text-sm">Platform</h4>
              <Link
                to="/"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                to="/favourites"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Favourites
              </Link>
              <Link
                to="/watchlist"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Watchlist
              </Link>
            </div>
            {!isLoggedIn && (
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-semibold text-sm">Account</h4>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 CineVerse. Built for movie enthusiasts.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-xs hover:text-gray-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-gray-500 text-xs hover:text-gray-300 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
