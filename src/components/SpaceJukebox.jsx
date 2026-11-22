import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  FastForward
} from 'lucide-react';
import AuroraVisualizer from './AuroraVisualizer';
import sonifier from '../utils/sonify';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceDot,
  ReferenceLine
} from 'recharts';

// 5 Minimal Icons requested
const DATASET_ICONS = [
  { id: 'temperature', icon: '🌡️', label: 'Temperature' },
  { id: 'co2', icon: '💨', label: 'CO₂ Carbon' },
  { id: 'seaLevel', icon: '🌊', label: 'Sea Level' },
  { id: 'iceMelt', icon: '🧊', label: 'Ice Sheets' },
  { id: 'forestLoss', icon: '🌲', label: 'Canopy' }
];

export default function SpaceJukebox({
  isPlaying,
  onTogglePlay,
  currentYear,
  onYearChange,
  playbackSpeed,
  onChangeSpeed,
  selectedDataset,
  currentDataPoint,
  allData,
  onSelectDataset
}) {
  const currentValue = currentDataPoint ? currentDataPoint[selectedDataset.id] : null;
  const color = selectedDataset.color || '#38bdf8';

  return (
    <section id="jukebox-console" className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-panel-glow p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6 text-xs font-mono text-cyan-300">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
            <span className="font-bold tracking-widest uppercase">NASA MISSION CONTROL DASHBOARD</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChangeSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center gap-1"
            >
              <FastForward className="w-3 h-3" />
              <span>{playbackSpeed}x</span>
            </button>
            <span className="hidden sm:inline text-slate-400">TELEMETRY: 1980 - 2026</span>
          </div>
        </div>

        {/* Center Grid: Rotating Real Earth & Control Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center: REAL EARTH ROTATING with ORBITING SATELLITE & 5 ICONS */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-6">
            
            {/* Outer Orbit Ring with 5 minimal icons */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              
              {/* Outer Orbit Path Border */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 pointer-events-none"></div>

              {/* 5 Minimal Icons placed around orbit */}
              <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                {DATASET_ICONS.map((item, idx) => {
                  const isSelected = selectedDataset.id === item.id;
                  // Calculate angle around circle
                  const angle = (idx / DATASET_ICONS.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 135; // px from center
                  const x = Math.round(Math.cos(angle) * radius);
                  const y = Math.round(Math.sin(angle) * radius);

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectDataset(item.id)}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className={`absolute left-1/2 top-1/2 -ml-5 -mt-5 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 pointer-events-auto cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-400 text-black shadow-[0_0_25px_#22d3ee] scale-125 ring-2 ring-white z-30'
                          : 'bg-black/80 border border-white/20 text-white hover:scale-110 hover:border-cyan-400 z-20'
                      }`}
                      title={item.label}
                    >
                      <span>{item.icon}</span>
                    </button>
                  );
                })}
              </div>

              {/* Real Rotating Earth Disc */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.5)] border-2 border-cyan-400/60 z-10">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 4,
                    ease: "linear"
                  }}
                  className="w-full h-full bg-cover bg-center rounded-full"
                  style={{
                    backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/800px-Earth_Eastern_Hemisphere.jpg')`,
                    backgroundSize: 'cover'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-cyan-400/30 pointer-events-none"></div>
              </div>

              {/* Orbiting Satellite (🛰️) around Earth */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-satellite">
                  <span className="text-2xl drop-shadow-[0_0_10px_#38bdf8]">🛰️</span>
                </div>
              </div>

            </div>

            {/* Current Active Channel Pill */}
            <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
              <span className="text-slate-300">{selectedDataset.name}:</span>
              <strong className="text-white text-sm">{currentValue} {selectedDataset.unit}</strong>
            </div>

          </div>

          {/* Right Column: BIG YEAR + ROCKET LAUNCH BUTTON + YEAR SLIDER */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start justify-center space-y-6">
            
            {/* BIG BOLD YEAR (No long sentences!) */}
            <div className="text-center lg:text-left">
              <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-1">
                TELEMETRY YEAR
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentYear}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-7xl sm:text-8xl md:text-9xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)] tracking-tighter"
                >
                  {currentYear}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ROCKET LAUNCH PLAY BUTTON */}
            <div className="w-full flex items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onTogglePlay}
                className={`btn-rocket-launch px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-black text-lg sm:text-xl tracking-wider font-heading uppercase flex items-center gap-3 border-2 border-white/40 shadow-2xl cursor-pointer ${
                  isPlaying
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500'
                    : 'bg-gradient-to-r from-red-600 via-rose-500 to-orange-500'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6 fill-white" />
                    <span>PAUSE SOUND</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6" />
                    <span>LAUNCH SOUND</span>
                  </>
                )}
              </motion.button>

              <button
                onClick={() => onYearChange(1980)}
                className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition border border-white/15"
                title="Reset to 1980"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Year Slider 1980 - 2026 */}
            <div className="w-full space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>1980</span>
                <span className="text-cyan-300 font-bold">Year {currentYear}</span>
                <span>2026</span>
              </div>
              <input
                type="range"
                min="1980"
                max="2026"
                value={currentYear}
                onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #10b981 ${
                    ((currentYear - 1980) / (2026 - 1980)) * 100
                  }%, #1e293b ${((currentYear - 1980) / (2026 - 1980)) * 100}%, #1e293b 100%)`
                }}
              />
            </div>

          </div>

        </div>

        {/* SOUND VISUALIZER: AURORA WAVES */}
        <div className="mt-8">
          <AuroraVisualizer isPlaying={isPlaying} selectedDataset={selectedDataset} />
        </div>

        {/* MINIMAL GLOWING RECHARTS LINE CHART */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="w-full h-44 sm:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={allData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="spaceChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  stroke="#475569"
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                  ticks={[1980, 1990, 2000, 2010, 2020, 2026]}
                />
                <YAxis
                  stroke="#475569"
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                  domain={['auto', 'auto']}
                />
                <Area
                  type="monotone"
                  dataKey={selectedDataset.id}
                  stroke={color}
                  strokeWidth={2.5}
                  fill="url(#spaceChartGrad)"
                  isAnimationActive={false}
                />
                <ReferenceLine x={currentYear} stroke="#67e8f9" strokeDasharray="3 3" />
                {currentValue !== null && (
                  <ReferenceDot
                    x={currentYear}
                    y={currentValue}
                    r={6}
                    fill="#ffffff"
                    stroke={color}
                    strokeWidth={3}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. MINIMAL IMPACT: 3 SMALL PILLS ONLY */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10 text-xs font-mono">
          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 flex items-center gap-2 text-slate-300">
            <span>♿</span>
            <strong className="text-white">For Blind</strong>
            <span className="text-[10px] text-slate-400">• Multi-sensory</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 flex items-center gap-2 text-slate-300">
            <span>🎓</span>
            <strong className="text-white">For Students</strong>
            <span className="text-[10px] text-slate-400">• STEM Audio</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 flex items-center gap-2 text-slate-300">
            <span>🚀</span>
            <strong className="text-white">For Mars</strong>
            <span className="text-[10px] text-slate-400">• Works Offline</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
