// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const AuthLinks = ({ isMobile = false }) => (
    user ? (
      <>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block transition ${
              isMobile
                ? "py-2"
                : "hover:text-blue-600 hover:bg-white/70 px-3 py-1 rounded-md"
            } ${isActive ? "font-semibold text-blue-600" : ""}`
          }
          onClick={() => isMobile && setIsOpen(false)}
        >
          Dashboard
        </NavLink>
        <span className="block text-sm text-gray-700 bg-white/70 px-3 py-1 rounded-md">
          {`Hello, ${user.name}`}
        </span>
        <button
          onClick={() => {
            logout();
            isMobile && setIsOpen(false);
          }}
          className={`transition ${
            isMobile ? "w-full text-left py-2" : "px-3 py-1"
          } bg-red-500 hover:bg-red-600 rounded-md text-white`}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <NavLink
          to="/login"
          className="block transition hover:text-blue-600 hover:bg-white/70 px-3 py-1 rounded-md"
          onClick={() => isMobile && setIsOpen(false)}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="block transition hover:text-blue-600 hover:bg-white/70 px-3 py-1 rounded-md"
          onClick={() => isMobile && setIsOpen(false)}
        >
          Register
        </NavLink>
      </>
    )
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="font-bold text-lg text-blue-600 hover:text-blue-700 transition"
          >
            🚦 Traffic Dashboard
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center text-gray-700">
            <AuthLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md px-4 pb-4 space-y-2 border-t border-gray-200 shadow-md">
          <AuthLinks isMobile />
        </div>
      )}
    </nav>
  );
}
