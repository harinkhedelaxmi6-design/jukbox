// IMPACT: Multi-sensory accessibility for visually impaired and low-vision researchers
import React from 'react';
import { Eye, EyeOff, Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccessibilityToggle({
  isAccessibleMode,
  onToggleAccessibleMode
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggleAccessibleMode}
      aria-pressed={isAccessibleMode}
      aria-label="Toggle High-Contrast Accessibility Mode and Live Narrator"
      className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all shadow-lg border ${
        isAccessibleMode
          ? 'bg-amber-400 text-black border-amber-300 ring-2 ring-amber-300 shadow-amber-400/30'
          : 'bg-white/[0.08] text-slate-200 border-white/20 hover:border-amber-400/50 hover:bg-white/[0.12]'
      }`}
    >
      {isAccessibleMode ? (
        <Eye className="w-4 h-4 text-black animate-pulse" />
      ) : (
        <EyeOff className="w-4 h-4 text-amber-400" />
      )}
      <span>
        {isAccessibleMode
          ? 'Accessibility Mode: ON (High Contrast + TTS)'
          : 'For Visually Impaired'}
      </span>
      {isAccessibleMode && (
        <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
      )}
    </motion.button>
  );
}
