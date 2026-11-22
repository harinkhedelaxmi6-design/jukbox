import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Headphones, Waves, Info } from 'lucide-react';
import sonifier from '../utils/sonify';

export default function LiveExplainer({
  currentYear,
  selectedDataset,
  currentDataPoint,
  isPlaying
}) {
  const value = currentDataPoint ? currentDataPoint[selectedDataset.id] : 0;
  const info = sonifier.getSonificationInfo(selectedDataset.id, value, currentYear);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 sm:p-6 border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/30 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Indicator & Live explanation */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Waves className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Radio className="w-3 h-3 text-cyan-400" />
                Live Acoustic Interpretation
              </span>
              {isPlaying && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentYear}-${selectedDataset.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base text-slate-100 font-medium leading-snug"
              >
                <span className="text-cyan-300 font-bold">What you hear: </span>
                In <span className="font-mono text-white font-bold">{currentYear}</span>,{' '}
                {selectedDataset.name} is{' '}
                <span className="font-mono text-white font-bold">
                  {value} {selectedDataset.unit}
                </span>
                , so you hear{' '}
                <span className="font-mono text-cyan-300 font-bold">
                  {info.freq} Hz
                </span>{' '}
                — <span className="text-amber-300 font-semibold">{info.pitchCategory}</span>{' '}
                means <span className="text-slate-300 italic">{info.meaning}</span>.
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Audio spec pill */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Frequency</div>
            <div className="text-base font-bold font-mono text-cyan-300">{info.freq} Hz</div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Pitch Tier</div>
            <div className="text-xs font-bold text-white font-mono truncate max-w-[110px]">
              {info.pitchCategory}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
