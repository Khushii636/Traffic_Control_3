// src/pages/Register.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [activeTab, setActiveTab] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send role based on activeTab
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: activeTab }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Save user in context
      login(data);

      // Redirect based on role
      if (activeTab === "admin") {
        navigate("/admin-setup"); // special page for admins
      } else {
        navigate("/"); // normal users go home
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // 🔹 Everything else remains EXACTLY the same as your file
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 relative overflow-hidden">
      {/* Decorative glowing circles */}
      <div className="absolute top-16 left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse shadow-[0_0_50px_rgba(59,130,246,0.4)]"></div>
      <div className="absolute bottom-16 right-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse shadow-[0_0_50px_rgba(56,189,248,0.3)]"></div>

      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.4)] w-full max-w-md border border-blue-500/30 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_60px_rgba(56,189,248,0.5)]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]">
          Register
        </h2>

        {/* Admin/User toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "user"
                ? "bg-cyan-500/30 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                : "bg-slate-800/50 text-blue-300 hover:bg-slate-700/50"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "admin"
                ? "bg-cyan-500/30 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                : "bg-slate-800/50 text-blue-300 hover:bg-slate-700/50"
            }`}
          >
            Admin
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center font-medium animate-pulse">
            {error}
          </p>
        )}

        {/* User Form */}
        {activeTab === "user" && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ... unchanged form fields ... */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-200">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-blue-500/30 rounded-xl px-4 py-3 bg-slate-800/50 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all shadow-sm hover:shadow-md hover:bg-slate-700/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-blue-500/30 rounded-xl px-4 py-3 bg-slate-800/50 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all shadow-sm hover:shadow-md hover:bg-slate-700/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-blue-500/30 rounded-xl px-4 py-3 bg-slate-800/50 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all shadow-sm hover:shadow-md hover:bg-slate-700/40"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold tracking-wide shadow-[0_0_15px_rgba(56,189,248,0.4)] transform transition-all border border-cyan-400/40 backdrop-blur-sm bg-gradient-to-r from-cyan-500/30 to-blue-600/40 text-cyan-100 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
            >
              Register as User
            </button>
          </form>
        )}

        {/* Admin Form */}
        {activeTab === "admin" && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ... unchanged form fields ... */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-200">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-blue-500/30 rounded-xl px-4 py-3 bg-slate-800/50 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all shadow-sm hover:shadow-md hover:bg-slate-700/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-blue-500/30 rounded-xl px-4 py-3 bg-slate-800/50 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all shadow-sm hover:shadow-md hover:bg-slate-700/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-blue-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-blue-500/30 rounded-xl px-4 py-3 bg-slate-800/50 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all shadow-sm hover:shadow-md hover:bg-slate-700/40"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold tracking-wide shadow-[0_0_15px_rgba(56,189,248,0.4)] transform transition-all border border-cyan-400/40 backdrop-blur-sm bg-gradient-to-r from-cyan-500/30 to-blue-600/40 text-cyan-100 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
            >
              Register as Admin
            </button>
          </form>
        )}

        <p className="text-sm text-blue-200 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 font-bold hover:underline hover:text-cyan-300 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


