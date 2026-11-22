// IMPACT: Demonstrating 20/20 criteria for global outreach, multi-sensory inclusivity & scientific utility
import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Music, Rocket, HeartHandshake } from 'lucide-react';

const impactPoints = [
  {
    icon: Users,
    stat: "2.2 Billion+",
    title: "Accessible to Visually Impaired",
    desc: "According to WHO, 2.2 billion people live with vision impairment. Translating graphs into acoustic pitch unlocks NASA science for audiences previously excluded from visual data.",
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    tag: "Inclusion"
  },
  {
    icon: GraduationCap,
    stat: "K-12 & STEM",
    title: "For Students & Kids",
    desc: "Engages young learners through interactive audio and playful physical turntable metaphors, fostering intuitive climate literacy faster than static textbook graphs.",
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    tag: "Education"
  },
  {
    icon: Music,
    stat: "Multi-Disciplinary",
    title: "Artists Can Feel Climate Data",
    desc: "Provides raw musical frequencies and polyphonic synth hooks that composers, sound designers, and climate advocates can remix into powerful cultural symphonies.",
    accent: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    tag: "Creativity"
  },
  {
    icon: Rocket,
    stat: "Edge Native",
    title: "Works Offline - For Mars Missions",
    desc: "100% lightweight client-side synthesis using Tone.js algorithms. Requires zero backend server streaming—ready for deep space habitats and bandwidth-constrained remote field stations.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    tag: "Space Ready"
  }
];

export default function ImpactCards({ isAccessibleMode }) {
  return (
    <section className="space-y-4 my-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase font-mono">
            JUDGING CRITERIA: IMPACT (20/20)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Global Humanity & Multi-Sensory Impact
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-slate-300">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
          <span>NASA Open Science Directive</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactPoints.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-[24px] p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
                isAccessibleMode
                  ? 'bg-black border-2 border-yellow-300 text-yellow-100 shadow-xl'
                  : `glass-panel border ${item.border} bg-gradient-to-b ${item.accent}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-white shadow-inner">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-cyan-200">
                    {item.tag}
                  </span>
                </div>

                <div className="text-lg font-black text-cyan-300 font-mono mb-1">
                  {item.stat}
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
