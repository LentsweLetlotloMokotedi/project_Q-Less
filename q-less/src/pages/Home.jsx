import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import QueuePreview from "../components/QueuePreview";
import FeatureHighlights from "../components/FeatureHighlights";
import LoginModal from "../components/LoginModal";
import BookingForm from "../components/BookingForm";
import videoBg from "../assets/videos/1472191_People_Technology_4096x2160.mp4";
import { FaAmbulance } from "react-icons/fa";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const ambulanceNumber = "+27123456789"; // Replace with real emergency number

  return (
    <div className="w-full relative">
      {/* Navbar */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Hero Section with full screen backdrop video */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Decorative backdrops */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>

        {/* Hero content */}
        <HeroSection onLoginClick={() => setShowLogin(true)} />
      </section>

      {/* Queue and Features */}
      <QueuePreview />
      <FeatureHighlights />

      {/* Modals */}
      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}

      {/* SOS/Emergency Button */}
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
