// src/pages/Dashboard.jsx
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaPlay, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import RoleSelectModal from "../components/RoleSelectModal";
import karolaBg from "../assets/images/pexels-karola-g-4047186.jpg";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const audioCtxRef = useRef(null);
  const navigate = useNavigate();

  const [queue, setQueue] = useState([]);
  const [role, setRole] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true); // ✅ loading state

  // Load user role
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate("/login");
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) setRole(docSnap.data().role);
        else setRole(null);
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setLoading(false); // ✅ stop spinner once done
      }
    });
    return unsubscribeAuth;
  }, [navigate]);

  // Load live queue from Firestore
  useEffect(() => {
    const q = query(collection(db, "queues"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQueue(data);
    });
    return unsubscribe;
  }, []);

  const playBell = () => {
    try {
      if (!audioCtxRef.current)
        audioCtxRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
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

  const getTargetProgress = (status) =>
    status === "Waiting" ? 0 : status === "In Progress" ? 50 : 100;

  // Only staff can update status
  const cycleStatus = async (id, currentStatus) => {
    if (role === "Patient") return; // Patients cannot update

    const newStatus =
      currentStatus === "Waiting"
        ? "In Progress"
        : currentStatus === "In Progress"
        ? "Completed"
        : "Waiting";

    if (newStatus === "Completed") playBell();

    await updateDoc(doc(db, "queues", id), { status: newStatus });
  };

  const completedCount = queue.filter((p) => p.status === "Completed").length;
  const progressPercent = Math.round((completedCount / queue.length) * 100);
  const visibleQueue =
    filter === "All" ? queue : queue.filter((p) => p.status === filter);

  function PatientCard({ patient }) {
    const isCompleted = patient.status === "Completed";
    const isInProgress = patient.status === "In Progress";

    const motionVal = useMotionValue(getTargetProgress(patient.status));
    const smooth = useSpring(motionVal, { stiffness: 200, damping: 25 });

    useEffect(() => motionVal.set(getTargetProgress(patient.status)), [
      patient.status,
    ]);

    const gradient = useTransform(smooth, (p) => {
      if (isCompleted) return "conic-gradient(green 0deg, green 360deg)";
      if (isInProgress) {
        const deg = p * 3.6;
        return `conic-gradient(yellow 0deg, yellow ${deg}deg, red ${deg}deg 360deg)`;
      }
      return "conic-gradient(red 0deg, red 360deg)";
    });

    return (
      <article
        className={`relative flex flex-col items-center p-6 rounded-3xl shadow-lg backdrop-blur-md border border-white/20 transition-all duration-500 hover:-translate-y-1 hover:scale-105 ${
          isCompleted
            ? "bg-green-500 text-white shadow-green-500/50"
            : isInProgress
            ? "bg-yellow-400 text-white animate-pulse shadow-yellow-300/50"
            : "bg-white/10 text-white"
        }`}
      >
        {/* Staff Controls */}
        {role !== "Patient" && (
          <button
            onClick={() => cycleStatus(patient.id, patient.status)}
            className={`absolute top-3 right-3 p-2 rounded-full transition hover:scale-110 shadow-md ${
              isCompleted
                ? "bg-gray-800"
                : isInProgress
                ? "bg-green-800"
                : "bg-blue-600"
            } text-white`}
            title={
              isInProgress ? "Complete" : isCompleted ? "Undo" : "Start"
            }
          >
            {patient.status === "Waiting" ? <FaPlay /> : <FaCheckCircle />}
          </button>
        )}

        <div className="relative mb-3 w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-red-500" />
          <motion.div
            className={`absolute inset-0 rounded-full ${
              isCompleted ? "ring-4 ring-green-400 animate-pulse" : ""
            }`}
            style={{
              background: gradient,
              clipPath: "circle(50%)",
              transformOrigin: "50% 50%",
            }}
            animate={isInProgress ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isInProgress
                ? { repeat: Infinity, duration: 6, ease: "linear" }
                : { duration: 0.3 }
            }
          />
          {isCompleted && (
            <span className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-green-400 animate-ping" />
          )}
          <img
            src={patient.avatar}
            alt={patient.name}
            className="absolute top-2 left-2 w-16 h-16 rounded-full border-2 border-white"
          />
        </div>

        <p className="text-lg font-semibold">{patient.name}</p>
        <p className="text-sm opacity-80">{patient.service}</p>
        <p className="mt-2 font-bold">{patient.status}</p>
        <p className="text-xs opacity-50 mt-1">#{patient.id}</p>
      </article>
    );
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 blur-sm"
        style={{ backgroundImage: `url(${karolaBg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>

      <Navbar />

      {/* 🏠 Home button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
      >
        <FaHome className="text-red-400" />
        <span className="hidden sm:block font-semibold">Home</span>
      </button>

      {/* 🌀 Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-[999]">
          <div className="w-14 h-14 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 p-6 pt-24 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Clinic Queue Dashboard
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <p className="text-lg font-semibold">
            Completed Patients: {completedCount} / {queue.length}
          </p>
          <div className="w-full md:w-1/3 h-4 bg-gray-700/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {["All", "Waiting", "In Progress", "Completed"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full border ${
                filter === f
                  ? "bg-blue-600 border-blue-700"
                  : "bg-gray-800/70 border-gray-600"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-10">
          {visibleQueue.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      </div>

      <p className="absolute bottom-2 left-2 text-[10px] text-white/40 z-10">
        Image by Karola G
      </p>

      {/* 🌟 Role selection modal */}
      {!loading && !role && (
        <RoleSelectModal
          onSelect={async (selectedRole) => {
            const user = auth.currentUser;
            if (user) {
              await setDoc(doc(db, "users", user.uid), { role: selectedRole });
              setRole(selectedRole);
            }
          }}
        />
      )}
    </section>
  );
}
