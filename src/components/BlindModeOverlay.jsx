import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Volume2, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA, HOTSPOTS_DATA } from '../data/categoriesAndHotspots';
import planetaryAudio from '../utils/sonify';

export default function BlindModeOverlay({ isOpen, onClose }) {
  const [activeSpeech, setActiveSpeech] = useState("System ready. Press Tab to navigate elements, Enter to trigger soundscape.");
  const [focusedId, setFocusedId] = useState(null);

  // Focusable elements list (6 Categories + 8 Hotspots)
  const items = [
    ...CATEGORIES_DATA.map((c) => ({
      id: `cat-${c.id}`,
      type: 'category',
      rawId: c.id,
      title: c.title,
      short: c.short,
      icon: c.icon,
      speakText: c.id === 'climate'
        ? "Climate. Hotter Earth. 1.2 degrees warmer. Hear rising pitch"
        : `${c.title}. ${c.short}. ${c.full}. Hear acoustic signature.`
    })),
    ...HOTSPOTS_DATA.map((h) => ({
      id: `spot-${h.id}`,
      type: 'hotspot',
      rawId: h.id,
      title: h.name,
      short: h.acousticPitch,
      icon: h.icon,
      speakText: `${h.name}. ${h.metric}. Acoustic signature: ${h.acousticPitch}.`
    }))
  ];

  const speak = (text) => {
    setActiveSpeech(text);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTriggerItem = async (item) => {
    speak(item.speakText);

    // Trigger Tone.js sound
    if (item.type === 'category') {
      await planetaryAudio.playCategorySound(item.rawId, 2024);
    } else {
      await planetaryAudio.playHotspotSound(item.rawId);
    }
  };

  // Keyboard navigation & Escape handler
  useEffect(() => {
    if (!isOpen) return;

    // Initial voice instruction
    speak("Blind Mode activated. You are experiencing Earth through sound only. Use Tab to navigate, Enter to hear. Designed for 2.2 Billion visually impaired.");

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Blind Mode Multi-Sensory Earth Experience"
      className="fixed inset-0 z-[100] bg-black text-yellow-300 p-6 sm:p-10 overflow-y-auto flex flex-col justify-between select-none"
    >
      {/* Top Bar with Title and Exit */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between border-b-2 border-yellow-400 pb-4">
        <div className="flex items-center gap-3">
          <Eye className="w-8 h-8 text-yellow-300 animate-pulse" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-yellow-400">
              CORE NASA ACCESSIBILITY DIRECTIVE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-wide">
              👁️ Blind Mode: Acoustic Earth
            </h1>
          </div>
        </div>

        <button
          onClick={onClose}
          autoFocus
          className="px-5 py-2.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-white shadow-[0_0_25px_#facc15] cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
          <span>Exit Blind Mode</span>
        </button>
      </div>

      {/* Main Narrative Instructional Centerpiece */}
      <div className="max-w-5xl w-full mx-auto my-8 space-y-6">
        
        {/* Big Instruction Banner */}
        <div className="p-6 rounded-3xl border-4 border-yellow-400 bg-[#0a0a00] shadow-[0_0_40px_rgba(250,204,21,0.25)] space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            "You are experiencing Earth through sound only - Use Tab to navigate, Enter to hear"
          </h2>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-sm font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-yellow-300" />
            <span>Designed for 2.2 Billion visually impaired</span>
          </div>
        </div>

        {/* Live Audio Narration Readout Box */}
        <div className="p-5 rounded-2xl border-2 border-dashed border-yellow-400/80 bg-black text-yellow-200 font-mono text-base sm:text-lg flex items-start gap-3">
          <Volume2 className="w-6 h-6 text-yellow-300 shrink-0 mt-0.5 animate-bounce" />
          <p aria-live="assertive" className="leading-relaxed">
            {activeSpeech}
          </p>
        </div>

        {/* Accessible Keyboard Grid (Tab and Enter) */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest text-yellow-400 mb-3">
            Available Telemetry Channels & Hotspots (Press Tab, then Enter):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item, idx) => (
              <button
                key={item.id}
                tabIndex={0}
                onFocus={() => {
                  setFocusedId(item.id);
                  speak(item.speakText);
                }}
                onClick={() => handleTriggerItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTriggerItem(item);
                  }
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer font-mono ${
                  focusedId === item.id
                    ? 'bg-yellow-400 text-black border-white shadow-[0_0_30px_#facc15] scale-105'
                    : 'bg-black text-yellow-300 border-yellow-400/50 hover:border-yellow-300'
                }`}
                aria-label={item.speakText}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400/20">
                    {item.type}
                  </span>
                </div>
                <div className="text-lg font-black truncate">{item.title}</div>
                <div className="text-xs opacity-90 truncate mt-0.5">{item.short}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-5xl w-full mx-auto pt-4 border-t border-yellow-400/40 flex flex-wrap items-center justify-between text-xs font-mono text-yellow-400/80">
        <span>WCAG 2.1 AAA Compliant • Full Screen Reader Compatibility</span>
        <span>Press Escape anytime to return to visual mode</span>
      </div>
    </div>
  );
}
