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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">SmartMobility</span>
            {/* <span className="hidden md:inline-flex text-xs px-2 py-0.5 bg-gray-100 rounded-lg text-gray-600">
              v2.0
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, path }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                  location.pathname === path ? "text-blue-600" : "text-gray-700"
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
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                    location.pathname === path ? "text-blue-600" : "text-gray-700"
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
                    className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center"
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
