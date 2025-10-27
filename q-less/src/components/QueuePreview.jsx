import React from "react";
import { FaBell } from "react-icons/fa";
import backdropImage from "../assets/images/andrik-langfield-qvFlxrDSyXU-unsplash.jpg";

export default function QueuePreview({ queue }) {
  // fallback to mock queue if no queue is passed as prop
  const mockQueue = queue ?? Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Patient ${i + 1}`,
    service: ["General Checkup", "Dental", "Physiotherapy", "Vaccination"][i % 4],
    status: i === 0 ? "In Progress" : "Waiting",
    avatar: `https://i.pravatar.cc/150?img=${i + 10 + i}`, // unique placeholder
  }));

  const topQueue = (mockQueue ?? []).slice(0, 4);
  const remainingCount = (mockQueue ?? []).length - topQueue.length;

  return (
    <section className="relative w-full px-6 py-16 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 blur-sm"
        style={{ backgroundImage: `url(${backdropImage})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10"></div>

      <h2 className="relative text-3xl font-bold text-center mb-10 text-white">
        Current Queue
      </h2>

      {/* Cards Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 z-10 animate-[fadeInUp_0.8s_ease-in-out]">
        {topQueue.map((patient) => (
          <div
            key={patient.id}
            className={`relative flex flex-col items-center p-5 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 transition-all duration-500 hover:-translate-y-1 hover:scale-105
              ${
                patient.status === "Waiting"
                  ? "bg-white/20 text-white"
                  : patient.status === "In Progress"
                  ? "bg-yellow-400 text-white animate-pulse shadow-yellow-300/50"
                  : "bg-green-500 text-white shadow-green-500/50"
              }`}
          >
            {/* Avatar */}
            <img
              src={patient.avatar}
              alt={`${patient.name} avatar`}
              className="w-16 h-16 rounded-full mb-2 border-2 border-white/30 object-cover"
            />

            <p className="text-lg font-semibold">{patient.name}</p>
            <p className="text-sm opacity-90">{patient.service}</p>
            <p className="mt-1 font-bold">{patient.status}</p>
            <p className="text-xs opacity-80">#{patient.id}</p>

            {patient.status === "In Progress" && (
              <FaBell className="absolute top-3 right-3 animate-bounce" />
            )}
          </div>
        ))}
      </div>

      {remainingCount > 0 && (
        <div className="relative mt-6 text-center text-white/90 font-semibold">
          +{remainingCount} more patients in queue
        </div>
      )}

      {/* ✅ Image Attribution */}
      <p className="absolute bottom-2 left-2 text-[10px] text-white/40">
        Image by Andrik Langfield.
      </p>
    </section>
  );
}
