import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import footerBg from "../assets/images/Footer.jpg";

export default function Footer() {
  return (
    <footer className="relative w-full text-white text-sm">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url(${footerBg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Quick Links */}
        <div className="flex gap-4">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="#queue" className="hover:text-blue-400 transition">Live Queue</a>
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 text-white text-base">
          <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaInstagram /></a>
          <a href="mailto:support@q-less.com" className="hover:text-blue-400 transition"><FaEnvelope /></a>
        </div>

        {/* Copy */}
        <p className="text-white/50 text-xs mt-2 md:mt-0">&copy; {new Date().getFullYear()} Q-Less. All rights reserved.</p>
      </div>
    </footer>
  );
}
