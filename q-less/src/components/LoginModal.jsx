// src/components/LoginModal.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../pages/LoginForm";

export default function LoginModal({ isOpen, onClose }) {
  const [flip, setFlip] = useState(false); // false = Sign In, true = Sign Up

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background dim/blur */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 3D Card Container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <div
              className="relative w-full max-w-md"
              style={{ perspective: 1200 }} // perspective for 3D effect
            >
              <motion.div
                className="relative bg-white/5 border border-blue-400/30 shadow-[0_0_25px_rgba(0,102,255,0.4)] rounded-3xl p-8 text-white"
                animate={{ rotateY: flip ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl z-50"
                  onClick={onClose}
                >
                  &times;
                </button>

                {/* Pass flip handler and state to form */}
                <LoginForm onSuccess={onClose} onFlip={() => setFlip(!flip)} flip={flip} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
