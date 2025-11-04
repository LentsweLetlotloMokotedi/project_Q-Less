import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import qlessLogo from "./assets/images/Q-Less-Logo1.png";

// ---------------- GLOBAL LOADER ----------------
function GlobalLoader() {
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
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();

  // ✅ Short delay before showing content (prevents footer flash)
  useEffect(() => {
    setAppReady(false);
    const timer = setTimeout(() => setAppReady(true), 900);
    return () => clearTimeout(timer);
  }, [location]);

  if (!appReady) return <GlobalLoader />;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
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
      </main>
    </div>
  );
}
