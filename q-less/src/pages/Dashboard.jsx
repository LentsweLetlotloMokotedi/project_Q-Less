import { useState, useRef } from "react";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const audioCtxRef = useRef(null);

  const [queue, setQueue] = useState(
    Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      name: `Patient ${i + 1}`,
      service: ["General Checkup", "Dental", "Physiotherapy", "Vaccination"][i % 4],
      status: "Waiting",
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      animateComplete: false,
    }))
  );

  // Web Audio bell synth
  const playBell = () => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(880, now);
      osc2.frequency.setValueAtTime(1320, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1);
      osc2.stop(now + 1);
    } catch (err) {
      console.warn("Audio failed:", err);
    }
  };

  const cycleStatus = (id) => {
    setQueue((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          let newStatus;
          if (p.status === "Waiting") newStatus = "In Progress";
          else if (p.status === "In Progress") newStatus = "Completed";
          else newStatus = "Waiting";

          if (newStatus === "Completed") playBell();

          return { ...p, status: newStatus, animateComplete: newStatus === "Completed" };
        }
        return p;
      })
    );

    // Remove bounce highlight after 600ms
    setTimeout(() => {
      setQueue((prev) => prev.map((p) => ({ ...p, animateComplete: false })));
    }, 600);
  };

  // Count completed patients
  const completedCount = queue.filter((p) => p.status === "Completed").length;
  const progressPercent = Math.round((completedCount / queue.length) * 100);

  // Optional filter
  const [filter, setFilter] = useState("All");
  const visibleQueue =
    filter === "All" ? queue : queue.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6 pt-20 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center tracking-wide">
          Clinic Queue Dashboard
        </h1>

        {/* Completed counter and progress */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="text-lg font-semibold">
            Completed Patients: {completedCount} / {queue.length}
          </div>
          <div className="w-full md:w-1/3 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {["All", "Waiting", "In Progress", "Completed"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full border ${
                filter === f ? "bg-blue-600 border-blue-700" : "bg-gray-800 border-gray-600"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleQueue.map((patient) => {
            const isWaiting = patient.status === "Waiting";
            const isInProgress = patient.status === "In Progress";
            const isCompleted = patient.status === "Completed";

            const cardBase =
              "relative p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 transform";
            const cardStyle = isWaiting
              ? "bg-blue-950/50 border border-blue-700"
              : isInProgress
              ? "bg-yellow-500 animate-pulse"
              : "bg-green-500 text-black scale-95 shadow-2xl";

            return (
              <article
                key={patient.id}
                className={`${cardBase} ${cardStyle} ${patient.animateComplete ? "ring-4 ring-green-300" : ""}`}
              >
                {/* Action Button */}
                <button
                  onClick={() => cycleStatus(patient.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition hover:scale-110 shadow-md ${
                    isCompleted ? "bg-gray-800 text-white" : isInProgress ? "bg-green-800 text-white" : "bg-blue-600 text-white"
                  }`}
                  title={isWaiting ? "Start" : isInProgress ? "Complete" : "Undo (to Waiting)"}
                >
                  {isWaiting ? <FaPlay /> : <FaCheckCircle />}
                </button>

                {/* Avatar */}
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-14 h-14 rounded-full border-2 border-white mb-3"
                />

                {/* Patient Info */}
                <div className="text-lg font-semibold">{patient.name}</div>
                <div className="text-sm opacity-80">{patient.service}</div>
                <div className="mt-2 font-bold">{patient.status}</div>
                <div className="text-xs opacity-50 mt-1">#{patient.id}</div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
