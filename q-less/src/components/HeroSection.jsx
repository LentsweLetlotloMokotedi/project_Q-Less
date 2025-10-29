import React, { useState } from "react";
import { FaUserClock, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection({ onLoginClick }) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-24">
      {/* Background subtle illustration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl top-10 left-1/4 animate-pulse"></div>
        <div className="absolute w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl bottom-10 right-1/4 animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-6xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400 drop-shadow-lg">
          Q-Less
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80">
          Skip the line, book clinic services online, and get attended faster. Reduce waiting times and manage queues digitally.
        </p>

        {/* Call-to-action */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLoginClick}
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium transition shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => setShowBookingForm(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition shadow-lg shadow-blue-500/30"
          >
            Book a Queue
          </button>
        </div>

        {/* Visual Story Blocks */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl shadow-lg flex flex-col items-center">
            <FaMobileAlt className="text-4xl text-blue-400 mb-2" />
            <h3 className="font-semibold text-white">Book Remotely</h3>
            <p className="text-white/70 text-sm text-center">
              Patients can book appointments from their phone or PC.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl shadow-lg flex flex-col items-center">
            <FaUserClock className="text-4xl text-yellow-400 mb-2" />
            <h3 className="font-semibold text-white">Real-Time Queue</h3>
            <p className="text-white/70 text-sm text-center">
              View your queue number and wait virtually until your turn.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl shadow-lg flex flex-col items-center">
            <FaCheckCircle className="text-4xl text-green-400 mb-2" />
            <h3 className="font-semibold text-white">Skip the Wait</h3>
            <p className="text-white/70 text-sm text-center">
              Arrive only when it’s your turn and get attended faster.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Booking Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <>
            {/* Background Blur */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingForm(false)}
            />

            {/* Booking Form Card */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            >
              <div className="relative backdrop-blur-2xl bg-white/5 border border-blue-400/30 shadow-[0_0_25px_rgba(0,102,255,0.4)] rounded-3xl p-8 w-full max-w-md text-white">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl"
                  onClick={() => setShowBookingForm(false)}
                >
                  &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">
                  Book a Clinic Queue
                </h2>

                {/* Form */}
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Clinic Name"
                    className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Department (e.g. Check-up, Dental)"
                    className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="time"
                    className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/30 text-white font-semibold transition"
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
