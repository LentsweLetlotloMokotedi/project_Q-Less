import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess?.();
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onSuccess?.();
      navigate(from, { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
      <p className="text-white/70 text-center mt-2">Sign in to continue</p>

      <form onSubmit={handleEmailLogin} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium">
          Sign In
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <span className="text-white/60 text-sm">or</span>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg shadow hover:shadow-lg transition"
      >
        <FcGoogle size={22} /> Continue with Google
      </button>
    </div>
  );
}
