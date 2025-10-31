// src/components/RoleSelectModal.jsx
import { motion } from "framer-motion";

export default function RoleSelectModal({ onSelect }) {
  const roles = ["Patient", "Nurse", "Doctor", "Admin"];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Select Your Role
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Please choose your role to continue.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => onSelect(r)}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
            >
              {r}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
