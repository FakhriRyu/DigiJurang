import React from 'react';
import type { ThemeMode } from '../types';
import warungImage from '../assets/warung_bengkulu.png';

interface KeteranganPageProps {
  themeMode?: ThemeMode;
}

export const KeteranganPage: React.FC<KeteranganPageProps> = ({
  themeMode = 'dark'
}) => {
  const isDark = themeMode === 'dark';

  return (
    <div className="flex flex-col gap-6 w-full items-center pb-10">
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl p-3 sm:p-7 border shadow-2xl overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-[#1C1E21] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Decorative Tape on Top Corners */}
        <div className="absolute top-0 left-2 sm:left-6 w-8 sm:w-12 h-4 sm:h-6 bg-amber-300/60 transform -rotate-12 border border-black/20 shadow-xs pointer-events-none"></div>
        <div className="absolute top-0 right-2 sm:right-6 w-8 sm:w-12 h-4 sm:h-6 bg-amber-300/60 transform rotate-12 border border-black/20 shadow-xs pointer-events-none"></div>

        {/* Scattered Stars on Board */}
        <div className="absolute top-12 left-4 sm:left-6 text-yellow-400 text-lg sm:text-2xl animate-pulse pointer-events-none">⭐</div>
        <div className="absolute top-36 left-6 sm:left-10 text-yellow-300 text-base sm:text-xl pointer-events-none">⭐</div>
        <div className="absolute top-12 right-4 sm:right-6 text-yellow-400 text-lg sm:text-2xl animate-pulse pointer-events-none">⭐</div>
        <div className="absolute top-36 right-6 sm:right-10 text-yellow-300 text-base sm:text-xl pointer-events-none">⭐</div>

        {/* Top Header Artwork: Smiling Sun & Rainbows */}
        <div className="flex items-center justify-between px-1 sm:px-8 mb-2 relative z-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-2xl sm:text-4xl filter drop-shadow-md">🌈</span>
            <span className="hidden sm:inline-block text-2xl animate-pulse">✨</span>
          </div>

          <div className="flex flex-col items-center -mt-1">
            <div className="relative flex items-center justify-center">
              <span className="text-3xl sm:text-5xl filter drop-shadow-lg">☀️</span>
            </div>
            <div
              className={`px-2.5 sm:px-3.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-fun shadow-xs -mt-1 ${
                isDark ? 'bg-sky-200/90 text-sky-950' : 'bg-sky-100 text-sky-950 border border-sky-300'
              }`}
            >
              DIGI JURANG
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden sm:inline-block text-2xl animate-pulse">✨</span>
            <span className="text-2xl sm:text-4xl filter drop-shadow-md">🌈</span>
          </div>
        </div>

        {/* 3D Cutout Letters Title: "KETERANGAN" */}
        <div className="text-center my-2 space-y-1.5 sm:space-y-2 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1.5 text-lg xs:text-2xl sm:text-4xl lg:text-5xl font-black font-fun tracking-wider py-1">
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white border border-white/80 shadow-[0_2px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform -rotate-3">
              K
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform rotate-2">
              E
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FBBF24] text-slate-950 border border-white/80 shadow-[0_2px_0_#B45309] sm:shadow-[0_3px_0_#B45309] transform -rotate-2">
              T
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform rotate-3">
              E
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#38BDF8] text-slate-950 border border-white/80 shadow-[0_2px_0_#0369A1] sm:shadow-[0_3px_0_#0369A1] transform -rotate-1">
              R
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#818CF8] text-white border border-white/80 shadow-[0_2px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform rotate-2">
              A
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white border border-white/80 shadow-[0_2px_0_#9D174D] sm:shadow-[0_3px_0_#9D174D] transform -rotate-2">
              N
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FDE047] text-amber-950 border border-white/80 shadow-[0_2px_0_#A16207] sm:shadow-[0_3px_0_#A16207] transform rotate-3">
              G
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform -rotate-1">
              A
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform rotate-2">
              N
            </span>
          </div>

          <p className={`text-xs sm:text-sm font-bold font-fun ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
            Daftar Menu & Harga Warung Makanan Khas Bengkulu
          </p>
        </div>

        {/* Single Photo Container */}
        <div className="pt-2 flex justify-center relative z-10">
          <div
            className={`p-2 sm:p-4 rounded-2xl sm:rounded-3xl border shadow-xl overflow-hidden max-w-4xl w-full flex justify-center ${
              isDark ? 'bg-[#282B30] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <img
              src={warungImage}
              alt="Warung Makanan Khas Bengkulu"
              className="w-full h-auto rounded-xl sm:rounded-2xl object-contain shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
