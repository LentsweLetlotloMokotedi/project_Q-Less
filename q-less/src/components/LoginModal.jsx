import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../pages/LoginForm.jsx";
import React, { useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const [flip, setFlip] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed Background */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <div className="relative flex flex-col items-center justify-center backdrop-blur-2xl bg-white/5 border border-blue-400/30 shadow-[0_0_25px_rgba(0,102,255,0.4)] rounded-3xl w-full max-w-md text-white p-8 sm:p-10">
              {/* Close Button */}
              <button className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl" onClick={onClose}>
                &times;
              </button>

              {/* Flip Animation */}
              <motion.div
                key={flip ? "signup" : "signin"}
                initial={{ rotateY: flip ? 180 : -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flip ? -180 : 180, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <LoginForm flip={flip} onFlip={() => setFlip(!flip)} onSuccess={onClose} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
