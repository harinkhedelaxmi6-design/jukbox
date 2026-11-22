import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesAndHotspots';
import planetaryAudio from '../utils/sonify';

export default function CategoryCards({
  onSelectCategory,
  currentYear,
  currentDataPoint
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleCardClick = async (item) => {
    // 1. Play Tone.js category sonification sound
    await planetaryAudio.playCategorySound(
      item.id,
      currentYear
    );

    // 2. Filter map & scroll down
    onSelectCategory(item);
  };

  return (
    <section id="categories-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Minimal Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#00D9FF] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
            <span>NASA EARTH OBSERVATION ARCHIVE • CLICK CARD TO HEAR SOUND</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mt-1">
            Planetary Vital Signs
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-light max-w-md sm:text-right">
          Click any card to play synthesized sound & isolate regional telemetry.
        </p>
      </div>

      {/* 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES_DATA.map((item, idx) => {
          const isHovered = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`${item.title}. ${item.short}. ${item.full}. Press enter to play sonification sound.`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item);
                }
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(item)}
              className={`relative overflow-hidden rounded-[24px] p-6 border ${item.border} space-panel cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#00D9FF]`}
            >
              {/* Background NASA Image on hover (30% opacity) */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  opacity: isHovered ? 0.35 : 0.08
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-[#080f1e]/80 to-transparent pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-44">
                {/* Top Row: Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/10 backdrop-blur-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}25` }}
                  >
                    <span>{item.icon}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    <Volume2 className="w-3 h-3 text-emerald-400" />
                    <span>AUDIO CHANNEL</span>
                  </div>
                </div>

                {/* Center / Title + Short 2-3 words */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm font-semibold tracking-wide mt-1"
                    style={{ color: item.color }}
                  >
                    {item.short}
                  </p>
                </div>

                {/* Bottom Row: Explore arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                  <span className="text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                    <span>Listen & Explore</span>
                  </span>
                  <div className="flex items-center gap-1 text-[#00D9FF] group-hover:translate-x-1.5 transition-transform">
                    <span>Play</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Tooltip on Hover showing Full Text */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-xl bg-[#030917]/95 border border-[#00D9FF]/40 text-[11px] font-medium text-slate-200 shadow-2xl backdrop-blur-md pointer-events-none whitespace-normal max-w-xs text-center"
                  >
                    {item.full}
                    <div className="absolute top-full -mt-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#030917] border-r border-b border-[#00D9FF]/40 transform rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
