import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc3, Radio, Orbit } from 'lucide-react';

export default function VisualFrame({
  isPlaying,
  currentYear,
  selectedDataset,
  currentDataPoint
}) {
  const value = currentDataPoint ? currentDataPoint[selectedDataset.id] : '--';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8">
      {/* Top Bar inside frame */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isPlaying ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            ></span>
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            {isPlaying ? 'Live Sonification Active' : 'Turntable Standby'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>NASA EIC Orbit</span>
        </div>
      </div>

      {/* Center: Vinyl Turntable with Earth Record */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Turntable Platter Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-all duration-700 opacity-40"
          style={{
            backgroundColor: selectedDataset.color || '#38bdf8',
            transform: isPlaying ? 'scale(1.15)' : 'scale(0.95)'
          }}
        ></div>

        {/* Outer Vinyl Record Disc */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-2 bg-[#090d16] border-4 border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
          
          {/* Rotating Vinyl Grooves Body */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 3,
              ease: "linear"
            }}
            className="relative w-full h-full rounded-full bg-[#0a0f1d] flex items-center justify-center shadow-inner overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(circle, transparent 35%, rgba(255,255,255,0.03) 36%, transparent 37%),
                radial-gradient(circle, transparent 45%, rgba(255,255,255,0.04) 46%, transparent 47%),
                radial-gradient(circle, transparent 55%, rgba(255,255,255,0.03) 56%, transparent 57%),
                radial-gradient(circle, transparent 65%, rgba(255,255,255,0.04) 66%, transparent 67%),
                radial-gradient(circle, transparent 75%, rgba(255,255,255,0.03) 76%, transparent 77%),
                radial-gradient(circle, transparent 85%, rgba(255,255,255,0.04) 86%, transparent 87%)
              `
            }}
          >
            {/* Glossy vinyl light reflections */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none transform rotate-45"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.04] to-transparent pointer-events-none transform -rotate-45"></div>

            {/* Center Earth Vinyl Label */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-slate-700/80 shadow-2xl flex items-center justify-center bg-sky-950">
              {/* Realistic Earth Graphic Layers */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-full opacity-90 transition-transform duration-1000"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80')`,
                  backgroundSize: 'cover'
                }}
              ></div>

              {/* Atmospheric Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 via-transparent to-cyan-400/30 mix-blend-overlay"></div>

              {/* Vintage EIC Center Record Badge */}
              <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#050A14]/85 backdrop-blur-sm border border-cyan-400/40 flex flex-col items-center justify-center text-center p-1 shadow-lg">
                <span className="text-[7px] tracking-widest text-cyan-300 font-bold uppercase">NASA EIC</span>
                <Disc3 className="w-4 h-4 text-cyan-400 my-0.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-[6px] text-slate-400">33⅓ RPM</span>
                {/* Center spindle hole */}
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-600 shadow-inner mt-0.5"></div>
              </div>
            </div>
          </motion.div>

          {/* Tonearm / Stylus */}
          <div className="absolute top-2 -right-4 w-20 h-40 pointer-events-none hidden sm:block">
            {/* Tonearm Base */}
            <div className="absolute top-0 right-2 w-7 h-7 rounded-full bg-slate-700 border-2 border-slate-500 shadow-md"></div>
            {/* Arm Bar with smooth rotation */}
            <motion.div
              animate={{ rotate: isPlaying ? 24 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="origin-top-right w-1.5 h-32 bg-gradient-to-b from-slate-400 to-slate-200 shadow absolute top-3 right-5 rounded-full"
            >
              {/* Cartridge & Needle head */}
              <div className="absolute -bottom-2 -left-2 w-5 h-6 bg-slate-900 border border-cyan-400/50 rounded-sm shadow-md flex items-center justify-center">
                <div className="w-1 h-2 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Display: Big Year Number with Count-Up Style Transition */}
      <div className="w-full mt-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs uppercase font-medium tracking-widest text-slate-400 mb-1">
            Timeline Observation Year
          </span>

          <div className="relative inline-flex items-center justify-center overflow-hidden h-16 sm:h-20">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentYear}
                initial={{ y: 28, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -28, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
              >
                {currentYear}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Current Observation Value Badge */}
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-lg backdrop-blur">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: selectedDataset.color }}
            ></span>
            <span className="text-xs font-medium text-slate-300">
              {selectedDataset.name}:
            </span>
            <span className="text-xs font-bold text-white">
              {value} {selectedDataset.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
