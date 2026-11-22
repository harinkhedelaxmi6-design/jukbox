// PRESENTATION: Cinematic NASA Telemetry Initialization Screen
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState("Calibrating NASA GISTEMP telemetry...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(50);
      setStatusText("Synthesizing multi-harmonic audio algorithms...");
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStatusText("Spinning vinyl planetary coordinates...");
    }, 800);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText("Earth Information Jukebox Ready.");
    }, 1200);

    const timerEnd = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerEnd);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#050A14] flex flex-col items-center justify-center p-6 text-center select-none"
    >
      {/* Background Star Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm space-y-6">
        {/* Animated Earth Orbit Graphic */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Orbit rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-cyan-500/20"
          ></motion.div>

          {/* Central Glowing Earth Sphere */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 via-cyan-500 to-emerald-400 shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center justify-center text-3xl">
            🌍
          </div>

          {/* Satellite orbiter */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-start justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9] -mt-1.5"></div>
          </motion.div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-cyan-400 uppercase font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
            NASA Space Apps Challenge
          </div>
          <h2 className="text-2xl font-black text-white font-heading tracking-tight">
            Initializing Earth Jukebox...
          </h2>
          <p className="text-xs text-slate-400 font-mono h-4">
            {statusText}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
