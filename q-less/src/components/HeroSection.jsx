import React from "react";
import { FaUserClock, FaMobileAlt, FaCheckCircle } from "react-icons/fa";

export default function HeroSection({ onLoginClick, onBookClick }) {
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
          Skip the line, book services online, and get attended faster. Reduce waiting times and manage your queue digitally.
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
            onClick={onBookClick}
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
    </div>
  );
}
