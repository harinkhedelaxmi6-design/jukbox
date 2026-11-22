import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, PlayCircle, Headphones, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Globe2,
    badge: "Step 01",
    title: "Choose Story",
    desc: "Pick from 5 critical NASA Earth vitals: Temperature, CO₂, Sea Level, Ice, or Canopy.",
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    textAccent: "text-cyan-400"
  },
  {
    icon: PlayCircle,
    badge: "Step 02",
    title: "Press PLAY",
    desc: "Initiate time-travel from 1980 to 2026. Watch the vinyl spin as Earth observation streams.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    textAccent: "text-emerald-400"
  },
  {
    icon: Headphones,
    badge: "Step 03",
    title: "Hear Change",
    desc: "Listen as data pitch & cadence shift in real-time. Higher pitch signals escalating anomalies.",
    accent: "from-indigo-500/20 to-purple-500/10",
    border: "border-indigo-500/30",
    textAccent: "text-indigo-400"
  }
];

export default function HeroGuide() {
  return (
    <section className="relative overflow-hidden pt-4 pb-2">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wider text-cyan-300 uppercase shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          NASA Space Apps Challenge • Earth Information Center
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-heading">
          Hear Our Planet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_35px_rgba(45,212,191,0.35)]">Breathe</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          The Earth Information Jukebox turns 46 years of NASA satellite telemetry into immersive soundscapes. Experience climate shifts through pitch, tempo, and rhythm.
        </p>
      </motion.div>

      {/* 3-Step Guide Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative glass-panel p-6 border ${step.border} bg-gradient-to-b ${step.accent} group cursor-default`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 ${step.textAccent}`}>
                  {step.badge}
                </span>
                <div className="p-2.5 rounded-xl bg-white/10 text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
