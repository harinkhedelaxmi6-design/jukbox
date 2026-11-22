import React, { useRef, useEffect } from 'react';

export default function CanvasAuroraVisualizer({
  isPlaying,
  categoryId = 'climate',
  customColor = null
}) {
  const canvasRef = useRef(null);

  // Category Color Map requested:
  // Climate=red-orange, Oceans=blue, Forests=green, Atmosphere=grey, Disasters=orange fast, Satellites=white
  const colorMap = {
    climate: { color: '#f97316', secondary: '#ef4444', speed: 0.05, waves: 3 },
    ocean: { color: '#38bdf8', secondary: '#0284c7', speed: 0.035, waves: 3 },
    forest: { color: '#22c55e', secondary: '#16a34a', speed: 0.03, waves: 3 },
    atmosphere: { color: '#94a3b8', secondary: '#cbd5e1', speed: 0.025, waves: 2 },
    disaster: { color: '#ea580c', secondary: '#f97316', speed: 0.08, waves: 4 }, // orange fast
    satellite: { color: '#ffffff', secondary: '#e0e7ff', speed: 0.06, waves: 3 }  // white
  };

  const theme = colorMap[categoryId] || {
    color: customColor || '#00D9FF',
    secondary: '#38bdf8',
    speed: 0.04,
    waves: 3
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;

    const render = () => {
      // Handle canvas resolution
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle background glow
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, `${theme.color}00`);
      grad.addColorStop(0.5, `${theme.color}20`);
      grad.addColorStop(1, `${theme.color}00`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const waveCount = theme.waves;
      const baseAmp = isPlaying ? height * 0.35 : height * 0.12;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = i === 0 ? 2.5 : 1.5;

        const waveColor = i === 0 ? theme.color : theme.secondary;
        ctx.strokeStyle = waveColor;
        ctx.shadowColor = waveColor;
        ctx.shadowBlur = isPlaying ? 10 : 4;

        for (let x = 0; x <= width; x += 4) {
          const freqMultiplier = 0.015 + i * 0.005;
          const phase = step + i * 1.8;
          const y =
            height / 2 +
            Math.sin(x * freqMultiplier + phase) *
              baseAmp *
              Math.sin(x * 0.005 + step * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      step += isPlaying ? theme.speed : 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, categoryId, theme]);

  return (
    <div className="relative w-full h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={360}
        height={48}
        className="w-full h-full block"
      />
      <div className="absolute top-1 right-2 text-[9px] font-mono tracking-widest text-slate-400 uppercase opacity-70">
        AURORA WAVE
      </div>
    </div>
  );
}
