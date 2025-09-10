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
import Features from "./pages/Features.jsx";
import Vehicle from "./pages/Vehicle.jsx"; // Vehicle page in JSX
import Fine from "./pages/Fine.jsx";
import Toll from "./pages/Toll.jsx";
import Transaction from "./pages/Transaction.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LearnMore from "./pages/LearnMore";
import Analytics from "./pages/Analytics.jsx";
import Contact from "./pages/Contact.jsx";

import AdminSetup from "./pages/AdminSetup";


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
function AppRoutes() {
  const { user } = useContext(AuthContext); // ✅ check if logged in

  return (
    <Layout>
      <Routes>
        {/* Landing page OR redirect to dashboard */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Hero />}
        />

        <Route path="/admin-setup" element={<AdminSetup />} />

        {/* Features page (public) */}
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />

        {/* Feature subpages (protected) */}
        <Route
          path="/features/vehicles"
          element={
            <PrivateRoute>
              <Vehicle />
            </PrivateRoute>
          }
        />
        <Route
          path="/features/fines"
          element={
            <PrivateRoute>
              <Fine />
            </PrivateRoute>
          }
        />
        <Route
          path="/features/toll"
          element={
            <PrivateRoute>
              <Toll />
            </PrivateRoute>
          }
        />
        <Route
          path="/features/transactions"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/analytics" element={<Analytics />} />

        {/* ✅ Public Learn More page */}
        <Route path="/LearnMore" element={<LearnMore />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}



// ✅ Wrap App with AuthProvider & Router
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
