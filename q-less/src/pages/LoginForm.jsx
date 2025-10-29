import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginForm({ onSuccess, flip, onFlip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const isSignup = flip;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess?.();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Firebase Auth Error:", err);
      let message = "Something went wrong. Please try again.";
      switch (err.code) {
        case "auth/invalid-email": message = "Enter a valid email."; break;
        case "auth/user-not-found": message = "No account found."; break;
        case "auth/wrong-password": message = "Incorrect password."; break;
        case "auth/email-already-in-use": message = "Email already registered."; break;
        case "auth/weak-password": message = "Password must be 6+ characters."; break;
        case "auth/network-request-failed": message = "Network error."; break;
        case "auth/too-many-requests": message = "Too many attempts. Try later."; break;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onSuccess?.();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backfaceVisibility: "hidden" }}>
      <motion.h2
        className="text-3xl font-bold text-center text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isSignup ? "Create Account" : "Welcome Back"}
      </motion.h2>

      <p className="text-white/70 text-center mt-2">
        {isSignup ? "Join Q-Less today" : "Sign in to continue"}
      </p>

      <form onSubmit={handleAuth} className="mt-8 flex flex-col gap-4" autoComplete="off">
        <input
          type="email"
          required
          className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400 outline-none pr-10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {isSignup && (
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400 outline-none pr-10"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        )}

        {error && <p className="text-red-400 text-center text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>{isSignup ? "Sign Up" : "Sign In"}</>
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <span className="text-white/60 text-sm">or</span>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="mt-4 w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg shadow hover:shadow-lg transition disabled:opacity-60"
      >
        <FcGoogle size={22} /> Continue with Google
      </button>

      <p className="text-center text-white/70 mt-6 text-sm">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          type="button"
          onClick={onFlip}
          className="text-blue-400 hover:text-blue-300 underline font-medium"
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
