// Background Music Engine using Web Audio API
// High-quality, lightweight, cheerful procedural instruments for DIGI JURANG

export interface TrackInfo {
  id: string;
  title: string;
  genre: string;
  icon: string;
  description: string;
  bpm: number;
}

const NOTE_FREQS: Record<string, number> = {
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'F6': 1396.91, 'G6': 1567.98, 'A6': 1760.00,
  '-': 0
};

interface StepNote {
  melody?: string;
  harmony?: string[];
  bass?: string;
  percussion?: 'kick' | 'snare' | 'hihat' | 'woodblock';
}

export const TRACKS: TrackInfo[] = [
  {
    id: 'ceria',
    title: 'Petualangan Ceria',
    genre: 'Marimba & Acoustic',
    icon: '🎪',
    description: 'Musik bersemangat dan ceria untuk belajar berhitung',
    bpm: 116
  },
  {
    id: 'kotak-musik',
    title: 'Kotak Musik Cerdas',
    genre: 'Lullaby & Music Box',
    icon: '✨',
    description: 'Melodi manis dan menenangkan untuk fokus belajar',
    bpm: 96
  },
  {
    id: 'semangat',
    title: 'Semangat Berhitung',
    genre: 'Arcade Synth & Pop',
    icon: '🚀',
    description: 'Irama ritmis dan seru seperti di dunia game edukasi',
    bpm: 126
  },
  {
    id: 'bintang',
    title: 'Bintang Kecil Pintar',
    genre: 'Bells & Chimes',
    icon: '🌟',
    description: 'Denting lonceng ajaib yang menginspirasi anak-anak',
    bpm: 102
  }
];

// Composed 32-step loops (2 bars of 16th notes or 4 bars of 8th notes) for each track
const TRACK_PATTERNS: Record<string, StepNote[]> = {
  'ceria': [
    // Bar 1 (C Major)
    { melody: 'C5', harmony: ['C4', 'E4', 'G4'], bass: 'C3', percussion: 'kick' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'G5', harmony: ['E4', 'G4'], percussion: 'woodblock' },
    { melody: 'C6', percussion: 'hihat' },
    { melody: 'G5', harmony: ['C4', 'G4'], bass: 'G2', percussion: 'kick' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'D5', harmony: ['E4', 'G4'], percussion: 'woodblock' },
    { melody: 'E5', percussion: 'hihat' },

    // Bar 2 (F Major)
    { melody: 'F5', harmony: ['C4', 'F4', 'A4'], bass: 'F2', percussion: 'kick' },
    { melody: 'A5', percussion: 'hihat' },
    { melody: 'C6', harmony: ['F4', 'A4'], percussion: 'woodblock' },
    { melody: 'D6', percussion: 'hihat' },
    { melody: 'C6', harmony: ['C4', 'A4'], bass: 'C3', percussion: 'kick' },
    { melody: 'A5', percussion: 'hihat' },
    { melody: 'F5', harmony: ['F4', 'A4'], percussion: 'woodblock' },
    { melody: 'G5', percussion: 'hihat' },

    // Bar 3 (G Major)
    { melody: 'G5', harmony: ['D4', 'G4', 'B4'], bass: 'G2', percussion: 'kick' },
    { melody: 'B5', percussion: 'hihat' },
    { melody: 'D6', harmony: ['G4', 'B4'], percussion: 'woodblock' },
    { melody: 'E6', percussion: 'hihat' },
    { melody: 'D6', harmony: ['D4', 'B4'], bass: 'D3', percussion: 'kick' },
    { melody: 'B5', percussion: 'hihat' },
    { melody: 'G5', harmony: ['G4', 'B4'], percussion: 'woodblock' },
    { melody: 'A5', percussion: 'hihat' },

    // Bar 4 (C Major turnaround)
    { melody: 'G5', harmony: ['C4', 'E4', 'G4'], bass: 'C3', percussion: 'kick' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'D5', harmony: ['E4', 'G4'], percussion: 'woodblock' },
    { melody: 'C5', percussion: 'hihat' },
    { melody: 'D5', harmony: ['C4', 'G4'], bass: 'G2', percussion: 'kick' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'C5', harmony: ['C4', 'E4', 'G4'], percussion: 'woodblock' },
    { melody: '-', percussion: 'hihat' }
  ],

  'kotak-musik': [
    // Gentle music box arpeggios
    { melody: 'G5', harmony: ['G3', 'D4', 'B4'], bass: 'G2' },
    { melody: 'B5' },
    { melody: 'D6', harmony: ['D4', 'B4'] },
    { melody: 'G6' },
    { melody: 'E6', harmony: ['E3', 'B3', 'G4'], bass: 'E2' },
    { melody: 'B5' },
    { melody: 'G5', harmony: ['B3', 'G4'] },
    { melody: 'E5' },

    { melody: 'C6', harmony: ['C3', 'G3', 'E4'], bass: 'C2' },
    { melody: 'E6' },
    { melody: 'G6', harmony: ['G3', 'E4'] },
    { melody: 'E6' },
    { melody: 'D6', harmony: ['D3', 'A3', 'F#4'], bass: 'D2' },
    { melody: 'A5' },
    { melody: 'F#5', harmony: ['A3', 'F#4'] },
    { melody: 'D5' },

    { melody: 'E5', harmony: ['C3', 'G3', 'E4'], bass: 'C2' },
    { melody: 'G5' },
    { melody: 'C6', harmony: ['G3', 'E4'] },
    { melody: 'D6' },
    { melody: 'B5', harmony: ['G3', 'D4', 'B4'], bass: 'G2' },
    { melody: 'G5' },
    { melody: 'D5', harmony: ['D4', 'B4'] },
    { melody: 'B4' },

    { melody: 'A4', harmony: ['D3', 'A3', 'F#4'], bass: 'D2' },
    { melody: 'C5' },
    { melody: 'E5', harmony: ['A3', 'F#4'] },
    { melody: 'F#5' },
    { melody: 'G5', harmony: ['G3', 'D4', 'B4'], bass: 'G2' },
    { melody: 'B5' },
    { melody: 'D6', harmony: ['D4', 'B4'] },
    { melody: '-' }
  ],

  'semangat': [
    // High energy video game chiptune groove
    { melody: 'D5', harmony: ['D4', 'F#4', 'A4'], bass: 'D3', percussion: 'kick' },
    { melody: 'D5', percussion: 'hihat' },
    { melody: 'F#5', harmony: ['F#4', 'A4'], percussion: 'snare' },
    { melody: 'A5', percussion: 'hihat' },
    { melody: 'B5', harmony: ['G3', 'D4', 'G4'], bass: 'G2', percussion: 'kick' },
    { melody: 'A5', percussion: 'hihat' },
    { melody: 'G5', harmony: ['D4', 'G4'], percussion: 'snare' },
    { melody: 'F#5', percussion: 'hihat' },

    { melody: 'E5', harmony: ['A3', 'E4', 'G4'], bass: 'A2', percussion: 'kick' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'G5', harmony: ['E4', 'G4'], percussion: 'snare' },
    { melody: 'B5', percussion: 'hihat' },
    { melody: 'A5', harmony: ['D4', 'F#4', 'A4'], bass: 'D3', percussion: 'kick' },
    { melody: 'F#5', percussion: 'hihat' },
    { melody: 'E5', harmony: ['F#4', 'A4'], percussion: 'snare' },
    { melody: 'D5', percussion: 'hihat' },

    { melody: 'G5', harmony: ['G3', 'B3', 'D4'], bass: 'G2', percussion: 'kick' },
    { melody: 'B5', percussion: 'hihat' },
    { melody: 'D6', harmony: ['B3', 'D4'], percussion: 'snare' },
    { melody: 'B5', percussion: 'hihat' },
    { melody: 'A5', harmony: ['A3', 'C#4', 'E4'], bass: 'A2', percussion: 'kick' },
    { melody: 'C#6', percussion: 'hihat' },
    { melody: 'E6', harmony: ['C#4', 'E4'], percussion: 'snare' },
    { melody: 'C#6', percussion: 'hihat' },

    { melody: 'D6', harmony: ['D4', 'F#4', 'A4'], bass: 'D3', percussion: 'kick' },
    { melody: 'A5', percussion: 'hihat' },
    { melody: 'F#5', harmony: ['F#4', 'A4'], percussion: 'snare' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'D5', harmony: ['D4', 'F#4', 'A4'], bass: 'D3', percussion: 'kick' },
    { melody: 'E5', percussion: 'hihat' },
    { melody: 'F#5', harmony: ['F#4', 'A4'], percussion: 'snare' },
    { melody: 'A5', percussion: 'hihat' }
  ],

  'bintang': [
    // Sweet Twinkle Bell Lullaby
    { melody: 'F5', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: 'F5' },
    { melody: 'C6', harmony: ['A3', 'C4'] },
    { melody: 'C6' },
    { melody: 'D6', harmony: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { melody: 'D6' },
    { melody: 'C6', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: '-' },

    { melody: 'Bb5', harmony: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { melody: 'Bb5' },
    { melody: 'A5', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: 'A5' },
    { melody: 'G5', harmony: ['C3', 'E3', 'G3'], bass: 'C2' },
    { melody: 'G5' },
    { melody: 'F5', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: '-' },

    { melody: 'C6', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: 'C6' },
    { melody: 'Bb5', harmony: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { melody: 'Bb5' },
    { melody: 'A5', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: 'A5' },
    { melody: 'G5', harmony: ['C3', 'E3', 'G3'], bass: 'C2' },
    { melody: '-' },

    { melody: 'F5', harmony: ['F3', 'A3', 'C4'], bass: 'F2' },
    { melody: 'F5' },
    { melody: 'C6', harmony: ['A3', 'C4'] },
    { melody: 'C6' },
    { melody: 'Bb5', harmony: ['Bb3', 'D4', 'F4'], bass: 'Bb2' },
    { melody: 'A5' },
    { melody: 'G5', harmony: ['C3', 'G3', 'E4'], bass: 'C2' },
    { melody: 'F5', harmony: ['F3', 'A3', 'C4'], bass: 'F2' }
  ]
};

export class MusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string = 'ceria';
  private volume: number = 0.35;
  private currentStep: number = 0;
  private timerId: number | null = null;
  private nextStepTime: number = 0;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('digijurang_music_track');
      const savedVol = localStorage.getItem('digijurang_music_vol');

      if (savedTrack && TRACK_PATTERNS[savedTrack]) {
        this.currentTrackId = savedTrack;
      }
      if (savedVol) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) {
          this.volume = v;
        }
      }
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.filterNode = this.ctx.createBiquadFilter();

        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(3200, this.ctx.currentTime);

        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.filterNode.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType, gainLevel: number, decayRate = 0.8) {
    if (!this.ctx || !this.filterNode || freq <= 0) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Attack & decay envelope
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * decayRate);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio node failure safety
    }
  }

  private playPercussion(type: 'kick' | 'snare' | 'hihat' | 'woodblock', startTime: number) {
    if (!this.ctx || !this.filterNode) return;
    try {
      if (type === 'kick') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(130, startTime);
        osc.frequency.exponentialRampToValueAtTime(35, startTime + 0.09);
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);
        osc.connect(gain);
        gain.connect(this.filterNode);
        osc.start(startTime);
        osc.stop(startTime + 0.09);
      } else if (type === 'hihat' || type === 'snare') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(type === 'snare' ? 240 : 800, startTime);
        gain.gain.setValueAtTime(type === 'snare' ? 0.12 : 0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);
        osc.connect(gain);
        gain.connect(this.filterNode);
        osc.start(startTime);
        osc.stop(startTime + 0.04);
      } else if (type === 'woodblock') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(920, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);
        osc.connect(gain);
        gain.connect(this.filterNode);
        osc.start(startTime);
        osc.stop(startTime + 0.03);
      }
    } catch {
      // Ignore
    }
  }

  private scheduleStep(stepIndex: number, time: number, stepDuration: number) {
    const pattern = TRACK_PATTERNS[this.currentTrackId] || TRACK_PATTERNS['ceria'];
    const note = pattern[stepIndex % pattern.length];
    if (!note) return;

    // 1. Play Lead Melody (Bright, warm marimba/xylophone)
    if (note.melody && note.melody !== '-') {
      const freq = NOTE_FREQS[note.melody];
      if (freq) {
        this.playTone(freq, time, stepDuration * 1.5, 'sine', 0.22, 0.7);
        // Add pleasant overtone harmonic
        this.playTone(freq * 2, time, stepDuration * 0.8, 'triangle', 0.06, 0.4);
      }
    }

    // 2. Play Harmony Chords (Warm pad)
    if (note.harmony && note.harmony.length > 0) {
      note.harmony.forEach((hNote) => {
        const freq = NOTE_FREQS[hNote];
        if (freq) {
          this.playTone(freq, time, stepDuration * 2.2, 'triangle', 0.07, 0.9);
        }
      });
    }

    // 3. Play Bass Note (Subtle bouncy groove)
    if (note.bass && note.bass !== '-') {
      const freq = NOTE_FREQS[note.bass];
      if (freq) {
        this.playTone(freq, time, stepDuration * 1.8, 'triangle', 0.2, 0.8);
      }
    }

    // 4. Play Light Percussion
    if (note.percussion) {
      this.playPercussion(note.percussion, time);
    }
  }

  private scheduler() {
    if (!this.isPlaying || !this.ctx) return;
    const track = TRACKS.find((t) => t.id === this.currentTrackId) || TRACKS[0];
    const stepDuration = 60 / track.bpm / 2; // Eighth note duration

    // Schedule 120ms ahead of current audio context time
    while (this.nextStepTime < this.ctx.currentTime + 0.12) {
      this.scheduleStep(this.currentStep, this.nextStepTime, stepDuration);
      this.nextStepTime += stepDuration;
      this.currentStep++;
    }

    this.timerId = window.setTimeout(() => this.scheduler(), 30);
  }

  public play() {
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.currentStep = 0;

    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.3);
    }

    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.scheduler();
    this.notify();
    this.saveState();
  }

  public startAutoplay() {
    this.play();

    const unlockAudio = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.isPlaying) {
        this.play();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('pointerdown', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
      window.addEventListener('scroll', unlockAudio, { once: true });
    }
  }

  public pause() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    }
    setTimeout(() => {
      this.isPlaying = false;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.notify();
      this.saveState();
    }, 200);
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setTrack(trackId: string) {
    if (this.currentTrackId === trackId) return;
    this.currentTrackId = trackId;
    this.currentStep = 0;
    if (this.isPlaying && this.ctx) {
      this.nextStepTime = this.ctx.currentTime + 0.05;
    }
    this.notify();
    this.saveState();
  }

  public nextTrack() {
    const currentIndex = TRACKS.findIndex((t) => t.id === this.currentTrackId);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    this.setTrack(TRACKS[nextIndex].id);
  }

  public prevTrack() {
    const currentIndex = TRACKS.findIndex((t) => t.id === this.currentTrackId);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    this.setTrack(TRACKS[prevIndex].id);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && this.isPlaying) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
    this.saveState();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): TrackInfo {
    return TRACKS.find((t) => t.id === this.currentTrackId) || TRACKS[0];
  }

  public getVolume(): number {
    return this.volume;
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  private saveState() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('digijurang_music_muted', (!this.isPlaying).toString());
      localStorage.setItem('digijurang_music_track', this.currentTrackId);
      localStorage.setItem('digijurang_music_vol', this.volume.toString());
    }
  }
}

export const music = new MusicEngine();
