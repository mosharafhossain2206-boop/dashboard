import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  item,
  isLoading,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Confirmation
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">"{item?.title}"</span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              {isLoading ? (
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete ...
                </button>
              ) : (
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white"
                >
                  Yes, Delete
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
