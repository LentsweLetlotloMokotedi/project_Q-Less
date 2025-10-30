import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import qlessLogo from "../assets/images/logo.png"; // 🧠 adjust path if needed

export default function LoadingIndicator() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger loading animation briefly when route changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // smooth fade
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <img
        src={qlessLogo}
        alt="Q-Less Logo"
        className="w-20 h-20 md:w-28 md:h-28 animate-pulse drop-shadow-lg"
      />
      <p className="mt-4 text-blue-400 text-lg md:text-xl font-semibold animate-pulse">
        Loading Q-Less...
      </p>

      {/* Subtle animated bar below logo */}
      <div className="mt-4 w-32 h-1 bg-blue-700 rounded-full overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-yellow-400 animate-[slide_1.2s_linear_infinite]" />
      </div>

      {/* Custom sliding bar animation */}
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
