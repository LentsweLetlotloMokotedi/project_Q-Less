import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function BookingForm({ onClose }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("General Checkup");
  const [submitted, setSubmitted] = useState(false);
  const [queueId, setQueueId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 1; // mock queue number
    setQueueId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setService("General Checkup");
    setQueueId(null);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-80 md:w-96 relative shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
              Book a Queue
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>General Checkup</option>
                <option>Dental</option>
                <option>Physiotherapy</option>
                <option>Vaccination</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
              >
                Book Now
              </button>
            </form>

            {/* Optional Social Login */}
            <div className="mt-4 text-center text-sm text-gray-500">or book with</div>
            <div className="flex justify-center gap-4 mt-2">
              <button className="px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2">
                <FaFacebookF /> Facebook
              </button>
              <button className="px-3 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-2">
                <FaGoogle /> Google
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Thank you, <span className="font-semibold">{name}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              Your queue number is <span className="font-semibold">#{queueId}</span>
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Book Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
