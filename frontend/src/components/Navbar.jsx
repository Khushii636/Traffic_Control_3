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
            `block ${isMobile ? "" : "hover:text-yellow-300"} ${
              isActive ? "font-semibold text-yellow-300" : ""
            }`
          }
          onClick={() => isMobile && setIsOpen(false)}
        >
          Dashboard
        </NavLink>
        <span className="block text-sm">{`Hello, ${user.name}`}</span>
        <button
          onClick={() => {
            logout();
            isMobile && setIsOpen(false);
          }}
          className={`${
            isMobile ? "w-full text-left" : ""
          } bg-red-500 hover:bg-red-600 px-3 py-1 rounded`}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <NavLink
          to="/login"
          className="block hover:text-yellow-300"
          onClick={() => isMobile && setIsOpen(false)}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="block hover:text-yellow-300"
          onClick={() => isMobile && setIsOpen(false)}
        >
          Register
        </NavLink>
      </>
    )
  );

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-lg">
            🚦 Traffic Dashboard
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <AuthLinks />
          </div>

          <button
            className="md:hidden p-2 rounded hover:bg-blue-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <AuthLinks isMobile />
        </div>
      )}
    </nav>
  );
}
