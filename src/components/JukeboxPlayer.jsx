import React from 'react';
import { motion } from 'framer-motion';
import VisualFrame from './VisualFrame';
import SonificationEngine from './SonificationEngine';

export default function JukeboxPlayer({
  isPlaying,
  onTogglePlay,
  currentYear,
  onYearChange,
  playbackSpeed,
  onChangeSpeed,
  selectedDataset,
  currentDataPoint
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full glass-panel-glow overflow-hidden relative"
    >
      {/* Top subtle mission bar */}
      <div className="px-6 py-2.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>CONSOLE: EIC-AUDIO-SPEC-01</span>
        </div>
        <div className="hidden sm:block">
          NASA EARTH OBSERVING SYSTEM (EOS) • STEREO SONIFICATION
        </div>
        <div>
          FREQ RANGE: 130Hz - 784Hz
        </div>
      </div>

      {/* Main Jukebox 2-Column Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left Column: VisualFrame (Earth Vinyl & Large Year Counter) */}
        <div className="lg:col-span-5 flex flex-col justify-center bg-gradient-to-br from-black/40 to-transparent">
          <VisualFrame
            isPlaying={isPlaying}
            currentYear={currentYear}
            selectedDataset={selectedDataset}
            currentDataPoint={currentDataPoint}
          />
        </div>

        {/* Right Column: SonificationEngine (Pulsing Play Button, Visualizer, Year Slider) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-gradient-to-bl from-white/[0.02] to-transparent">
          <SonificationEngine
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            currentYear={currentYear}
            onYearChange={onYearChange}
            playbackSpeed={playbackSpeed}
            onChangeSpeed={onChangeSpeed}
            selectedDataset={selectedDataset}
            currentDataPoint={currentDataPoint}
          />
        </div>
      </div>
    </motion.div>
  );
}
