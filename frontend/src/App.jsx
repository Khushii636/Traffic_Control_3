import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero.jsx";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider, AuthContext } from "./context/AuthContext";

// ✅ PrivateRoute wrapper for protected pages
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

// ✅ Layout to conditionally show/hide Navbar/Footer
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  const hideFooter = ["/login", "/register", "/"].includes(location.pathname);
  const isHero = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={isHero ? "" : "p-4"}>{children}</div>
      {!hideFooter && <Footer />}
    </>
  );
}

// ✅ Main App
function App() {
  return (
    <div className="">
      <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Hero />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/vehicles"
              element={
                <PrivateRoute>
                  <Vehicles />
                </PrivateRoute>
              }
            />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Optional: fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
    </div>
    
  );
}

export default App;
