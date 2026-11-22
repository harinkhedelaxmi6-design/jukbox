import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Tooltip({ text, children, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === "top" ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${positionClasses[position]} z-50 pointer-events-none whitespace-normal max-w-xs px-3 py-1.5 text-xs font-medium text-slate-100 bg-[#091224]/95 border border-cyan-500/30 rounded-xl shadow-xl backdrop-blur-md text-center`}
          >
            {text}
            {/* Tooltip Arrow */}
            <div
              className={`absolute w-2 h-2 bg-[#091224] border-cyan-500/30 transform rotate-45 ${
                position === "top"
                  ? "top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b"
                  : "bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t"
              }`}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
