import React, { useState } from 'react';
import type { ThemeMode } from '../types';
import { sound } from '../utils/sound';
import {
  Sparkles,
  RefreshCw,
  CheckCircle,
  Coins
} from 'lucide-react';

interface PlaceValueConceptProps {
  themeMode?: ThemeMode;
}

export const PlaceValueConcept: React.FC<PlaceValueConceptProps> = ({
  themeMode = 'dark'
}) => {
  const isDark = themeMode === 'dark';

  // Interactive Borrowing Simulator: 352 - 127
  const [puluhanDemo, setPuluhanDemo] = useState<number>(5);
  const [satuanDemo, setSatuanDemo] = useState<number>(2);
  const [hasBorrowed, setHasBorrowed] = useState<boolean>(false);

  const handleBorrow = () => {
    if (puluhanDemo > 0 && !hasBorrowed) {
      setPuluhanDemo((prev) => prev - 1);
      setSatuanDemo((prev) => prev + 10);
      setHasBorrowed(true);
      sound.playSparkle();
      sound.speak('Meminjam satu puluhan. Puluhan 5 menjadi 4, satuan 2 bertambah sepuluh menjadi 12!');
    }
  };

  const handleResetBorrow = () => {
    setPuluhanDemo(5);
    setSatuanDemo(2);
    setHasBorrowed(false);
    sound.playRemove();
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center pb-10">
      {/* Board Card Container matching Papan Jurang */}
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

        {/* 3D Cutout Letters Title: "MATERI BELAJAR" */}
        <div className="text-center my-2 space-y-1.5 sm:space-y-2 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 text-lg xs:text-2xl sm:text-4xl lg:text-5xl font-black font-fun tracking-wider py-1">
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#38BDF8] text-slate-950 border border-white/80 shadow-[0_2px_0_#0369A1] sm:shadow-[0_3px_0_#0369A1] transform -rotate-2">
                M
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white border border-white/80 shadow-[0_2px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform rotate-3">
                A
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FBBF24] text-slate-950 border border-white/80 shadow-[0_2px_0_#B45309] sm:shadow-[0_3px_0_#B45309] transform -rotate-1">
                T
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform rotate-2">
                E
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform -rotate-2">
                R
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#818CF8] text-white border border-white/80 shadow-[0_2px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform rotate-1">
                I
              </span>
            </div>

            <div className="w-1.5 sm:w-4"></div>

            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white border border-white/80 shadow-[0_2px_0_#9D174D] sm:shadow-[0_3px_0_#9D174D] transform -rotate-2">
                B
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform rotate-3">
                E
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FDE047] text-amber-950 border border-white/80 shadow-[0_2px_0_#A16207] sm:shadow-[0_3px_0_#A16207] transform -rotate-1">
                L
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#38BDF8] text-slate-950 border border-white/80 shadow-[0_2px_0_#0369A1] sm:shadow-[0_3px_0_#0369A1] transform rotate-2">
                A
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform -rotate-2">
                J
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white border border-white/80 shadow-[0_2px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform rotate-1">
                A
              </span>
              <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#818CF8] text-white border border-white/80 shadow-[0_2px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform -rotate-3">
                R
              </span>
            </div>
          </div>

          <p className={`text-xs sm:text-sm font-bold font-fun ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
            Mengenal Pengurangan, Nilai Tempat & Teknik Meminjam
          </p>
        </div>

        {/* Structured Curriculum Modules */}
        <div className="space-y-6 pt-2 relative z-10">
          {/* MODUL 1: Mengenal Pengurangan */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-rose-50/60 border-rose-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-8 h-8 rounded-xl border font-fun font-black text-base flex items-center justify-center ${
                    isDark
                      ? 'bg-rose-500/20 text-rose-400 border-rose-400/40'
                      : 'bg-rose-200 text-rose-900 border-rose-300'
                  }`}
                >
                  ➖
                </span>
                <div>
                  <h2 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    1. Mengenal Pengurangan
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Mencari selisih atau sisa dari dua bilangan
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-xl font-fun font-bold text-xs border ${
                  isDark
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                    : 'bg-rose-200 text-rose-900 border-rose-300'
                }`}
              >
                Tanda Pengurangan: −
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-rose-200/80 shadow-xs'
                }`}
              >
                <h3 className={`font-fun font-bold text-sm ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                  💡 Arti Pengurangan:
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <strong>Pengurangan</strong> adalah kegiatan mencari selisih atau sisa dari dua bilangan.
                </p>
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold space-y-1 ${
                    isDark
                      ? 'bg-[#181A1D] border-white/10 text-white'
                      : 'bg-rose-50 border-rose-200 text-slate-800'
                  }`}
                >
                  <span className={`font-black font-fun text-sm block ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                    Contoh: 500 − 200 = 300
                  </span>
                  <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Artinya, jika kita mempunyai <strong>500 benda</strong> kemudian diambil <strong>200 benda</strong>, maka tersisa <strong>300 benda</strong>.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <h3 className={`font-fun font-bold text-sm ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  📊 Dalam Bentuk Nilai Tempat:
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center pt-1 font-fun">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-[#181A1D] border-orange-400/20' : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <span className="text-[10px] text-orange-500 font-bold block">RATUSAN</span>
                    <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>5 − 2 = 3</span>
                    <span className={`text-[10px] block ${isDark ? 'text-orange-300/80' : 'text-orange-700'}`}>(300)</span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-[#181A1D] border-amber-400/20' : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <span className="text-[10px] text-amber-500 font-bold block">PULUHAN</span>
                    <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>0 − 0 = 0</span>
                    <span className={`text-[10px] block ${isDark ? 'text-amber-300/80' : 'text-amber-700'}`}>(0)</span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-[#181A1D] border-yellow-400/20' : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <span className="text-[10px] text-yellow-600 font-bold block">SATUAN</span>
                    <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>0 − 0 = 0</span>
                    <span className={`text-[10px] block ${isDark ? 'text-yellow-300/80' : 'text-yellow-700'}`}>(0)</span>
                  </div>
                </div>
                <div className={`text-center text-xs font-black font-fun pt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  Jadi: 500 − 200 = 300
                </div>
              </div>
            </div>
          </div>

          {/* MODUL 2: Nilai Tempat Bilangan (Sampai 1.000) */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-amber-50/60 border-amber-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-8 h-8 rounded-xl border font-fun font-black text-base flex items-center justify-center ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-amber-200 text-amber-950 border-amber-400'
                  }`}
                >
                  🔢
                </span>
                <div>
                  <h2 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    2. Nilai Tempat Bilangan
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Memahami posisi angka hingga bilangan 1.000
                  </p>
                </div>
              </div>
              <span
                className={`px-3.5 py-1 rounded-full font-fun font-bold text-xs border ${
                  isDark
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'bg-amber-200 text-amber-950 border-amber-400'
                }`}
              >
                Contoh: 735
              </span>
            </div>

            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Setiap angka pada bilangan memiliki nilai yang berbeda tergantung letak posisinya:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
              <div
                className={`p-4 rounded-2xl border space-y-1 shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-orange-400/30' : 'bg-white border-orange-200'
                }`}
              >
                <span className="text-xs font-fun font-bold text-orange-500 block">KOLOM RATUSAN</span>
                <span className="font-fun font-black text-4xl text-orange-500">7</span>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-800'}`}>7 Ratusan = 700</span>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1 shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-amber-400/30' : 'bg-white border-amber-200'
                }`}
              >
                <span className="text-xs font-fun font-bold text-amber-500 block">KOLOM PULUHAN</span>
                <span className="font-fun font-black text-4xl text-amber-500">3</span>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-800'}`}>3 Puluhan = 30</span>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1 shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-yellow-400/30' : 'bg-white border-yellow-200'
                }`}
              >
                <span className="text-xs font-fun font-bold text-yellow-600 block">KOLOM SATUAN</span>
                <span className="font-fun font-black text-4xl text-yellow-500">5</span>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-800'}`}>5 Satuan = 5</span>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center font-fun font-black text-sm shadow-inner ${
                isDark
                  ? 'bg-[#181A1D] border-white/10 text-amber-300'
                  : 'bg-amber-100 border-amber-200 text-amber-950'
              }`}
            >
              Artinya: 735 = 700 + 30 + 5
            </div>
          </div>

          {/* MODUL 3: Pengurangan Tanpa Meminjam */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-emerald-50/60 border-emerald-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-8 h-8 rounded-xl border font-fun font-black text-base flex items-center justify-center ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40'
                      : 'bg-emerald-200 text-emerald-950 border-emerald-400'
                  }`}
                >
                  ✨
                </span>
                <div>
                  <h2 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    3. Pengurangan Tanpa Meminjam
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Angka atas cukup untuk langsung dikurangi angka bawah
                  </p>
                </div>
              </div>
              <span
                className={`px-3.5 py-1 rounded-full font-fun font-black text-xs border ${
                  isDark
                    ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40'
                    : 'bg-emerald-200 text-emerald-950 border-emerald-400'
                }`}
              >
                Contoh: 567 − 234 = 333
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Step Satuan */}
              <div
                className={`p-4 rounded-2xl border space-y-1.5 text-center shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-yellow-400/30' : 'bg-white border-yellow-200'
                }`}
              >
                <span className="text-xs font-fun font-bold text-yellow-950 px-2.5 py-0.5 rounded-full bg-[#FDE047] inline-block">
                  Langkah 1: Satuan
                </span>
                <div className={`font-fun font-black text-2xl py-1 ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>
                  7 − 4 = 3
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  7 satuan diambil 4 satuan, tersisa <strong className="text-yellow-600">3</strong>.
                </p>
              </div>

              {/* Step Puluhan */}
              <div
                className={`p-4 rounded-2xl border space-y-1.5 text-center shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-sky-400/30' : 'bg-white border-sky-200'
                }`}
              >
                <span className="text-xs font-fun font-bold text-sky-950 px-2.5 py-0.5 rounded-full bg-[#38BDF8] inline-block">
                  Langkah 2: Puluhan
                </span>
                <div className={`font-fun font-black text-2xl py-1 ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                  6 − 3 = 3
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  6 puluhan diambil 3 puluhan, tersisa <strong className="text-sky-600">3</strong>.
                </p>
              </div>

              {/* Step Ratusan */}
              <div
                className={`p-4 rounded-2xl border space-y-1.5 text-center shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-emerald-400/30' : 'bg-white border-emerald-200'
                }`}
              >
                <span className="text-xs font-fun font-bold text-emerald-950 px-2.5 py-0.5 rounded-full bg-[#34D399] inline-block">
                  Langkah 3: Ratusan
                </span>
                <div className={`font-fun font-black text-2xl py-1 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                  5 − 2 = 3
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  5 ratusan diambil 2 ratusan, tersisa <strong className="text-emerald-600">3</strong>.
                </p>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center font-fun font-black text-sm shadow-inner ${
                isDark
                  ? 'bg-[#181A1D] border-white/10 text-emerald-300'
                  : 'bg-emerald-100 border-emerald-200 text-emerald-950'
              }`}
            >
              ✅ Jadi: 567 − 234 = 333
            </div>
          </div>

          {/* MODUL 4: Pengurangan Dengan Meminjam (Borrowing) */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-5 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-amber-50/60 border-amber-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-8 h-8 rounded-xl border font-fun font-black text-base flex items-center justify-center ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-amber-200 text-amber-950 border-amber-400'
                  }`}
                >
                  ⚡
                </span>
                <div>
                  <h2 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    4. Pengurangan Dengan Meminjam (*Borrowing*)
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Ketika angka yang akan dikurangi lebih kecil daripada angka pengurang
                  </p>
                </div>
              </div>
              <span
                className={`px-3.5 py-1 rounded-full font-fun font-black text-xs border ${
                  isDark
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'bg-amber-200 text-amber-950 border-amber-400'
                }`}
              >
                Contoh: 352 − 127 = 225
              </span>
            </div>

            {/* Kunci Emas Meminjam */}
            <div
              className={`p-4 rounded-2xl border space-y-2 shadow-inner ${
                isDark
                  ? 'bg-[#181A1D] border-white/10 text-white'
                  : 'bg-amber-100/90 border-amber-200 text-slate-900'
              }`}
            >
              <div className={`flex items-center gap-2 font-fun font-black text-sm ${isDark ? 'text-amber-300' : 'text-amber-950'}`}>
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>KUNCI EMAS MEMINJAM:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                <div
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    isDark ? 'bg-[#282B30] border-white/10 text-white' : 'bg-white border-amber-200 text-slate-800'
                  }`}
                >
                  <span className="text-lg">⭐</span>
                  <span><strong className="text-amber-500">1 puluhan = 10 satuan</strong></span>
                </div>
                <div
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    isDark ? 'bg-[#282B30] border-white/10 text-white' : 'bg-white border-amber-200 text-slate-800'
                  }`}
                >
                  <span className="text-lg">⭐</span>
                  <span><strong className="text-orange-500">1 ratusan = 10 puluhan</strong></span>
                </div>
              </div>
            </div>

            {/* Simulasi Interaktif Meminjam */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 shadow-md transition-colors ${
                isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className={`font-fun font-black text-sm flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span>⚡ Simulasi Interaktif: Pinjam Satuan (352 − 127)</span>
                </h3>
                <button
                  type="button"
                  onClick={handleResetBorrow}
                  className={`px-3 py-1 rounded-xl text-xs font-bold font-fun border flex items-center gap-1 shadow-xs transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#282B30] hover:bg-[#32363D] text-slate-300 hover:text-white border-[#3F4248]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  <RefreshCw className="w-3 h-3" /> Reset Simulasi
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div
                  className={`p-3.5 rounded-2xl border space-y-1 ${
                    isDark ? 'bg-[#181A1D] border-sky-400/30' : 'bg-sky-50 border-sky-200'
                  }`}
                >
                  <span className={`text-xs font-bold font-fun ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>PULUHAN (10)</span>
                  <div className={`font-fun font-black text-3xl ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                    {puluhanDemo}
                  </div>
                  <span className={`text-[11px] block font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {hasBorrowed ? 'Berkurang 1 ➔ Sisa 4 Puluhan' : 'Awal: 5 Puluhan'}
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border space-y-1 ${
                    isDark ? 'bg-[#181A1D] border-amber-400/30' : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <span className={`text-xs font-bold font-fun ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>SATUAN (1)</span>
                  <div className={`font-fun font-black text-3xl ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                    {satuanDemo}
                  </div>
                  <span className={`text-[11px] block font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {hasBorrowed ? 'Mendapat +10 ➔ Jadi 12 Satuan' : 'Awal: 2 Satuan (Kurang jika − 7)'}
                  </span>
                </div>
              </div>

              {!hasBorrowed ? (
                <button
                  type="button"
                  onClick={handleBorrow}
                  className="w-full py-3 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-fun font-black text-sm shadow-[0_4px_0_#B45309] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Coba Klik: Pinjam 1 Puluhan ke Satuan! ⚡</span>
                </button>
              ) : (
                <div
                  className={`p-3.5 rounded-2xl text-xs font-bold font-fun flex items-center justify-center gap-2 border ${
                    isDark
                      ? 'bg-[#181A1D] text-emerald-300 border-white/10'
                      : 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Satuan menjadi 12, kini cukup untuk dikurangi 7 (12 − 7 = 5). Puluhan sisa 4 (4 − 2 = 2). Ratusan 3 − 1 = 2. Hasil = 225!</span>
                </div>
              )}
            </div>
          </div>

          {/* MODUL 5: Cara Mudah Mengingat & Kehidupan Sehari-hari */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cara Mudah Mengingat */}
            <div
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-inner space-y-3 transition-colors ${
                isDark
                  ? 'bg-[#282B30] border-white/10 text-white'
                  : 'bg-amber-50/60 border-amber-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 font-fun font-black text-base pb-2 border-b border-white/10">
                <span className="text-xl">⭐</span>
                <span>Cara Mudah Mengingat</span>
              </div>

              <div className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <div
                  className={`p-3 rounded-xl border font-semibold space-y-1 ${
                    isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-amber-200/70'
                  }`}
                >
                  <span className="font-bold text-amber-500 font-fun block">Urutan Pengerjaan:</span>
                  <p className={`font-black text-sm ${isDark ? 'text-amber-400' : 'text-amber-900'}`}>
                    SATUAN ➔ PULUHAN ➔ RATUSAN
                  </p>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Selalu mulai menghitung dari sebelah paling kanan (satuan).
                  </p>
                </div>

                <div
                  className={`p-3 rounded-xl border font-semibold space-y-1 ${
                    isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-sky-200/70'
                  }`}
                >
                  <span className="font-bold text-sky-500 font-fun block">Jika Angka Atas Lebih Kecil:</span>
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    👉 <strong>Pinjam 1 dari sebelah kiri</strong> (1 puluhan menjadi 10 satuan / 1 ratusan menjadi 10 puluhan).
                  </p>
                </div>
              </div>
            </div>

            {/* Pengurangan dalam Kehidupan Sehari-hari */}
            <div
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-inner space-y-3 transition-colors ${
                isDark
                  ? 'bg-[#282B30] border-white/10 text-white'
                  : 'bg-emerald-50/60 border-emerald-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 font-fun font-black text-base pb-2 border-b border-white/10">
                <Coins className="w-5 h-5 text-emerald-500" />
                <span>Pengurangan Sehari-hari</span>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                  isDark ? 'bg-[#1F2125] border-white/5 text-slate-300' : 'bg-white border-emerald-200/70 text-slate-700'
                }`}
              >
                <h4 className={`font-fun font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>Contoh Uang Kembalian Dina:</h4>
                <p className="leading-relaxed">
                  Dina mempunyai uang <strong>Rp500</strong>. Ia membeli jajanan seharga <strong>Rp350</strong>. Berapa uang kembalian Dina?
                </p>
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-between font-fun ${
                    isDark ? 'bg-[#181A1D] border-white/10 text-white' : 'bg-emerald-50 border-emerald-200 text-slate-900'
                  }`}
                >
                  <span className="font-bold">Rp500 − Rp350 =</span>
                  <span className="font-black text-base text-emerald-500">💰 Rp150</span>
                </div>
                <p className={`text-[11px] font-semibold text-center ${isDark ? 'text-emerald-300/90' : 'text-emerald-800'}`}>
                  Jadi, uang kembalian yang diterima Dina adalah Rp150.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
