import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // ✅ import your AuthContext

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext); // ✅ get user from context

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Features", path: "/features" },
    { name: "Analytics", path: "/analytics" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/40 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shadow-md shadow-blue-500/30">
              <Car className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xl font-bold text-white">SmartMobility</span>
            {/* optional version badge */}
            {/* <span className="hidden md:inline-flex text-xs px-2 py-0.5 bg-gray-700 rounded-lg text-gray-300">
              v2.0
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons (only if NOT logged in) */}
          {!user && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-black bg-white/90 rounded-lg hover:bg-white transition-colors shadow-md shadow-white/20"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 bg-gray-900/60 backdrop-blur-xl rounded-b-xl shadow-lg shadow-black/40">
            <div className="flex flex-col gap-4">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}

              {/* Show CTA buttons only if NOT logged in */}
              {!user && (
                <div className="flex gap-3 pt-2">
                  <Link
                    to="/login"
                    className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 px-4 py-1.5 text-sm font-medium text-black bg-white/90 rounded-lg hover:bg-white transition-colors text-center shadow-md shadow-white/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;