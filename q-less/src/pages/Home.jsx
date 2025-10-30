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
    <div className="w-full relative">
      {/* Navbar (unchanged) */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-75 pointer-events-none"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Decorative Background Blurs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse pointer-events-none"></div>

        {/* Pass `user` to HeroSection */}
        <HeroSection onLoginClick={() => setShowLogin(true)} user={user} />
      </section>

      <QueuePreview />
      <FeatureHighlights />

      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}

      <a
        href={`tel:${ambulanceNumber}`}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg text-lg font-semibold animate-pulse"
        title="Call Ambulance"
      >
        <FaAmbulance /> SOS
      </a>
    </div>
  );
}
