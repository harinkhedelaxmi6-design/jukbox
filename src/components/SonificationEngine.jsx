import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward, Activity } from 'lucide-react';
import sonifier from '../utils/sonify';

export default function SonificationEngine({
  isPlaying,
  onTogglePlay,
  currentYear,
  onYearChange,
  playbackSpeed,
  onChangeSpeed,
  selectedDataset,
  currentDataPoint
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerHeights, setVisualizerHeights] = useState(() =>
    Array.from({ length: 20 }, () => 15)
  );

  // Update visualizer bars dynamically when playing
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        // Base height on dataset value magnitude
        setVisualizerHeights(
          Array.from({ length: 20 }, (_, idx) => {
            const variance = Math.sin(Date.now() / 150 + idx) * 30 + 50;
            const randomJitter = Math.random() * 40;
            return Math.max(12, Math.min(100, Math.round(variance + randomJitter)));
          })
        );
      }, 90);
    } else {
      setVisualizerHeights(Array.from({ length: 20 }, () => 14));
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, selectedDataset]);

  const handleToggleMute = () => {
    const nextMute = sonifier.toggleMute();
    setIsMuted(nextMute);
  };

  const handleReset = () => {
    onYearChange(1980);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8">
      {/* Top Controls: Sound Status & Volume */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold font-heading">
            Tone.js Sonification Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Playback speed multiplier */}
          <button
            onClick={() => onChangeSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold glass-pill text-cyan-300 hover:text-white flex items-center gap-1"
            title="Cycle Playback Speed"
          >
            <FastForward className="w-3 h-3" />
            <span>{playbackSpeed}x</span>
          </button>

          {/* Mute toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white hover:border-cyan-400/50 transition"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Middle: Sound Visualizer 20-Bars */}
      <div className="my-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Acoustic Spectrum Synthesizer
          </span>
          <span className="font-mono text-cyan-300">
            {isPlaying ? 'ACTIVE FREQUENCY' : 'STANDBY'}
          </span>
        </div>

        <div className="h-24 w-full flex items-end justify-between gap-1 sm:gap-1.5 px-3 py-2 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
          {visualizerHeights.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full relative overflow-hidden"
              style={{
                height: `${h}%`,
                background: isPlaying
                  ? `linear-gradient(to top, #06b6d4 0%, ${selectedDataset.color || '#3b82f6'} 70%, #ec4899 100%)`
                  : 'rgba(255, 255, 255, 0.12)',
                boxShadow: isPlaying
                  ? `0 0 10px ${selectedDataset.color || '#06b6d4'}80`
                  : 'none',
                transition: 'height 90ms ease-out'
              }}
            >
              {/* Subtle bar tip glow */}
              {isPlaying && (
                <div className="w-full h-1.5 bg-white/90 absolute top-0 rounded-full"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Year Slider 1980 - 2026 */}
      <div className="my-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400 font-mono">1980</span>
          <span className="text-cyan-300 font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Year {currentYear}
          </span>
          <span className="text-slate-400 font-mono">2026</span>
        </div>

        <div className="relative flex items-center">
          <input
            type="range"
            min="1980"
            max="2026"
            value={currentYear}
            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #10b981 ${
                ((currentYear - 1980) / (2026 - 1980)) * 100
              }%, #1e293b ${((currentYear - 1980) / (2026 - 1980)) * 100}%, #1e293b 100%)`
            }}
          />
        </div>
      </div>

      {/* Bottom Main Action: HUGE Pulsing Play Button */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {/* Reset button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="p-3.5 rounded-2xl glass-pill text-slate-400 hover:text-white border border-white/10 hover:border-cyan-400/40 transition shadow-lg"
          title="Restart from 1980"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>

        {/* HUGE Pulsing Play/Pause Button */}
        <div className="relative flex items-center justify-center">
          {isPlaying && (
            <>
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 blur-lg"
              ></motion.div>
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-cyan-400 blur-md"
              ></motion.div>
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={onTogglePlay}
            className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-[0_10px_35px_rgba(20,184,166,0.5)] flex items-center justify-center border-2 border-white/30 cursor-pointer"
            title={isPlaying ? "Pause sonification" : "Start sonification playback"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950 fill-slate-950" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950 fill-slate-950 ml-1" />
            )}
          </motion.button>
        </div>

        {/* Status pill indicator */}
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl glass-pill text-xs font-mono font-bold text-cyan-300 border border-white/10">
          {isPlaying ? 'PLAY' : 'PAUS'}
        </div>
      </div>
    </div>
  );
}
