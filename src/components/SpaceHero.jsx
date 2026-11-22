import React from 'react';
import { motion } from 'framer-motion';
import { Play, Rocket, Sparkles } from 'lucide-react';

export default function SpaceHero({ onLaunch, isPlaying }) {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-between py-8 px-4 sm:px-6">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Minimal Title + 1 Subtitle + 1 Launch Button */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-xs font-mono font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NASA SPACE APPS CHALLENGE 2026</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white font-heading leading-none">
            Hear Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_40px_rgba(45,212,191,0.5)]">
              Planet Breathe
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 font-light tracking-wide">
            NASA Earth data as music.
          </p>

          {/* 1 Big Red Rocket Launch Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLaunch}
              className="btn-rocket-launch px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-orange-500 text-white font-black text-lg sm:text-xl tracking-wider font-heading uppercase flex items-center gap-3 border-2 border-white/40 shadow-2xl cursor-pointer"
            >
              <Rocket className="w-6 h-6 animate-bounce" />
              <span>{isPlaying ? 'SOUND ACTIVE • VIEW DECK' : 'LAUNCH SOUND'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Large 3D Earth from space with Floating Astronaut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 relative flex items-center justify-center"
        >
          {/* Earth Atmosphere Backlight */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none"></div>

          {/* Large 3D-like Rotating Earth Sphere */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.4)] border-2 border-cyan-400/40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80')`,
                transform: 'scale(1.08)'
              }}
            />
            {/* Atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-cyan-400/30 pointer-events-none"></div>
          </div>

          {/* Floating Astronaut Animation near Earth */}
          <div className="absolute -top-4 -right-2 sm:right-6 sm:-top-6 z-20 pointer-events-none animate-float">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 p-2 rounded-full backdrop-blur-sm bg-black/20 border border-white/10 shadow-2xl flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"
                alt="Astronaut floating in space"
                className="w-full h-full object-cover rounded-full mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              />
              <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-[9px] font-mono text-cyan-300 border border-cyan-400/30">
                NASA EVA
              </span>
            </div>
          </div>

          {/* Small Moon / ISS Satellite orbiter */}
          <div className="absolute -bottom-4 -left-2 z-10 hidden sm:block">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20 shadow-lg opacity-80">
              <img
                src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=200&q=80"
                alt="Moon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
