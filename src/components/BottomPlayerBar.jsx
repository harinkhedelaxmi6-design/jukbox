import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';
import CanvasAuroraVisualizer from './CanvasAuroraVisualizer';

export default function BottomPlayerBar({
  isPlaying,
  onTogglePlay,
  currentYear,
  onYearChange,
  activeCategory,
  activeHotspot,
  displayNarrative,
  volume,
  onChangeVolume,
  isAudioUnlocked,
  onUnlockAudio
}) {
  const currentCategoryKey = activeCategory?.id || 'climate';

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#030713]/95 backdrop-blur-2xl border-t border-[#00D9FF]/40 shadow-[0_-10px_50px_rgba(0,0,0,0.85)] px-4 sm:px-8 py-3">
      {/* If Audio is not yet unlocked, show Click to Start Audio prompt banner */}
      {!isAudioUnlocked && (
        <div className="max-w-7xl mx-auto mb-2 flex items-center justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-950 via-blue-900 to-indigo-950 border border-[#00D9FF]/50 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00D9FF]">
            <Sparkles className="w-4 h-4 text-[#00D9FF] animate-spin" />
            <span className="font-bold">NASA Tone.js Sound System Ready (AudioContext Standby)</span>
          </div>
          <button
            onClick={onUnlockAudio}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-400 to-[#00D9FF] hover:scale-105 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-[#00D9FF]/40 cursor-pointer transition"
          >
            Click to Start Audio 🔊
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        
        {/* LEFT: Play/Pause button + Year slider 1980-2026 (drag = sound changes live) */}
        <div className="md:col-span-5 flex items-center gap-4">
          
          {/* Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className={`px-5 py-2.5 rounded-full font-extrabold text-xs font-heading uppercase tracking-wider flex items-center gap-2 border transition-all duration-300 shadow-xl cursor-pointer shrink-0 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-300 ring-2 ring-amber-300'
                : 'bg-gradient-to-r from-emerald-500 to-[#00D9FF] hover:scale-105 text-black border-white/40 ring-2 ring-[#00D9FF] shadow-[#00D9FF]/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-black" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black ml-0.5" />
                <span>Play Earth Sound</span>
              </>
            )}
          </button>

          {/* Year slider 1980-2026 */}
          <div className="flex-1 flex flex-col justify-center gap-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>1980</span>
              <span className="text-[#00D9FF] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10">
                Year {currentYear}
              </span>
              <span>2026</span>
            </div>

            <input
              type="range"
              min="1980"
              max="2026"
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
              style={{
                background: `linear-gradient(to right, #00D9FF 0%, #10b981 ${
                  ((currentYear - 1980) / (2026 - 1980)) * 100
                }%, #1e293b ${((currentYear - 1980) / (2026 - 1980)) * 100}%, #1e293b 100%)`
              }}
            />
          </div>

        </div>

        {/* CENTER: Visualizer canvas - Aurora wave that dances with frequency */}
        <div className="md:col-span-3 flex items-center justify-center">
          <CanvasAuroraVisualizer
            isPlaying={isPlaying}
            categoryId={currentCategoryKey}
            customColor={activeHotspot?.color}
          />
        </div>

        {/* RIGHT: Text display dynamic */}
        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3 pl-2">
          
          <div className="flex flex-col text-left font-mono overflow-hidden">
            <span className="text-[9px] uppercase tracking-widest text-[#00D9FF] font-bold">
              TONE.JS SONIFICATION TELEMETRY
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={displayNarrative}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="text-xs sm:text-[13px] font-bold text-white leading-tight truncate max-w-[280px] sm:max-w-[340px]"
                title={displayNarrative}
              >
                {displayNarrative}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-2 border-l border-white/10">
            <Volume2 className="w-3.5 h-3.5 text-[#00D9FF]" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => onChangeVolume(parseInt(e.target.value, 10))}
              className="w-16 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D9FF]"
              title={`Volume: ${volume}%`}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
