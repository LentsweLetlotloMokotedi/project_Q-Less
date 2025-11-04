import React, { useState } from "react";
import { FaUserClock, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Make sure these fonts are imported in your main CSS file (index.css or global.css):
// @import url('https://fonts.googleapis.com/css2?family=Chokokutai&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');

export default function HeroSection({ onLoginClick, user }) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-24 py-6 md:py-24">
      {/* Background illustration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/10 blur-3xl top-10 left-1/4 animate-pulse"></div>
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-yellow-500/10 blur-3xl bottom-10 right-1/4 animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-xl sm:max-w-2xl">
        
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400 drop-shadow-lg"
          style={{ fontFamily: "Chokokutai, sans-serif" }}
        >
          Q-Less
        </h1>

        
          <p
            className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-white/80 leading-relaxed font-bold"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Skip the line, book clinic services online, and get attended faster. Reduce waiting times and manage queues digitally.
          </p>


        {/* Call-to-action */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <div
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/10 border border-white/20 text-white shadow-lg text-sm sm:text-base font-extrabold"
            >
              Welcome, {user.displayName || user.email}!
            </div>

          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium transition text-sm sm:text-base shadow-lg"
            >
              Login
            </button>
          )}

          <button
            onClick={() => setShowBookingForm(true)}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition shadow-lg shadow-blue-500/30 text-sm sm:text-base"
          >
            Book a Queue
          </button>
        </div>


{/* Feature Cards (Responsive Squares) */}
<div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
  {[
    {
      icon: <FaMobileAlt className="text-3xl sm:text-4xl md:text-5xl text-blue-400 mb-3" />,
      title: "Book Remotely",
      text: "Patients can book appointments from their phone or PC.",
    },
    {
      icon: <FaUserClock className="text-3xl sm:text-4xl md:text-5xl text-yellow-400 mb-3" />,
      title: "Real-Time Queue",
      text: "View your queue number and wait virtually until your turn.",
    },
    {
      icon: <FaCheckCircle className="text-3xl sm:text-4xl md:text-5xl text-green-400 mb-3" />,
      title: "Skip the Wait",
      text: "Arrive only when it’s your turn and get attended faster.",
    },
  ].map((card, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-6 sm:p-8 aspect-square w-full sm:max-w-[240px] md:max-w-[260px] hover:bg-white/10 transition-all duration-300"
    >
      {card.icon}
      <h3 className="font-semibold text-white text-base sm:text-lg mb-1">
        {card.title}
      </h3>
      <p className="text-white/70 text-xs sm:text-sm max-w-[220px]">
        {card.text}
      </p>
    </motion.div>
  ))}
</div>

      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingForm(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <div className="relative backdrop-blur-2xl bg-white/5 border border-blue-400/30 shadow-[0_0_25px_rgba(0,102,255,0.4)] rounded-3xl p-6 sm:p-8 w-full max-w-md text-white">
                <button
                  className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl"
                  onClick={() => setShowBookingForm(false)}
                >
                  &times;
                </button>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-blue-300">
                  Book a Clinic Queue
                </h2>
                <form className="flex flex-col gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="p-2 sm:p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Clinic Name"
                    className="p-2 sm:p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Department (e.g. Check-up, Dental)"
                    className="p-2 sm:p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
                  />
                  <input
                    type="time"
                    className="p-2 sm:p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 sm:mt-3 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/30 text-white font-semibold text-sm sm:text-base transition"
                  >
                    Confirm Booking
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
