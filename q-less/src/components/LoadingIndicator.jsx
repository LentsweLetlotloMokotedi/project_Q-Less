import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function LoadingIndicator() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading when path changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // simulate delay
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full bg-blue-500 animate-[bounce_1s_infinite]`}
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Custom CSS for bounce animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
          }
          .animate-[bounce_1s_infinite] {
            animation: bounce 1s infinite;
          }
        `}
      </style>
    </div>
  );
}
