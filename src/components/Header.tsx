import React from 'react';
import type { ViewTab, BoardOrientation, ThemeMode } from '../types';
import { sound } from '../utils/sound';
import { Logo } from './Logo';
import { MusicPlayer } from './MusicPlayer';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  BookOpen,
  LayoutGrid,
  Lightbulb,
  Monitor,
  Smartphone,
  Sparkles,
  Sun,
  Moon,
  Image as ImageIcon
} from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  orientation: BoardOrientation;
  onToggleOrientation: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  orientation,
  onToggleOrientation,
  themeMode,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice
}) => {
  const isDark = themeMode === 'dark';

  const navItems: {
    id: ViewTab;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    colorDark: string;
    colorLight: string;
  }[] = [
    {
      id: 'intro',
      label: 'Pendahuluan',
      shortLabel: 'Intro',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      colorDark: 'bg-amber-400 text-slate-950 shadow-sm',
      colorLight: 'bg-amber-400 text-slate-950 shadow-sm'
    },
    {
      id: 'board',
      label: 'Papan Jurang',
      shortLabel: 'Papan',
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
      colorDark: 'bg-emerald-400 text-slate-950 shadow-sm',
      colorLight: 'bg-emerald-500 text-white shadow-sm'
    },
    {
      id: 'concept',
      label: 'Materi Belajar',
      shortLabel: 'Materi',
      icon: <Lightbulb className="w-3.5 h-3.5" />,
      colorDark: 'bg-sky-400 text-slate-950 shadow-sm',
      colorLight: 'bg-sky-500 text-white shadow-sm'
    },
    {
      id: 'objectives',
      label: 'Panduan',
      shortLabel: 'Panduan',
      icon: <BookOpen className="w-3.5 h-3.5" />,
      colorDark: 'bg-pink-500 text-white shadow-sm',
      colorLight: 'bg-pink-500 text-white shadow-sm'
    },
    {
      id: 'keterangan',
      label: 'Keterangan',
      shortLabel: 'Keterangan',
      icon: <ImageIcon className="w-3.5 h-3.5" />,
      colorDark: 'bg-indigo-500 text-white shadow-sm',
      colorLight: 'bg-indigo-500 text-white shadow-sm'
    }
  ];

  return (
    <header
      className={`w-full sticky top-0 z-40 transition-colors duration-200 border-b ${
        isDark
          ? 'bg-[#181A1D]/95 backdrop-blur-md border-white/10 text-white shadow-lg'
          : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Top Header Row on Mobile: Logo on Left, Action Controls on Right */}
        <div className="w-full md:w-auto flex items-center justify-between gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 drop-shadow-sm" />
            <div className="flex items-center">
              <h1
                className={`text-base sm:text-lg font-black font-fun tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                DIGI JURANG
              </h1>
            </div>
          </div>

          {/* Quick Action Controls on Mobile (Music, Theme, Orientation, Sound, Voice) */}
          <div className="flex md:hidden items-center gap-1">
            {/* Background Music Player */}
            <MusicPlayer themeMode={themeMode} />

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-white/10 text-amber-300 hover:bg-white/15'
                  : 'bg-slate-100 text-amber-800 hover:bg-slate-200'
              }`}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-700 fill-indigo-700" />
              )}
            </button>

            {/* Orientation Toggle */}
            <button
              type="button"
              onClick={onToggleOrientation}
              title={orientation === 'landscape' ? 'Ganti ke Potret' : 'Ganti ke Lanskap'}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-white/10 text-slate-200 hover:bg-white/15'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {orientation === 'landscape' ? (
                <Monitor className="w-3.5 h-3.5" />
              ) : (
                <Smartphone className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                isDark
                  ? soundEnabled
                    ? 'bg-white/10 text-amber-300'
                    : 'bg-white/5 text-slate-500'
                  : soundEnabled
                  ? 'bg-slate-100 text-amber-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Voice Toggle */}
            <button
              type="button"
              onClick={onToggleVoice}
              title={voiceEnabled ? 'Matikan Suara Guru' : 'Nyalakan Suara Guru'}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                isDark
                  ? voiceEnabled
                    ? 'bg-white/10 text-sky-300'
                    : 'bg-white/5 text-slate-500'
                  : voiceEnabled
                  ? 'bg-slate-100 text-sky-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 5 Navigation Tabs (Always 100% visible: 5-column grid on mobile, flex row on desktop) */}
        <nav
          className={`w-full md:w-auto grid grid-cols-5 md:flex md:items-center gap-1 p-1 rounded-xl transition-colors ${
            isDark
              ? 'bg-[#25282D]'
              : 'bg-slate-100'
          }`}
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectTab(item.id);
                }}
                className={`px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-black font-fun flex flex-col md:flex-row items-center justify-center gap-0.5 sm:gap-1.5 transition-all cursor-pointer text-center ${
                  isActive
                    ? isDark
                      ? item.colorDark
                      : item.colorLight
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title={item.label}
              >
                {item.icon}
                <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
                <span className="inline sm:hidden whitespace-nowrap">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Global Controls: Music, Theme, Orientation, Audio, Voice */}
        <div className="hidden md:flex items-center gap-1.5">
          {/* Background Music Player */}
          <MusicPlayer themeMode={themeMode} />

          {/* Light / Dark Mode Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? 'Ganti ke Mode Terang (Whiteboard)' : 'Ganti ke Mode Gelap (Blackboard)'}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black font-fun flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-white/10 text-amber-300 hover:bg-white/15'
                : 'bg-slate-100 text-amber-950 hover:bg-slate-200'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-700 fill-indigo-700" />
                <span>Gelap</span>
              </>
            )}
          </button>

          {/* Orientation Toggle */}
          <button
            type="button"
            onClick={onToggleOrientation}
            title={
              orientation === 'landscape'
                ? 'Ganti ke Tampilan Potret'
                : 'Ganti ke Tampilan Lanskap'
            }
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black font-fun flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-white/10 text-slate-200 hover:bg-white/15'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {orientation === 'landscape' ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Lanskap</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Potret</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDark
                ? soundEnabled
                  ? 'bg-white/10 text-amber-300 hover:bg-white/15'
                  : 'bg-white/5 text-slate-500'
                : soundEnabled
                ? 'bg-slate-100 text-amber-800 hover:bg-slate-200'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Narration Voice Toggle */}
          <button
            type="button"
            onClick={onToggleVoice}
            title={voiceEnabled ? 'Matikan Suara Narasi' : 'Nyalakan Suara Narasi'}
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isDark
                ? voiceEnabled
                  ? 'bg-white/10 text-sky-300 hover:bg-white/15'
                  : 'bg-white/5 text-slate-500'
                : voiceEnabled
                ? 'bg-slate-100 text-sky-800 hover:bg-slate-200'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
