// components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Q-Less-Logo1.png";

export default function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
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

        <button
          onClick={onLoginClick}
          className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold transition-all duration-300 shadow-md shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-400/40 hover:scale-105 active:scale-95 animate-pulse-slow"
        >
          Login
        </button>
      </div>

      <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-xl p-4 flex flex-col gap-3 md:hidden"
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
          <button
            onClick={onLoginClick}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 animate-pulse-slow"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
