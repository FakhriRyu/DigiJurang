import React, { useState, useEffect, useRef } from 'react';
import { music, TRACKS, type TrackInfo } from '../utils/music';
import { sound } from '../utils/sound';
import type { ThemeMode } from '../types';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Volume1,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  themeMode?: ThemeMode;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ themeMode = 'light' }) => {
  const isDark = themeMode === 'dark';
  const [isPlaying, setIsPlaying] = useState<boolean>(music.getIsPlaying());
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(music.getCurrentTrack());
  const [volume, setVolume] = useState<number>(music.getVolume());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = music.subscribe(() => {
      setIsPlaying(music.getIsPlaying());
      setCurrentTrack(music.getCurrentTrack());
      setVolume(music.getVolume());
    });
    return () => unsubscribe();
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    music.togglePlay();
  };

  const handleSelectTrack = (trackId: string) => {
    sound.playPop(1.2);
    music.setTrack(trackId);
    if (!isPlaying) {
      music.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    music.setVolume(newVol);
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Header Music Trigger Button */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title={isPlaying ? `Musik: ${currentTrack.title} (Klik untuk atur)` : 'Putar Musik Latar Belakang'}
          className={`h-7 px-2 rounded-lg sm:rounded-xl text-xs font-black font-fun flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 border ${
            isPlaying
              ? isDark
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/50 text-amber-300 shadow-xs'
                : 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300 text-amber-900 shadow-xs'
              : isDark
              ? 'bg-white/10 hover:bg-white/15 border-white/5 text-slate-300'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
          }`}
        >
          {/* Animated sound equalizer bars when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-amber-400 rounded-full animate-[bounce_0.6s_infinite_ease-in-out_0ms] h-full"></span>
              <span className="w-0.5 bg-orange-400 rounded-full animate-[bounce_0.6s_infinite_ease-in-out_200ms] h-2/3"></span>
              <span className="w-0.5 bg-yellow-400 rounded-full animate-[bounce_0.6s_infinite_ease-in-out_400ms] h-4/5"></span>
            </div>
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}

          <span className="hidden lg:inline text-[11px] truncate max-w-[110px]">
            {isPlaying ? currentTrack.title : 'Lagu'}
          </span>

          <span className="text-[10px] opacity-70">
            {currentTrack.icon}
          </span>
        </button>

        {/* Quick Play/Pause Mini Toggle */}
        <button
          type="button"
          onClick={handleTogglePlay}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          className={`w-7 h-7 rounded-lg sm:rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 border ${
            isPlaying
              ? isDark
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs'
                : 'bg-amber-500 text-white border-amber-400 shadow-xs'
              : isDark
              ? 'bg-white/10 hover:bg-white/15 border-white/5 text-slate-400'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-500'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Music Selector & Controller Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl border shadow-2xl p-3.5 z-50 transition-colors ${
              isDark
                ? 'bg-[#1C1E21] border-white/15 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-inherit/20">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🎵</span>
                <div>
                  <h3 className="font-fun font-black text-xs sm:text-sm leading-tight flex items-center gap-1">
                    <span>Musik Latar Belakang</span>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Lagu ceria ramah anak & bebas copyright
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Now Playing Widget */}
            <div
              className={`p-2.5 rounded-xl border mb-3 transition-colors ${
                isPlaying
                  ? isDark
                    ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-amber-400/30'
                    : 'bg-gradient-to-r from-amber-50 via-orange-50 to-white border-amber-200'
                  : isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">{currentTrack.icon}</span>
                  <div>
                    <span className="text-xs font-black font-fun block text-amber-500">
                      {isPlaying ? 'Sedang Diputar 🎶' : 'Musik Dijeda ⏸️'}
                    </span>
                    <span className="text-xs font-black font-fun truncate block">
                      {currentTrack.title}
                    </span>
                    <span className="text-[10px] opacity-75 font-medium block">
                      {currentTrack.genre} • {currentTrack.bpm} BPM
                    </span>
                  </div>
                </div>

                {/* Main Play/Pause Button in card */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    music.togglePlay();
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-md cursor-pointer transition-transform active:scale-90 ${
                    isPlaying
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:brightness-110'
                      : isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-inherit/15">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    music.prevTrack();
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-fun font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <SkipBack className="w-3 h-3" /> Lagu Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    music.nextTrack();
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-fun font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Lagu Selanjutnya <SkipForward className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Volume Slider */}
            <div className="mb-3 px-1 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-fun font-bold opacity-80">
                <span className="flex items-center gap-1">
                  {volume === 0 ? (
                    <VolumeX className="w-3 h-3 text-rose-400" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-3 h-3 text-amber-400" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-amber-400" />
                  )}
                  <span>Volume Musik</span>
                </span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Track Playlist Options */}
            <div className="space-y-1">
              <span className="text-[10px] font-fun font-black px-1 opacity-70 uppercase tracking-wider block mb-1">
                Pilihan Lagu:
              </span>
              {TRACKS.map((track) => {
                const isCurrent = currentTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(track.id)}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? isDark
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                          : 'bg-amber-100 text-amber-950 border border-amber-300 font-bold'
                        : isDark
                        ? 'hover:bg-white/5 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{track.icon}</span>
                      <div>
                        <div className="text-xs font-fun font-black flex items-center gap-1.5">
                          <span>{track.title}</span>
                          {isCurrent && isPlaying && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black animate-pulse">
                              Diputar
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] opacity-75 leading-tight">
                          {track.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
