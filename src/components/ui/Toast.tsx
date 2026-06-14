"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  type?: "success" | "info";
}

export default function Toast({ message, visible, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed", bottom: "28px", right: "24px",
            zIndex: 9999,
            display: "flex", alignItems: "center", gap: "10px",
            padding: "12px 18px", borderRadius: "12px",
            background: "rgba(9,9,11,0.95)",
            border: type === "success"
              ? "0.5px solid rgba(34,197,94,0.3)"
              : "0.5px solid rgba(59,130,246,0.3)",
            backdropFilter: "blur(12px)",
            boxShadow: type === "success"
              ? "0 0 20px rgba(34,197,94,0.1)"
              : "0 0 20px rgba(59,130,246,0.1)",
          }}
        >
          <span style={{ fontSize: "14px" }}>
            {type === "success" ? "✓" : "ℹ"}
          </span>
          <span style={{
            fontSize: "13px", fontWeight: 500,
            color: type === "success" ? "#86efac" : "#93c5fd",
          }}>
            {message}
          </span>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#52525b", marginLeft: "4px", padding: "0",
            fontSize: "14px", lineHeight: 1,
          }}>✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}