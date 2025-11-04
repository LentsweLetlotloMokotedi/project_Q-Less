import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import LoginForm from "./LoginForm"; // ✅ same login form you already have
import bg from "../assets/images/pexels-karola-g-4047186.jpg"; // or any background you like

export default function LoginPage() {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  // 👇 redirect automatically when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0" />

      {/* Login modal */}
      {showModal && (
        <div className="z-10">
          <LoginForm onClose={() => setShowModal(false)} />
        </div>
      )}

      {/* Reopen button if closed */}
      {!showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="z-10 text-white border border-white/40 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold"
        >
          Reopen Login
        </button>
      )}
    </div>
  );
}
