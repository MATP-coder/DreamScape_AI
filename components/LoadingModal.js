"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * LoadingModal displays a semi‑transparent backdrop with a spinning logo and
 * optional text to indicate progress. It is intended to evoke a dreamy
 * atmosphere during the image generation phase. Use the `show` prop to
 * control visibility.
 *
 * @param {boolean} show Whether to display the modal
 */
export default function LoadingModal({ show }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="relative h-24 w-24">
          {/* Animated logo: spins slowly to mimic a dream portal */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="h-full w-full"
          >
            <Image
              src="/logo.png"
              alt="DreamScape Logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
        <p className="text-white text-lg font-medium">Dein Traum manifestiert sich …</p>
      </motion.div>
    </div>
  );
}