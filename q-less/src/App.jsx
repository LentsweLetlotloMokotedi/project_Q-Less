import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import qlessLogo from "./assets/images/Q-Less-Logo1.png";

// ---------------- GLOBAL LOADER ----------------
function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity">
      <img
        src={qlessLogo}
        alt="Q-Less Logo"
        className="w-20 h-20 md:w-28 md:h-28 animate-pulse drop-shadow-lg"
      />
      <p className="mt-4 text-blue-400 text-lg md:text-xl font-semibold animate-pulse">
        Loading Q-Less...
      </p>
      <div className="mt-4 w-32 h-1 bg-blue-700 rounded-full overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-yellow-400 animate-[slide_1.2s_linear_infinite]" />
      </div>

      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            50% { transform: translateX(200%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

// ---------------- PRIVATE ROUTE ----------------
function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <GlobalLoader />;
  return user ? children : <Navigate to="/login" />;
}

// ---------------- PUBLIC ROUTE ----------------
function PublicRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <GlobalLoader />;
  return !user ? children : <Navigate to="/dashboard" />;
}

// ---------------- HOME ROUTE ----------------
function HomeRoute() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <GlobalLoader />;
  return <Home />;
}

// ---------------- MAIN APP ----------------
export default function App() {
  return (
    <>
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<HomeRoute />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
