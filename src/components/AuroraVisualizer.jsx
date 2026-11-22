import React from 'react';
import { motion } from 'framer-motion';

export default function AuroraVisualizer({ isPlaying, selectedDataset, categoryId }) {
  // Color palette per content:
  // Climate=red, Oceans=blue, Forests=green, Atmosphere=grey, Disasters=orange fast, Satellites=white
  const categoryColors = {
    climate: { primary: '#ef4444', secondary: '#f87171', speed: 2.4 },
    ocean: { primary: '#3b82f6', secondary: '#60a5fa', speed: 3.2 },
    forest: { primary: '#22c55e', secondary: '#4ade80', speed: 3.6 },
    atmosphere: { primary: '#94a3b8', secondary: '#cbd5e1', speed: 4.0 },
    disaster: { primary: '#f97316', secondary: '#fb923c', speed: 1.4 }, // fast wave
    satellite: { primary: '#ffffff', secondary: '#c084fc', speed: 1.8 }  // white beep
  };

  const activeTheme = categoryColors[categoryId] || {
    primary: selectedDataset?.color || '#06b6d4',
    secondary: '#38bdf8',
    speed: 2.8
  };

  return (
    <div className="relative w-full h-16 sm:h-20 overflow-hidden rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center">
      {/* Background Aurora Ambient Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isPlaying ? 'opacity-70' : 'opacity-20'
        }`}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeTheme.primary}40 0%, transparent 70%)`
        }}
      />

      {/* SVG Northern Lights Sine Wave Ribbons */}
      <svg
        className="w-full h-full absolute inset-0 preserve-3d"
        viewBox="0 0 1000 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`auroraDynGrad-${categoryId || 'def'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={activeTheme.primary} stopOpacity="0.85" />
            <stop offset="50%" stopColor={activeTheme.secondary} stopOpacity="0.95" />
            <stop offset="100%" stopColor={activeTheme.primary} stopOpacity="0.85" />
          </linearGradient>
          <filter id="auroraGlowBlur">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Dancing Wave 1 */}
        <motion.path
          d="M0,60 C150,20 350,100 500,50 C650,0 850,90 1000,60"
          stroke={`url(#auroraDynGrad-${categoryId || 'def'})`}
          strokeWidth={isPlaying ? 6 : 2}
          fill="none"
          filter="url(#auroraGlowBlur)"
          animate={
            isPlaying
              ? {
                  d: [
                    "M0,60 C150,20 350,100 500,50 C650,0 850,90 1000,60",
                    "M0,40 C200,95 300,15 500,75 C700,110 800,25 1000,40",
                    "M0,75 C180,10 380,85 500,35 C680,15 820,95 1000,75",
                    "M0,60 C150,20 350,100 500,50 C650,0 850,90 1000,60"
                  ]
                }
              : {
                  d: "M0,60 C250,55 500,65 750,55 1000,60"
                }
          }
          transition={{
            duration: isPlaying ? activeTheme.speed : 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dancing Wave 2 (Harmonic) */}
        <motion.path
          d="M0,65 C200,100 350,25 500,70 C650,115 800,30 1000,65"
          stroke={activeTheme.secondary}
          strokeWidth={isPlaying ? 3.5 : 1.5}
          fill="none"
          filter="url(#auroraGlowBlur)"
          animate={
            isPlaying
              ? {
                  d: [
                    "M0,65 C200,100 350,25 500,70 C650,115 800,30 1000,65",
                    "M0,50 C180,15 380,95 500,30 C620,10 850,85 1000,50",
                    "M0,65 C200,100 350,25 500,70 C650,115 800,30 1000,65"
                  ]
                }
              : {
                  d: "M0,65 C250,60 500,70 750,60 1000,65"
                }
          }
          transition={{
            duration: isPlaying ? activeTheme.speed * 1.25 : 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Center Label */}
      <div className="relative z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] font-mono tracking-widest text-slate-200">
        <span
          className={`w-2 h-2 rounded-full ${isPlaying ? 'animate-ping' : ''}`}
          style={{ backgroundColor: activeTheme.primary }}
        />
        <span className="uppercase font-bold">
          {isPlaying ? 'AURORA WAVE HARMONICS ACTIVE' : 'AURORA WAVE STANDBY'}
        </span>
      </div>
    </div>
  );
}
