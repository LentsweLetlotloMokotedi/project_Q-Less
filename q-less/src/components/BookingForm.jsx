// src/components/BookingForm.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function BookingForm({ onClose }) {
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("City Clinic");
  const [service, setService] = useState("General Checkup");
  const [customService, setCustomService] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [queueId, setQueueId] = useState(null);
  const [position, setPosition] = useState(null);
  const [queueNumber, setQueueNumber] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clinicDropdownOpen, setClinicDropdownOpen] = useState(false);

  const services = [
    "General Checkup",
    "Dental",
    "Physiotherapy",
    "Vaccination",
    "Others",
  ];

  const clinics = [
    "City Clinic",
    "Sunrise Hospital",
    "Greenfield Health",
    "Downtown Clinic",
    "Others",
  ];

  // 📦 Create booking in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      // Get queue size for this clinic
      const q = query(
        collection(db, "queues"),
        where("clinic", "==", clinic),
        where("status", "==", "Waiting")
      );
      const snapshot = await getDocs(q);
      const nextNumber = snapshot.size + 1;

      const docRef = await addDoc(collection(db, "queues"), {
        userId: user.uid,
        email: user.email,
        name,
        clinic,
        service: service === "Others" ? customService : service,
        time,
        queueNumber: nextNumber,
        status: "Waiting",
        createdAt: serverTimestamp(),
      });

      setQueueId(docRef.id);
      setQueueNumber(nextNumber);
      setSubmitted(true);
    } catch (err) {
      console.error("Error booking queue:", err);
      alert("Failed to book. Try again.");
    }
  };

  // 🔄 Track live position in queue
  useEffect(() => {
    if (!queueId) return;
    const q = query(
      collection(db, "queues"),
      where("clinic", "==", clinic),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const waitingList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.status === "Waiting");
      const pos = waitingList.findIndex((p) => p.id === queueId);
      setPosition(pos + 1);
    });
    return unsubscribe;
  }, [queueId, clinic]);

  // ❌ Cancel/Delete booking
  const handleCancel = async () => {
    try {
      if (!queueId) return;
      await deleteDoc(doc(db, "queues", queueId));
      alert("Booking cancelled.");
      handleReset();
    } catch (err) {
      console.error("Error deleting queue:", err);
      alert("Failed to cancel booking.");
    }
  };

  const handleReset = () => {
    setName("");
    setClinic("City Clinic");
    setService("General Checkup");
    setCustomService("");
    setTime("");
    setQueueId(null);
    setQueueNumber(null);
    setPosition(null);
    setSubmitted(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-white/5 backdrop-blur-xl border border-blue-400/30 rounded-3xl shadow-[0_0_25px_rgba(0,102,255,0.4)] text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl"
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">
              Book a Clinic Queue
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              />

              {/* Clinic Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setClinicDropdownOpen(!clinicDropdownOpen)}
                  className="w-full p-3 rounded-xl bg-white/10 text-white text-left flex justify-between items-center border border-white/20"
                >
                  {clinic}
                  <span
                    className={`transition-transform ${
                      clinicDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {clinicDropdownOpen && (
                    <motion.ul
                      className="absolute w-full mt-1 max-h-48 overflow-y-auto bg-blue-950/80 backdrop-blur-lg border border-blue-400/30 rounded-xl z-50 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    >
                      {clinics.map((c) => (
                        <li
                          key={c}
                          className="px-3 py-2 hover:bg-blue-500/30 cursor-pointer"
                          onClick={() => {
                            setClinic(c);
                            setClinicDropdownOpen(false);
                          }}
                        >
                          {c}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full p-3 rounded-xl bg-white/10 text-white text-left flex justify-between items-center border border-white/20"
                >
                  {service}
                  <span
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      className="absolute w-full mt-1 max-h-48 overflow-y-auto bg-blue-950/80 backdrop-blur-lg border border-blue-400/30 rounded-xl z-50 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    >
                      {services.map((s) => (
                        <li
                          key={s}
                          className="px-3 py-2 hover:bg-blue-500/30 cursor-pointer"
                          onClick={() => {
                            setService(s);
                            setDropdownOpen(false);
                          }}
                        >
                          {s}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Service (Others) */}
              {service === "Others" && (
                <input
                  type="text"
                  placeholder="Enter your reason"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  required
                  className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                />
              )}

              {/* Time Input */}
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              />

              {/* Submit */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/40 text-white font-semibold transition"
              >
                Confirm Booking
              </motion.button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-400">
              Booking Confirmed!
            </h2>
            <p>
              Thank you, <span className="font-semibold">{name}</span>
            </p>
            <p>
              Clinic: <span className="font-semibold">{clinic}</span>
            </p>
            <p>
              Queue Number:{" "}
              <span className="font-semibold text-blue-300">
                #{String(queueNumber).padStart(3, "0")}
              </span>
            </p>
            {position && (
              <p>
                Current Position:{" "}
                <span className="font-semibold">{position}</span>
              </p>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={handleCancel}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white font-semibold"
              >
                Cancel Booking
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold"
              >
                Book Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
