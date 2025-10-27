import React, { useEffect, useRef } from "react";
import { FaUserCircle, FaBell, FaClock, FaClinicMedical } from "react-icons/fa";
import bgImage from "../assets/images/waiting-room-hospital-lobby-with-reception-counter-desk-diverse-people-waiting-attend-checkup-visit-appointment-health-care-examination-emergency-area-medical-clinic.jpg";

export default function FeatureHighlights() {
  const sectionRef = useRef(null);

  const features = [
    {
      icon: <FaUserCircle className="text-5xl text-blue-400 mb-4" />,
      title: "Remote Booking",
      description: "Book from anywhere and avoid unnecessary waiting.",
    },
    {
      icon: <FaBell className="text-5xl text-yellow-400 mb-4" />,
      title: "Real-Time Alerts",
      description: "Get notified instantly when it's your turn.",
    },
    {
      icon: <FaClinicMedical className="text-5xl text-green-400 mb-4" />,
      title: "Queue Management",
      description: "Clinics handle queues efficiently and reduce congestion.",
    },
    {
      icon: <FaClock className="text-5xl text-purple-400 mb-4" />,
      title: "Save Time",
      description: "Only show up when you need to — no wasted hours.",
    },
  ];

  // ✅ Scroll Reveal Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.isIntersecting
            ? entry.target.classList.add("opacity-100", "translate-y-0")
            : null
        ),
      { threshold: 0.2 }
    );

    const cards = sectionRef.current.querySelectorAll(".feature-card");
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <h2 className="relative z-10 text-center text-4xl font-extrabold text-white mb-16 drop-shadow-xl">
        Why Q-Less Works Better
      </h2>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card opacity-0 translate-y-10
            flex flex-col items-center text-center p-8 rounded-3xl
            bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg
            transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_20px_6px_rgba(255,255,255,0.3)]
            animate-[floatUpDown_4s_ease-in-out_infinite]"
          >
            {feature.icon}
            <h3 className="text-xl font-bold text-white mt-3">{feature.title}</h3>
            <p className="text-white/80 mt-2 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <p className="absolute bottom-2 left-2 text-[10px] text-white/40">
        Background Image by DC Studio / Freepik
      </p>
    </section>
  );
}
