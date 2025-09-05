import { useState, useContext } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200 transition hover:shadow-2xl hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium animate-pulse">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm hover:shadow-md placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm hover:shadow-md placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-semibold tracking-wide shadow-md transform transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-[1.02] hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-8 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline hover:text-blue-800 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
