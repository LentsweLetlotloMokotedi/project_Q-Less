import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../pages/LoginForm";

export default function LoginModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Dim / Blur */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // close when clicking outside
          />

          {/* Modal Card */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <div className="relative backdrop-blur-2xl bg-white/5 border border-blue-400/30 shadow-[0_0_25px_rgba(0,102,255,0.4)] rounded-3xl p-8 w-full max-w-md text-white">

              
              {/* Close Button */}
              <button
                className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl"
                onClick={onClose}
              >
                &times;
              </button>

              {/* Login Content */}
              <LoginForm onSuccess={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
