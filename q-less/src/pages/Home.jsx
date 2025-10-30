// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import QueuePreview from "../components/QueuePreview";
import FeatureHighlights from "../components/FeatureHighlights";
import LoginModal from "../components/LoginModal";
import BookingForm from "../components/BookingForm";
import videoBg from "../assets/videos/comptry.mp4";
import { FaAmbulance } from "react-icons/fa";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [user, setUser] = useState(null);
  const ambulanceNumber = "+27123456789";

  // Track logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-gray-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center w-full min-h-[90vh] pt-16 md:pt-20 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay for better contrast on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0" />

        {/* Glow decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />

        {/* Hero Content */}
        <div className="relative z-10 px-6 md:px-10 text-center max-w-2xl">
          <HeroSection onLoginClick={() => setShowLogin(true)} user={user} />
        </div>
      </section>

      {/* QUEUE PREVIEW */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-b from-gray-900 to-gray-950 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <QueuePreview />
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-t from-gray-950 to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FeatureHighlights />
        </div>
      </section>

      {/* MODALS */}
      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}

      {/* SOS BUTTON */}
      <a
        href={`tel:${ambulanceNumber}`}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl text-lg font-semibold animate-pulse sm:px-5 sm:py-3 sm:text-xl"
        title="Call Ambulance"
      >
        <FaAmbulance className="text-xl" /> SOS
      </a>
    </div>
  );
}
