import React from 'react';
import type { ThemeMode } from '../types';
import { sound } from '../utils/sound';
import { StrawGraphic } from './StrawGraphic';
import {
  ArrowRight,
  Target,
  Sparkles,
  LayoutGrid,
  Lightbulb,
  BookOpen
} from 'lucide-react';

interface IntroPageProps {
  onGoToBoard: () => void;
  onGoToConcept: () => void;
  onGoToGuide: () => void;
  themeMode?: ThemeMode;
}

export const IntroPage: React.FC<IntroPageProps> = ({
  onGoToBoard,
  onGoToConcept,
  onGoToGuide,
  themeMode = 'dark'
}) => {
  const isDark = themeMode === 'dark';

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

        {/* 3D Cutout Letters Title: "PENDAHULUAN" */}
        <div className="text-center my-2 space-y-1.5 sm:space-y-2 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1.5 text-lg xs:text-2xl sm:text-4xl lg:text-5xl font-black font-fun tracking-wider py-1">
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white border border-white/80 shadow-[0_2px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform -rotate-3">
              P
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform rotate-2">
              E
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FBBF24] text-slate-950 border border-white/80 shadow-[0_2px_0_#B45309] sm:shadow-[0_3px_0_#B45309] transform -rotate-2">
              N
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform rotate-3">
              D
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#38BDF8] text-slate-950 border border-white/80 shadow-[0_2px_0_#0369A1] sm:shadow-[0_3px_0_#0369A1] transform -rotate-1">
              A
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#818CF8] text-white border border-white/80 shadow-[0_2px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform rotate-2">
              H
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white border border-white/80 shadow-[0_2px_0_#9D174D] sm:shadow-[0_3px_0_#9D174D] transform -rotate-2">
              U
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FDE047] text-amber-950 border border-white/80 shadow-[0_2px_0_#A16207] sm:shadow-[0_3px_0_#A16207] transform rotate-3">
              L
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform -rotate-1">
              U
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform rotate-2">
              A
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white border border-white/80 shadow-[0_2px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform -rotate-3">
              N
            </span>
          </div>

          <p className={`text-xs sm:text-sm font-bold font-fun ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
            Digital Papan Penjumlahan & Pengurangan Nilai Tempat (DIGI JURANG)
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 pt-2 relative z-10">
          {/* 1. Hero Summary Card */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-3 relative overflow-hidden transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-amber-50/70 border-amber-200 text-slate-900'
            }`}
          >
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-fun font-black tracking-wider border ${
                isDark
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-amber-200 text-amber-950 border-amber-300'
              }`}
            >
              <span>🌈</span>
              <span>MEDIA PEMBELAJARAN MATEMATIKA SD</span>
            </div>

            <h2 className={`text-xl sm:text-2xl font-black font-fun ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Selamat Datang di DIGI JURANG!
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Media pembelajaran interaktif <strong>DIGI JURANG</strong> mengadaptasi alat peraga konkret papan jurang ke dalam bentuk digital interaktif untuk membantu siswa memahami hakikat <strong>nilai tempat bilangan</strong>, operasi <strong>penjumlahan</strong>, serta <strong>pengurangan bersusun dengan teknik meminjam (*borrowing*)</strong> melalui manipulasi sedotan virtual secara konkret.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  onGoToBoard();
                }}
                className="px-5 py-3 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-fun font-black text-xs sm:text-sm shadow-[0_4px_0_#B45309] active:translate-y-1 active:shadow-none flex items-center gap-2 transition-all cursor-pointer border border-white/40"
              >
                <LayoutGrid className="w-4 h-4 text-slate-950" />
                <span>Buka Papan Jurang</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onGoToConcept();
                }}
                className="px-5 py-3 rounded-2xl bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-fun font-black text-xs sm:text-sm shadow-[0_4px_0_#0369A1] active:translate-y-1 active:shadow-none flex items-center gap-2 transition-all cursor-pointer border border-white/40"
              >
                <Lightbulb className="w-4 h-4 text-slate-950" />
                <span>Pelajari Materi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onGoToGuide();
                }}
                className="px-5 py-3 rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-slate-950 font-fun font-black text-xs sm:text-sm shadow-[0_4px_0_#065F46] active:translate-y-1 active:shadow-none flex items-center gap-2 transition-all cursor-pointer border border-white/40"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>Buku Panduan</span>
              </button>
            </div>
          </div>

          {/* 2. Tujuan Pembelajaran */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-emerald-50/60 border-emerald-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                  isDark
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40'
                    : 'bg-emerald-200 text-emerald-950 border-emerald-400'
                }`}
              >
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-black font-fun ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Tujuan Pembelajaran
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Capaian kompetensi yang dituju dalam media DIGI JURANG
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
                  isDark
                    ? 'bg-[#1F2125] border-white/5'
                    : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                  1
                </div>
                <div className="space-y-1">
                  <h3 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    Memahami Hakikat Nilai Tempat
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Siswa mampu membedakan dan menentukan nilai suatu angka pada posisi <strong>Ratusan (100)</strong>, <strong>Puluhan (10)</strong>, dan <strong>Satuan (1)</strong> pada bilangan hingga 1.000.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
                  isDark
                    ? 'bg-[#1F2125] border-white/5'
                    : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                  2
                </div>
                <div className="space-y-1">
                  <h3 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    Representasi Manipulatif Konkret
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Siswa dapat menyatakan bilangan menggunakan media konkret sedotan di mana 1 sedotan bernilai sesuai kantong penempatannya.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
                  isDark
                    ? 'bg-[#1F2125] border-white/5'
                    : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                  3
                </div>
                <div className="space-y-1">
                  <h3 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    Penguasaan Pengurangan dengan Meminjam
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Siswa memahami konsep pertukaran nilai: <strong>1 puluhan ditukar menjadi 10 satuan</strong> atau <strong>1 ratusan ditukar menjadi 10 puluhan</strong> saat bilangan yang dikurangi tidak cukup.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
                  isDark
                    ? 'bg-[#1F2125] border-white/5'
                    : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                  4
                </div>
                <div className="space-y-1">
                  <h3 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    Pembuktian Hasil secara Mandiri
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Siswa dapat membilang dan membuktikan sendiri kebenaran total hasil perhitungan sedotan pada Meja Pembuktian (*Concrete Proof*).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Pengantar Konsep Nilai Tempat (Contoh: 735) */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-amber-50/60 border-amber-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-amber-200 text-amber-950 border-amber-400'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl font-black font-fun ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Pengantar Konsep Nilai Tempat
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nilai sebuah angka ditentukan oleh tempat/kolom di mana angka itu berada
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
                Contoh: Bilangan 735
              </span>
            </div>

            {/* 3 Interactive Visual Cards for Ratusan, Puluhan, Satuan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Ratusan Card */}
              <div
                className={`p-4 rounded-2xl border shadow-md flex flex-col items-center text-center space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-orange-400/30' : 'bg-white border-orange-200'
                }`}
              >
                <div className="px-3 py-0.5 rounded-lg bg-[#FB923C] text-white font-fun font-black text-xs uppercase tracking-wider shadow-xs">
                  RATUSAN (100)
                </div>

                <div className="py-2 flex items-center justify-center min-h-[70px]">
                  <StrawGraphic color="blue" size="md" />
                </div>

                <div className="space-y-1 w-full">
                  <span className="font-fun font-black text-3xl text-orange-500 block">7</span>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>7 Ratusan = 700</p>
                  <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Tiap 1 sedotan di kantong ini mewakili <strong className="text-orange-600">100 satuan</strong>.
                  </p>
                </div>
              </div>

              {/* Puluhan Card */}
              <div
                className={`p-4 rounded-2xl border shadow-md flex flex-col items-center text-center space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-amber-400/30' : 'bg-white border-amber-200'
                }`}
              >
                <div className="px-3 py-0.5 rounded-lg bg-[#FBBF24] text-slate-950 font-fun font-black text-xs uppercase tracking-wider shadow-xs">
                  PULUHAN (10)
                </div>

                <div className="py-2 flex items-center justify-center min-h-[70px]">
                  <StrawGraphic color="yellow" size="md" />
                </div>

                <div className="space-y-1 w-full">
                  <span className="font-fun font-black text-3xl text-amber-500 block">3</span>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>3 Puluhan = 30</p>
                  <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Tiap 1 sedotan di kantong ini mewakili <strong className="text-amber-600">10 satuan</strong>.
                  </p>
                </div>
              </div>

              {/* Satuan Card */}
              <div
                className={`p-4 rounded-2xl border shadow-md flex flex-col items-center text-center space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-yellow-400/30' : 'bg-white border-yellow-200'
                }`}
              >
                <div className="px-3 py-0.5 rounded-lg bg-[#FDE047] text-slate-950 font-fun font-black text-xs uppercase tracking-wider shadow-xs">
                  SATUAN (1)
                </div>

                <div className="py-2 flex items-center justify-center min-h-[70px]">
                  <StrawGraphic color="amber" size="md" />
                </div>

                <div className="space-y-1 w-full">
                  <span className="font-fun font-black text-3xl text-yellow-600 block">5</span>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>5 Satuan = 5</p>
                  <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Tiap 1 sedotan di kantong ini mewakili <strong className="text-yellow-600">1 satuan dasar</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Math Breakdown Ribbon */}
            <div
              className={`p-3.5 rounded-2xl border text-center font-fun shadow-inner ${
                isDark
                  ? 'bg-[#181A1D] border-white/10 text-amber-300'
                  : 'bg-amber-100 border-amber-200 text-amber-950'
              }`}
            >
              <span className="text-xs sm:text-sm font-black tracking-wide">
                735 = 700 (Ratusan) + 30 (Puluhan) + 5 (Satuan)
              </span>
            </div>
          </div>

          {/* 4. Menu Cepat Akses Media */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => {
                sound.playSparkle();
                onGoToBoard();
              }}
              className={`p-5 rounded-2xl sm:rounded-3xl border shadow-lg cursor-pointer transition-all space-y-2 group ${
                isDark
                  ? 'bg-[#282B30] hover:bg-[#32363D] border-white/10 hover:border-amber-400/60'
                  : 'bg-white hover:bg-amber-50/80 border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform">
                🧮
              </div>
              <h3 className={`font-fun font-black text-base flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Papan Jurang</span>
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Mulai simulasi penjumlahan, pengurangan, meluncurkan pipet, dan membuktikan hasil di papan jurang.
              </p>
            </div>

            <div
              onClick={() => {
                sound.playClick();
                onGoToConcept();
              }}
              className={`p-5 rounded-2xl sm:rounded-3xl border shadow-lg cursor-pointer transition-all space-y-2 group ${
                isDark
                  ? 'bg-[#282B30] hover:bg-[#32363D] border-white/10 hover:border-sky-400/60'
                  : 'bg-white hover:bg-sky-50/80 border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-slate-950 flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform">
                💡
              </div>
              <h3 className={`font-fun font-black text-base flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Materi Lengkap</span>
                <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Pelajari konsep pengurangan, nilai tempat, pengurangan bersusun tanpa meminjam & dengan meminjam.
              </p>
            </div>

            <div
              onClick={() => {
                sound.playClick();
                onGoToGuide();
              }}
              className={`p-5 rounded-2xl sm:rounded-3xl border shadow-lg cursor-pointer transition-all space-y-2 group ${
                isDark
                  ? 'bg-[#282B30] hover:bg-[#32363D] border-white/10 hover:border-purple-400/60'
                  : 'bg-white hover:bg-purple-50/80 border-slate-200 hover:border-purple-400'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500 text-slate-950 flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform">
                📖
              </div>
              <h3 className={`font-fun font-black text-base flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Panduan Guru & Siswa</span>
                <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Petunjuk langkah demi langkah, peran guru dan siswa, serta panduan fitur interaktif di kelas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
