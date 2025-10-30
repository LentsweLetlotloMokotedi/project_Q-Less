import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Logo from "../assets/images/Q-Less-Logo1.png";

export default function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToDashboard = () => {
    setMenuOpen(false);
    navigate("/dashboard");
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Hide navbar on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 md:px-8 py-4 backdrop-blur-md bg-black/40 border-b border-white/10 flex justify-between items-center transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <img
        src={Logo}
        alt="Q-Less Logo"
        className="h-12 md:h-14 cursor-pointer object-contain"
        onClick={() => scrollToSection("home")}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-white/80 font-medium items-center">
        <button onClick={() => scrollToSection("home")} className="hover:text-white transition">
          Home
        </button>
        <button onClick={goToDashboard} className="hover:text-white transition">
          Live Queue
        </button>
        <button onClick={() => scrollToSection("features")} className="hover:text-white transition">
          Features
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white/30 object-cover cursor-pointer"
              onClick={goToDashboard}
            />
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold transition-all duration-300 shadow-md shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-400/40 hover:scale-105 active:scale-95 animate-pulse-slow"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-52 bg-black/80 backdrop-blur-md rounded-xl p-4 flex flex-col gap-3 md:hidden"
        >
          <button onClick={() => scrollToSection("home")} className="text-white hover:text-blue-400 transition">
            Home
          </button>
          <button onClick={goToDashboard} className="text-white hover:text-blue-400 transition">
            Live Queue
          </button>
          <button onClick={() => scrollToSection("features")} className="text-white hover:text-blue-400 transition">
            Features
          </button>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white/30 object-cover"
                />
                <span className="text-white font-semibold">{user.displayName || "User"}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
