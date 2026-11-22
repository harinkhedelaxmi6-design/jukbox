// NASA Tone.js Narrative Sonification Engine
import * as Tone from 'tone';

class NarrativeSonificationEngine {
  constructor() {
    this.isUnlocked = false;
    this.masterVol = null;
    this.spaceReverb = null;

    // Instruments
    this.climateSynth = null;
    this.oceanFMSynth = null;
    this.oceanNoise = null;
    this.oceanFilter = null;
    this.bubbleMetal = null;
    this.birdAMSynth = null;
    this.atmosphereNoise = null;
    this.atmosphereFilter = null;
    this.disasterMetal = null;
    this.disasterSaw = null;
    this.satelliteBeep = null;
    this.crackleNoise = null;
    this.subRumbleBass = null;

    this.currentFrequency = 440;
  }

  async unlock() {
    if (this.isUnlocked) return true;
    try {
      await Tone.start();
      Tone.context.lookAhead = 0.05;

      this.masterVol = new Tone.Volume(-3).toDestination();

      // Space Reverb for cosmic atmosphere
      this.spaceReverb = new Tone.Reverb({
        decay: 3.8,
        wet: 0.38,
        preDelay: 0.04
      }).connect(this.masterVol);
      await this.spaceReverb.generate();

      // 1. Climate: Tone.Synth 200Hz to 800Hz rising
      this.climateSynth = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.03, decay: 0.28, sustain: 0.3, release: 0.7 }
      }).connect(this.spaceReverb);

      // 2. Oceans: Tone.FMSynth 80-250Hz bass + white noise wave
      this.oceanFilter = new Tone.Filter(280, "lowpass").connect(this.spaceReverb);
      this.oceanFMSynth = new Tone.FMSynth({
        harmonicity: 0.5,
        modulationIndex: 1.5,
        oscillator: { type: "sine" },
        envelope: { attack: 0.1, decay: 0.5, sustain: 0.7, release: 1.2 }
      }).connect(this.oceanFilter);

      this.oceanNoise = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.25, decay: 0.7, sustain: 0.2, release: 1.2 }
      }).connect(this.oceanFilter);

      this.bubbleMetal = new Tone.MetalSynth({
        frequency: 90,
        envelope: { attack: 0.001, decay: 0.1, release: 0.1 },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 3500,
        octaves: 1.2
      }).connect(this.spaceReverb);

      // 3. Forests: Tone.AMSynth major to minor + fewer notes over years
      this.birdAMSynth = new Tone.AMSynth({
        harmonicity: 2.5,
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.25, sustain: 0.15, release: 0.5 }
      }).connect(this.spaceReverb);

      // 4. Atmosphere: Tone.Noise + filter
      this.atmosphereFilter = new Tone.Filter(1200, "bandpass").connect(this.spaceReverb);
      this.atmosphereNoise = new Tone.NoiseSynth({
        noise: { type: "pink" },
        envelope: { attack: 0.2, decay: 0.6, sustain: 0.3, release: 0.9 }
      }).connect(this.atmosphereFilter);

      // 5. Disasters: Tone.MetalSynth urgent
      this.disasterMetal = new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.005, decay: 0.2, release: 0.25 },
        harmonicity: 5.2,
        modulationIndex: 32,
        resonance: 2800,
        octaves: 1.5
      }).connect(this.masterVol);

      this.disasterSaw = new Tone.Synth({
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.005, decay: 0.12, sustain: 0.08, release: 0.2 }
      }).connect(this.masterVol);

      // 6. Satellites: beep beep Tone.Synth
      this.satelliteBeep = new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.005, decay: 0.08, sustain: 0.01, release: 0.1 }
      }).connect(this.spaceReverb);

      // Special Sub-Bass Rumble
      this.subRumbleBass = new Tone.MembraneSynth({
        pitchDecay: 0.06,
        octaves: 3,
        envelope: { attack: 0.03, decay: 0.6, sustain: 0.2, release: 1.0 }
      }).connect(this.masterVol);

      this.crackleNoise = new Tone.NoiseSynth({
        noise: { type: "brown" },
        envelope: { attack: 0.01, decay: 0.18, sustain: 0.05, release: 0.25 }
      }).connect(this.masterVol);

      this.isUnlocked = true;
      return true;
    } catch (e) {
      console.warn("Tone.js unlock notice:", e);
      return false;
    }
  }

  // Play category sound directly related to content
  async playCategorySound(categoryId, year = 2024) {
    await this.unlock();
    const now = Tone.now();

    switch (categoryId) {
      case 'climate': {
        // Climate = Tone.Synth 200Hz to 800Hz rising
        const normalized = Math.max(0, Math.min(1, (year - 1980) / (2026 - 1980)));
        const freq = Math.round(200 + (year - 1980) * 13);
        this.currentFrequency = freq;

        if (this.climateSynth) {
          this.climateSynth.triggerAttackRelease(freq, "8n", now, 0.55);
          if (year > 2000) {
            this.climateSynth.triggerAttackRelease(Math.round(freq * 1.189), "16n", now + 0.12, 0.45);
          }
        }

        const text = `🔊 Climate: 200Hz(1980) → 800Hz(2024) - Rising pitch = Rising temp +${(0.2 + normalized * 1.1).toFixed(1)}°C`;
        return { text, freq, color: '#ef4444' };
      }

      case 'ocean': {
        // Oceans = Tone.FMSynth 80-250Hz bass + white noise wave
        const normalized = Math.max(0, Math.min(1, (year - 1980) / (2026 - 1980)));
        const bassFreq = Math.round(80 + normalized * 170);
        this.currentFrequency = bassFreq;

        if (this.oceanFMSynth && this.oceanNoise && this.bubbleMetal) {
          this.oceanFMSynth.triggerAttackRelease(bassFreq, "2n", now, 0.55);
          this.oceanNoise.triggerAttackRelease("4n", now + 0.05, 0.35);
          this.bubbleMetal.triggerAttackRelease(140, "16n", now + 0.2, 0.25);
        }

        const text = "🌊 Oceans: Deep bass rising - Sea level +3.4mm/year";
        return { text, freq: bassFreq, color: '#38bdf8' };
      }

      case 'forest': {
        // Forests = Tone.AMSynth major to minor + fewer notes over years
        const normalized = Math.max(0, Math.min(1, (year - 1980) / (2026 - 1980)));
        this.currentFrequency = 520;

        if (this.birdAMSynth) {
          if (year < 2000) {
            // Major scale rich notes
            this.birdAMSynth.triggerAttackRelease(523, "16n", now, 0.4);
            this.birdAMSynth.triggerAttackRelease(659, "16n", now + 0.1, 0.4);
            this.birdAMSynth.triggerAttackRelease(784, "16n", now + 0.2, 0.35);
          } else {
            // Sad minor note + silence gap
            const sadFreq = Math.round(440 - normalized * 150);
            this.birdAMSynth.triggerAttackRelease(sadFreq, "8n", now, 0.35);
            this.birdAMSynth.triggerAttackRelease(sadFreq * 0.84, "4n", now + 0.3, 0.25);
          }
        }

        const text = "🌲 Forests: Fewer notes = Fewer trees - 10M hectares lost";
        return { text, freq: 520, color: '#22c55e' };
      }

      case 'atmosphere': {
        // Atmosphere = Tone.Noise + filter
        this.currentFrequency = 600;
        if (this.atmosphereFilter && this.atmosphereNoise) {
          this.atmosphereFilter.frequency.value = 1200 - ((year - 1980) / 46) * 500;
          this.atmosphereNoise.triggerAttackRelease("4n", now, 0.45);
        }

        const text = "💨 Atmosphere: Noisy airy pad - Carbon & aerosol pollution";
        return { text, freq: 600, color: '#94a3b8' };
      }

      case 'disaster': {
        // Disasters = Tone.MetalSynth urgent
        this.currentFrequency = 880;
        if (this.disasterMetal && this.disasterSaw) {
          this.disasterSaw.triggerAttackRelease(660, "16n", now, 0.5);
          this.disasterSaw.triggerAttackRelease(880, "16n", now + 0.1, 0.5);
          this.disasterMetal.triggerAttackRelease(320, "8n", now + 0.2, 0.4);
        }

        const text = "⚠️ Disasters: Urgent fast metal alarm - Rising extreme events";
        return { text, freq: 880, color: '#f97316' };
      }

      case 'satellite': {
        // Satellites = beep beep Tone.Synth
        this.currentFrequency = 1760;
        if (this.satelliteBeep) {
          this.satelliteBeep.triggerAttackRelease(1760, "32n", now, 0.4);
          this.satelliteBeep.triggerAttackRelease(1760, "32n", now + 0.12, 0.4);
          this.satelliteBeep.triggerAttackRelease(2349, "32n", now + 0.28, 0.4);
        }

        const text = "🛰️ Satellites: Beep-beep transmission - Earth telemetry downlink";
        return { text, freq: 1760, color: '#ffffff' };
      }

      default:
        return { text: "🎧 Hear Our Planet Breathe - Click a card", freq: 440, color: '#00D9FF' };
    }
  }

  // Play map hotspot sound directly related to content
  async playHotspotSound(hotspotId) {
    await this.unlock();
    const now = Tone.now();

    switch (hotspotId) {
      case 'arctic': {
        // Arctic Ice Cap: Cracking crystals = Ice melting -32%
        if (this.disasterMetal && this.crackleNoise) {
          this.disasterMetal.triggerAttackRelease(1200, "16n", now, 0.45);
          this.crackleNoise.triggerAttackRelease("16n", now + 0.1, 0.5);
        }
        const text = "🧊 Arctic: Cracking crystals = Ice melting -32%";
        this.currentFrequency = 1200;
        return { text, freq: 1200, color: '#00D9FF' };
      }

      case 'amazon': {
        // Amazon: Birds fading = Forest silent
        if (this.birdAMSynth) {
          this.birdAMSynth.triggerAttackRelease(980, "16n", now, 0.4);
          this.birdAMSynth.triggerAttackRelease(780, "16n", now + 0.1, 0.35);
          this.birdAMSynth.triggerAttackRelease(380, "4n", now + 0.25, 0.25);
        }
        const text = "🐦 Amazon: Birds fading = Forest silent";
        this.currentFrequency = 780;
        return { text, freq: 780, color: '#22c55e' };
      }

      case 'california': {
        // California: Wildfires
        if (this.crackleNoise && this.disasterSaw) {
          this.crackleNoise.triggerAttackRelease("8n", now, 0.5);
          this.disasterSaw.triggerAttackRelease(830, "8n", now + 0.12, 0.45);
        }
        const text = "🔥 California: Fire crackle & siren = Megadrought & wildfire";
        this.currentFrequency = 830;
        return { text, freq: 830, color: '#f97316' };
      }

      case 'sahara': {
        // Sahara: Desertification
        if (this.crackleNoise && this.climateSynth) {
          this.crackleNoise.triggerAttackRelease("4n", now, 0.4);
          this.climateSynth.triggerAttackRelease("E3", "4n", now + 0.15, 0.3);
        }
        const text = "💨 Sahara: Dry wind noise = Transatlantic dust expansion";
        this.currentFrequency = 220;
        return { text, freq: 220, color: '#fbbf24' };
      }

      case 'himalayas': {
        // Himalayas: Glaciers melting
        if (this.subRumbleBass && this.disasterMetal) {
          this.disasterMetal.triggerAttackRelease(1400, "16n", now, 0.35);
          this.subRumbleBass.triggerAttackRelease("C4", "16n", now + 0.12, 0.45);
        }
        const text = "🏔️ Himalayas: Water drip + cold chimes = Glaciers melting";
        this.currentFrequency = 1400;
        return { text, freq: 1400, color: '#38bdf8' };
      }

      case 'pacific': {
        // Pacific: Ocean warming
        if (this.oceanFMSynth && this.bubbleMetal) {
          this.oceanFMSynth.triggerAttackRelease(100, "2n", now, 0.55);
          this.bubbleMetal.triggerAttackRelease(140, "16n", now + 0.2, 0.3);
        }
        const text = "🌊 Pacific: Deep warm bass = Ocean thermal anomaly";
        this.currentFrequency = 100;
        return { text, freq: 100, color: '#00D9FF' };
      }

      case 'indonesia': {
        // Indonesia: Coral / marine
        if (this.oceanFMSynth) {
          this.oceanFMSynth.triggerAttackRelease(175, "2n", now, 0.5);
        }
        const text = "🌴 Indonesia: Underwater FM wobble = Coral & peat degradation";
        this.currentFrequency = 175;
        return { text, freq: 175, color: '#10b981' };
      }

      case 'antarctica': {
        // Antarctica: Ice sheet collapse
        if (this.subRumbleBass && this.crackleNoise) {
          this.subRumbleBass.triggerAttackRelease("E0", "1m", now, 0.85);
          this.crackleNoise.triggerAttackRelease("16n", now + 0.15, 0.55);
        }
        const text = "❄️ Antarctica: 40Hz sub-rumble + crack = Ice sheet collapse";
        this.currentFrequency = 41;
        return { text, freq: 41, color: '#e0f2fe' };
      }

      default: {
        return { text: "🎧 Hear Our Planet Breathe - Click a card", freq: 440, color: '#00D9FF' };
      }
    }
  }

  setVolume(volPercent) {
    if (this.masterVol) {
      if (volPercent <= 0) {
        this.masterVol.mute = true;
      } else {
        this.masterVol.mute = false;
        const db = Tone.gainToDb(volPercent / 100);
        this.masterVol.volume.value = Math.max(-36, Math.min(0, db));
      }
    }
  }
}

export const planetaryAudio = new NarrativeSonificationEngine();
export default planetaryAudio;
