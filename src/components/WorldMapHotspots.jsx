import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Volume2, Shield, Radio, Flame, AlertCircle } from 'lucide-react';
import { MAP_FILTERS, HOTSPOTS_DATA } from '../data/categoriesAndHotspots';
import AuroraVisualizer from './AuroraVisualizer';
import planetaryAudio from '../utils/sonify';

export default function WorldMapHotspots({
  activeFilter,
  onSelectFilter,
  onSelectHotspot,
  liveEvent
}) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Filter hotspots
  const filteredHotspots = HOTSPOTS_DATA.filter((spot) => {
    if (activeFilter === 'All') return true;
    return spot.category.includes(activeFilter);
  });

  const sahara = HOTSPOTS_DATA.find((h) => h.id === 'sahara') || { x: 495, y: 215 };

  const handleHotspotClick = async (spot) => {
    setSelectedHotspot(spot);
    setIsZoomed(true);

    if (onSelectHotspot) {
      onSelectHotspot(spot);
    }

    // Play unique Tone.js sound
    await planetaryAudio.playHotspotSound(spot.id);
  };

  const handleLiveEventClick = async () => {
    const liveSpot = {
      id: 'live-nasa-event',
      name: liveEvent.title,
      icon: '🔥',
      acousticPitch: '880 Hz High-Frequency Disaster Siren',
      metric: 'NASA EONET Real-Time Satellite Detection',
      color: '#ef4444'
    };
    setSelectedHotspot(liveSpot);
    setIsZoomed(true);
    if (onSelectHotspot) {
      onSelectHotspot(liveSpot);
    }
    await planetaryAudio.playCategorySound('disaster', 2024);
  };

  return (
    <section id="world-map-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-36">
      
      {/* Title & NASA Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-[#00D9FF]/40 text-xs font-mono font-bold text-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.25)]">
          <Radio className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
          <span>NASA MISSION CONTROL • PLANETARY TELEMETRY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight">
          🌍 6 Stories. 8 Hotspots. 1 Planet.
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-light">
          Select a category to explore detailed environmental data, visualizations, and educational insights about regions around the world.
        </p>
      </div>

      {/* Filter Pills Top: Active = glow + blue background */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
        {MAP_FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onSelectFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
                isActive
                  ? 'bg-[#00D9FF] text-black border-white shadow-[0_0_25px_#00D9FF] scale-105 ring-2 ring-[#00D9FF]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-[#00D9FF]/50'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* NASA Mission Control Map Chassis */}
      <div className="relative space-panel-glow p-4 sm:p-8 rounded-[32px] overflow-hidden border border-[#00D9FF]/40 shadow-[0_0_50px_rgba(0,217,255,0.18)]">
        
        {/* Chassis Status Header Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#00D9FF] mb-4 px-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-ping" />
            <span className="font-bold tracking-wider uppercase">GLOBAL SATELLITE RADAR PROJECTION (1000 × 500)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:inline">CENTRAL HUB: SAHARA DUST TRANSIT</span>
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-[11px] px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition cursor-pointer"
            >
              {isZoomed ? 'RESET ZOOM' : 'ZOOM VIEW'}
            </button>
          </div>
        </div>

        {/* Outer Viewport Canvas with slight interactive zoom */}
        <motion.div
          animate={{ scale: isZoomed ? 1.03 : 1.0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full aspect-[2/1] min-h-[360px] max-h-[580px] bg-[#020713] rounded-2xl overflow-hidden border border-[#00D9FF]/30 flex items-center justify-center select-none"
        >
          {/* MAP BACKGROUND LAYER 1: Subtle Earth space texture overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')`
            }}
          />

          {/* MAP BACKGROUND LAYER 2: NASA Mission Control Coordinate Grid */}
          <svg
            className="w-full h-full absolute inset-0 pointer-events-none"
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Blue Neon Glow Filter for Continent Outlines */}
              <filter id="neonBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur1" />
                <feGaussianBlur stdDeviation="7" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Latitude / Longitude lines with labels */}
            <g stroke="#0e2a47" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6">
              <line x1="0" y1="62" x2="1000" y2="62" />
              <line x1="0" y1="125" x2="1000" y2="125" />
              <line x1="0" y1="187" x2="1000" y2="187" />
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#00D9FF" strokeWidth="1.2" strokeOpacity="0.4" />
              <line x1="0" y1="312" x2="1000" y2="312" />
              <line x1="0" y1="375" x2="1000" y2="375" />
              <line x1="0" y1="437" x2="1000" y2="437" />

              <line x1="166" y1="0" x2="166" y2="500" />
              <line x1="333" y1="0" x2="333" y2="500" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#00D9FF" strokeWidth="1.2" strokeOpacity="0.4" />
              <line x1="666" y1="0" x2="666" y2="500" />
              <line x1="833" y1="0" x2="833" y2="500" />
            </g>

            {/* Coordinate Markers */}
            <text x="10" y="246" fill="#00D9FF" fontSize="9" fontFamily="monospace" opacity="0.6">EQUATOR 0°</text>
            <text x="10" y="60" fill="#64748b" fontSize="8" fontFamily="monospace">75°N</text>
            <text x="10" y="435" fill="#64748b" fontSize="8" fontFamily="monospace">75°S</text>
            <text x="505" y="18" fill="#00D9FF" fontSize="9" fontFamily="monospace" opacity="0.6">PRIME MERIDIAN 0°</text>

            {/* REALISTIC CONTINENTS OUTLINE GLOWING BLUE (#00D9FF) */}
            <g
              stroke="#00D9FF"
              strokeWidth="1.6"
              fill="#031d3d"
              fillOpacity="0.65"
              filter="url(#neonBlueGlow)"
            >
              {/* North America */}
              <path d="M 60,65 C 90,45 130,55 180,60 C 230,65 260,80 280,105 C 295,120 280,140 250,150 C 230,165 235,185 240,205 C 235,215 220,225 210,230 C 190,255 170,240 160,210 C 145,190 125,175 110,145 C 90,130 65,115 55,95 Z" />
              {/* Greenland */}
              <path d="M 365,40 C 390,30 425,32 445,45 C 455,65 440,85 415,92 C 390,95 370,80 365,60 Z" />
              {/* Central America bridge */}
              <path d="M 210,230 Q 230,245 250,265 Q 260,270 270,275" fill="none" strokeWidth="2.5" />
              {/* South America */}
              <path d="M 270,275 C 310,270 360,280 375,310 C 390,340 370,375 350,405 C 335,435 320,450 310,460 C 295,455 290,430 285,395 C 275,360 260,330 255,305 C 255,290 265,280 270,275 Z" />
              {/* Europe & Scandinavia */}
              <path d="M 470,70 C 495,55 520,60 535,80 C 555,75 570,95 565,115 C 555,135 530,145 505,150 C 485,155 465,145 460,125 C 455,105 455,85 470,70 Z" />
              <path d="M 445,95 C 455,88 460,95 455,108 C 450,118 440,112 445,95 Z" />
              {/* Africa */}
              <path d="M 465,165 C 510,160 565,162 590,190 C 615,220 625,255 605,285 C 585,325 560,370 530,390 C 510,385 495,350 485,315 C 475,275 450,245 440,210 C 445,185 455,170 465,165 Z" />
              <path d="M 620,320 C 628,310 635,325 630,350 C 622,360 618,340 620,320 Z" />
              {/* Asia & Eurasia */}
              <path d="M 570,75 C 630,60 720,55 810,65 C 880,75 920,105 910,140 C 895,170 860,190 840,215 C 810,230 770,240 740,250 C 720,270 700,285 680,265 C 665,245 680,225 675,205 C 660,195 625,185 600,175 C 580,165 565,135 570,105 Z" />
              {/* India */}
              <path d="M 680,205 C 715,215 735,235 725,265 C 710,285 690,265 680,235 Z" />
              {/* Indonesia */}
              <path d="M 765,265 C 795,270 820,280 810,310 C 790,325 760,315 750,290 Z" />
              <path d="M 825,285 C 850,280 875,300 860,320 C 840,325 825,305 825,285 Z" />
              {/* Australia */}
              <path d="M 805,345 C 845,335 885,340 900,370 C 910,405 880,435 845,430 C 815,420 795,385 805,345 Z" />
              <path d="M 915,410 C 925,405 930,420 920,435 C 910,440 910,420 915,410 Z" />
              {/* Antarctica */}
              <path d="M 150,470 C 250,455 400,450 500,455 C 650,448 800,455 920,470 C 860,495 650,498 480,496 C 300,498 180,492 150,470 Z" />
            </g>

            {/* DASHED CONNECTING LINES FROM SAHARA TO OTHER 7 HOTSPOTS */}
            {filteredHotspots
              .filter((h) => h.id !== 'sahara')
              .map((target) => {
                const pathId = `beamPath-${target.id}`;
                const pathD = `M ${sahara.x} ${sahara.y} L ${target.x} ${target.y}`;

                return (
                  <g key={`dataLine-${target.id}`}>
                    <path
                      id={pathId}
                      d={pathD}
                      stroke="#00D9FF"
                      strokeWidth="1.4"
                      strokeDasharray="5 5"
                      strokeOpacity="0.5"
                    />
                    {/* MOVING WHITE DOT TRAVELING ALONG LINE */}
                    <circle r="3.5" fill="#ffffff" filter="drop-shadow(0 0 6px #00D9FF)">
                      <animateMotion
                        dur="2.4s"
                        repeatCount="indefinite"
                        path={pathD}
                      />
                    </circle>
                  </g>
                );
              })}

            {/* Sahara Central Sonar Pulse Ring */}
            <circle
              cx={sahara.x}
              cy={sahara.y}
              r="22"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.8"
              className="animate-spin"
              style={{ animationDuration: '8s' }}
            />
          </svg>

          {/* 8 HOTSPOT LOCATIONS: Yellow Center + 3 Pulsing Blue Rings */}
          {filteredHotspots.map((spot) => {
            const isSelected = selectedHotspot?.id === spot.id;

            return (
              <div
                key={spot.id}
                style={{
                  left: `${(spot.x / 1000) * 100}%`,
                  top: `${(spot.y / 500) * 100}%`
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                onClick={() => handleHotspotClick(spot)}
                onMouseEnter={() => setHoveredHotspot(spot)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* 3 Pulsing Blue Rings (Sonar Animation) */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="sonar-ring sonar-ring-1" />
                  <span className="sonar-ring sonar-ring-2" />
                  <span className="sonar-ring sonar-ring-3" />

                  {/* Yellow Center Dot */}
                  <div
                    className={`relative z-10 w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-white shadow-[0_0_12px_#facc15] transition-transform ${
                      isSelected ? 'scale-150 ring-2 ring-[#00D9FF]' : 'group-hover:scale-130'
                    }`}
                  />
                </div>

                {/* HOVER TOOLTIP CARD WITH GLASSMORPHISM */}
                <AnimatePresence>
                  {hoveredHotspot?.id === spot.id && !selectedHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 px-4 py-2.5 rounded-2xl bg-[#030917]/90 border border-[#00D9FF]/60 text-xs font-mono text-white shadow-[0_10px_35px_rgba(0,217,255,0.4)] backdrop-blur-xl whitespace-nowrap pointer-events-none"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{spot.icon}</span>
                        <span className="font-bold text-yellow-300">{spot.tooltip}</span>
                      </div>
                      <div className="absolute top-full -mt-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#030917] border-r border-b border-[#00D9FF]/60 transform rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* 1. LIVE FROM NASA: RED BLINKING DOT WITH FASTER PULSE */}
          {liveEvent && (
            <div
              style={{
                left: `${(liveEvent.x / 1000) * 100}%`,
                top: `${(liveEvent.y / 500) * 100}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer group"
              onClick={handleLiveEventClick}
            >
              {/* Faster Red Pulse Rings */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="pulsing-red-fast absolute inset-0 rounded-full bg-red-600/40" />
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-[0_0_20px_#ef4444] animate-ping" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-yellow-300 border border-white z-10" />
              </div>

              {/* Exact requested label: "LIVE: Wildfire in California - Detected 2h ago by NASA" */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3.5 py-1.5 rounded-xl bg-red-950/90 border-2 border-red-500 text-[11px] font-mono font-bold text-white shadow-[0_0_25px_rgba(239,68,68,0.7)] whitespace-nowrap backdrop-blur-xl flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                <span>{liveEvent.title}</span>
              </div>
            </div>
          )}

        </motion.div>

        {/* CLICK POPUP: TITLE ONLY + TONE.JS ACOUSTIC STORY + AURORA WAVE VISUALIZER */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#030917]/95 border-2 border-[#00D9FF] shadow-[0_0_50px_rgba(0,217,255,0.35)] relative"
            >
              <button
                onClick={() => {
                  setSelectedHotspot(null);
                  setIsZoomed(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#00D9FF] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D9FF] animate-spin" />
                    <span>NASA ACTIVE HOTSPOT SONIFICATION</span>
                  </div>
                  {/* TITLE ONLY */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-0.5">
                    {selectedHotspot.icon} {selectedHotspot.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#00D9FF] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>{selectedHotspot.acousticPitch}</span>
                  </div>
                  <span className="text-xs px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono">
                    {selectedHotspot.metric}
                  </span>
                </div>
              </div>

              {/* INTEGRATED AURORA WAVE VISUALIZER */}
              <div className="mt-3">
                <AuroraVisualizer
                  isPlaying={true}
                  selectedDataset={{ color: selectedHotspot.color }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
