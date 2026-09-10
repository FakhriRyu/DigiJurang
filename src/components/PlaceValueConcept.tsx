import React, { useState } from 'react';
import type { ThemeMode } from '../types';
import { sound } from '../utils/sound';
import {
  Sparkles,
  RefreshCw,
  CheckCircle,
  Coins,
  BookOpen,
  ShoppingBag,
  Store,
  ArrowRight
} from 'lucide-react';

interface PlaceValueConceptProps {
  themeMode?: ThemeMode;
}

type ConceptCategory = 'all' | 'penjumlahan' | 'pengurangan' | 'nilai-tempat';

export const PlaceValueConcept: React.FC<PlaceValueConceptProps> = ({
  themeMode = 'light'
}) => {
  const isDark = themeMode === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<ConceptCategory>('all');

  // Interactive Addition with Carrying Simulator: 268 + 157 = 425
  const [addStep, setAddStep] = useState<number>(0); // 0: initial, 1: satuan, 2: puluhan, 3: ratusan (done)

  const handleNextAddStep = () => {
    if (addStep < 3) {
      const next = addStep + 1;
      setAddStep(next);
      sound.playSparkle();
      if (next === 1) {
        sound.speak('Langkah satu: 8 ditambah 7 sama dengan 15. Tulis angka 5 pada satuan, simpan 1 di atas puluhan!');
      } else if (next === 2) {
        sound.speak('Langkah dua: 6 ditambah 5 ditambah simpanan 1 sama dengan 12. Tulis 2 pada puluhan, simpan 1 di atas ratusan!');
      } else if (next === 3) {
        sound.speak('Langkah tiga: 2 ditambah 1 ditambah simpanan 1 sama dengan 4. Hasil akhirnya adalah 425!');
      }
    }
  };

  const handleResetAddStep = () => {
    setAddStep(0);
    sound.playRemove();
  };

  // Interactive Subtraction Borrowing Simulator: 352 - 127
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
            Mengenal Penjumlahan, Pengurangan, Nilai Tempat & Teknik Menghitung
          </p>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 pb-1">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black font-fun transition-all cursor-pointer border ${
                selectedCategory === 'all'
                  ? isDark
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105'
                    : 'bg-amber-400 text-slate-950 border-amber-500 shadow-md scale-105'
                  : isDark
                  ? 'bg-[#282B30] text-slate-300 hover:bg-[#32363D] border-white/10'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              📚 Semua Materi
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory('penjumlahan');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black font-fun transition-all cursor-pointer border ${
                selectedCategory === 'penjumlahan'
                  ? isDark
                    ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-md scale-105'
                    : 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                  : isDark
                  ? 'bg-[#282B30] text-slate-300 hover:bg-[#32363D] border-white/10'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              ➕ Penjumlahan (+)
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory('pengurangan');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black font-fun transition-all cursor-pointer border ${
                selectedCategory === 'pengurangan'
                  ? isDark
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md scale-105'
                    : 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                  : isDark
                  ? 'bg-[#282B30] text-slate-300 hover:bg-[#32363D] border-white/10'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              ➖ Pengurangan (−)
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory('nilai-tempat');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black font-fun transition-all cursor-pointer border ${
                selectedCategory === 'nilai-tempat'
                  ? isDark
                    ? 'bg-sky-400 text-slate-950 border-sky-300 shadow-md scale-105'
                    : 'bg-sky-500 text-white border-sky-600 shadow-md scale-105'
                  : isDark
                  ? 'bg-[#282B30] text-slate-300 hover:bg-[#32363D] border-white/10'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              🔢 Nilai Tempat
            </button>
          </div>
        </div>

        {/* Structured Curriculum Modules */}
        <div className="space-y-6 pt-2 relative z-10">

          {/* ========================================================================= */}
          {/* BAGIAN 1: MATERI PENJUMLAHAN LENGKAP                                     */}
          {/* ========================================================================= */}
          {(selectedCategory === 'all' || selectedCategory === 'penjumlahan') && (
            <div className="space-y-6">
              {/* HEADER BADGE SECTION PENJUMLAHAN */}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-9 h-9 rounded-2xl bg-emerald-500 text-white font-fun font-black text-xl flex items-center justify-center shadow-md">
                  ➕
                </span>
                <div>
                  <h2 className={`font-fun font-black text-xl sm:text-2xl ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Modul Pembelajaran: Penjumlahan Bilangan
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Konsep dasar, nilai tempat, penjumlahan tanpa menyimpan, dengan menyimpan, dan studi kasus
                  </p>
                </div>
              </div>

              {/* A. MENGENAL PENJUMLAHAN */}
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
                          : 'bg-emerald-200 text-emerald-950 border-emerald-300'
                      }`}
                    >
                      A
                    </span>
                    <div>
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Mengenal Penjumlahan
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Menggabungkan atau menambahkan dua bilangan atau lebih
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl font-fun font-bold text-xs border ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-emerald-200 text-emerald-950 border-emerald-300'
                    }`}
                  >
                    Tanda Penjumlahan: +
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Definisi & Contoh Apel */}
                  <div
                    className={`p-4 rounded-2xl border space-y-3 transition-colors ${
                      isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/80 shadow-xs'
                    }`}
                  >
                    <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                      💡 Arti Penjumlahan:
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <strong>Penjumlahan</strong> adalah kegiatan <strong>menggabungkan atau menambahkan dua bilangan atau lebih</strong> untuk mendapatkan jumlah total.
                    </p>

                    <div
                      className={`p-3.5 rounded-xl border space-y-2 ${
                        isDark ? 'bg-[#181A1D] border-white/10' : 'bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      <span className="text-xs font-fun font-bold text-emerald-600 block">Contoh dengan Benda Nyata:</span>
                      <div className="flex items-center justify-center gap-2 text-xl py-1 bg-white dark:bg-black/30 rounded-xl p-2 border border-dashed border-emerald-400">
                        <span>🍎🍎🍎</span>
                        <span className="font-black text-emerald-500 text-2xl">+</span>
                        <span>🍎🍎</span>
                        <span className="font-black text-slate-400 text-2xl">=</span>
                        <span>🍎🍎🍎🍎🍎</span>
                      </div>
                      <p className={`text-xs text-center font-fun font-black ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        3 + 2 = 5 (Artinya 3 apel digabung 2 apel menjadi 5 apel)
                      </p>
                    </div>
                  </div>

                  {/* Penjumlahan sampai 1.000 */}
                  <div
                    className={`p-4 rounded-2xl border space-y-3 transition-colors ${
                      isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                      📦 Penjumlahan Bilangan sampai 1.000:
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Penjumlahan dapat dilakukan pada bilangan yang lebih besar (ratusan hingga ribuan).
                    </p>

                    <div
                      className={`p-3.5 rounded-xl border space-y-2 ${
                        isDark ? 'bg-[#181A1D] border-white/10' : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-fun">
                        <span className="text-xs font-bold text-amber-600">Contoh:</span>
                        <span className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          125 + 234 = 359
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Artinya, jika ada <strong>125 benda</strong> kemudian ditambah <strong>234 benda</strong>, jumlah semuanya adalah <strong>359 benda</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* B. MENGENAL NILAI TEMPAT BILANGAN */}
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
                      B
                    </span>
                    <div>
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Mengenal Nilai Tempat Bilangan
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Syarat utama sebelum melakukan operasi penjumlahan
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl font-fun font-bold text-xs border ${
                      isDark
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-amber-200 text-amber-950 border-amber-400'
                    }`}
                  >
                    Contoh: Bilangan 345
                  </span>
                </div>

                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Bilangan sampai 1.000 memiliki tiga tempat dasar: <strong>Ratusan</strong>, <strong>Puluhan</strong>, dan <strong>Satuan</strong>.
                </p>

                {/* Tabel Nilai Tempat */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 text-center">
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl border space-y-1 shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-orange-400/30' : 'bg-white border-orange-200'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-fun font-bold text-orange-500 block">RATUSAN</span>
                    <span className="font-fun font-black text-3xl sm:text-4xl text-orange-500">3</span>
                    <span className={`text-[11px] sm:text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      3 Ratusan = <strong>300</strong>
                    </span>
                  </div>

                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl border space-y-1 shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-amber-400/30' : 'bg-white border-amber-200'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-fun font-bold text-amber-500 block">PULUHAN</span>
                    <span className="font-fun font-black text-3xl sm:text-4xl text-amber-500">4</span>
                    <span className={`text-[11px] sm:text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      4 Puluhan = <strong>40</strong>
                    </span>
                  </div>

                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl border space-y-1 shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-yellow-400/30' : 'bg-white border-yellow-200'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-fun font-bold text-yellow-600 block">SATUAN</span>
                    <span className="font-fun font-black text-3xl sm:text-4xl text-yellow-500">5</span>
                    <span className={`text-[11px] sm:text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      5 Satuan = <strong>5</strong>
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border text-center font-fun font-black text-sm shadow-inner ${
                    isDark
                      ? 'bg-[#181A1D] border-white/10 text-amber-300'
                      : 'bg-amber-100 border-amber-200 text-amber-950'
                  }`}
                >
                  Jadi: 345 = 300 + 40 + 5
                </div>

                {/* Aturan Sejajar */}
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-amber-200/80 shadow-xs'
                  }`}
                >
                  <h4 className={`font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                    <span>⚠️ INGAT ATURAN SEJAJAR!</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold">
                    <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-400/30 text-orange-600 dark:text-orange-300 flex items-center gap-1.5">
                      <span>➡️</span> Ratusan sejajar Ratusan
                    </div>
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                      <span>➡️</span> Puluhan sejajar Puluhan
                    </div>
                    <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-400/30 text-yellow-700 dark:text-yellow-300 flex items-center gap-1.5">
                      <span>➡️</span> Satuan sejajar Satuan
                    </div>
                  </div>
                </div>
              </div>

              {/* C. PENJUMLAHAN TANPA MENYIMPAN */}
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
                          : 'bg-emerald-200 text-emerald-950 border-emerald-300'
                      }`}
                    >
                      C
                    </span>
                    <div>
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Penjumlahan Tanpa Menyimpan
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Hasil penjumlahan pada setiap tempat tidak mencapai 10 (&lt; 10)
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl font-fun font-bold text-xs border ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-emerald-200 text-emerald-950 border-emerald-300'
                    }`}
                  >
                    Contoh: 234 + 125 = 359
                  </span>
                </div>

                {/* 3 Langkah Satuan, Puluhan, Ratusan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    className={`p-4 rounded-2xl border space-y-1.5 text-center shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-yellow-400/30' : 'bg-white border-yellow-200'
                    }`}
                  >
                    <span className="text-xs font-fun font-bold text-yellow-950 px-2.5 py-0.5 rounded-full bg-[#FDE047] inline-block">
                      Langkah 1: Satuan
                    </span>
                    <div className={`font-fun font-black text-2xl py-1 ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>
                      4 + 5 = 9
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Jumlahkan kolom paling kanan: 4 satuan + 5 satuan = <strong className="text-yellow-600">9</strong>.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border space-y-1.5 text-center shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-sky-400/30' : 'bg-white border-sky-200'
                    }`}
                  >
                    <span className="text-xs font-fun font-bold text-sky-950 px-2.5 py-0.5 rounded-full bg-[#38BDF8] inline-block">
                      Langkah 2: Puluhan
                    </span>
                    <div className={`font-fun font-black text-2xl py-1 ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                      3 + 2 = 5
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Jumlahkan kolom tengah: 3 puluhan + 2 puluhan = <strong className="text-sky-600">5</strong>.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border space-y-1.5 text-center shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-emerald-400/30' : 'bg-white border-emerald-200'
                    }`}
                  >
                    <span className="text-xs font-fun font-bold text-emerald-950 px-2.5 py-0.5 rounded-full bg-[#34D399] inline-block">
                      Langkah 3: Ratusan
                    </span>
                    <div className={`font-fun font-black text-2xl py-1 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      2 + 1 = 3
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Jumlahkan kolom kiri: 2 ratusan + 1 ratusan = <strong className="text-emerald-600">3</strong>.
                    </p>
                  </div>
                </div>

                {/* Susun Bersusun & Contoh Lain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div
                    className={`p-3.5 rounded-2xl border font-mono text-center text-xs sm:text-sm ${
                      isDark ? 'bg-[#181A1D] border-white/10' : 'bg-white border-emerald-200'
                    }`}
                  >
                    <div className="text-xs font-fun font-bold text-emerald-600 mb-1">Susunan Bersusun:</div>
                    <pre className="font-bold text-base leading-relaxed">
{`   2 3 4
+  1 2 5
---------
   3 5 9`}
                    </pre>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border font-mono text-center text-xs sm:text-sm ${
                      isDark ? 'bg-[#181A1D] border-white/10' : 'bg-white border-emerald-200'
                    }`}
                  >
                    <div className="text-xs font-fun font-bold text-emerald-600 mb-1">Contoh Lain (321 + 146):</div>
                    <pre className="font-bold text-base leading-relaxed">
{`   3 2 1
+  1 4 6
---------
   4 6 7`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* D. PENJUMLAHAN DENGAN MENYIMPAN */}
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
                      D
                    </span>
                    <div>
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Penjumlahan dengan Menyimpan (*Carrying*)
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Ketika hasil penjumlahan pada satu tempat mencapai 10 atau lebih (&ge; 10)
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl font-fun font-bold text-xs border ${
                      isDark
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-amber-200 text-amber-950 border-amber-400'
                    }`}
                  >
                    Contoh: 268 + 157 = 425
                  </span>
                </div>

                {/* Simulasi Interaktif Menyimpan */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 shadow-md transition-colors ${
                    isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className={`font-fun font-black text-sm flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Simulasi Interaktif: Langkah demi Langkah Menyimpan (268 + 157)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={handleResetAddStep}
                      className={`px-3 py-1 rounded-xl text-xs font-bold font-fun border flex items-center gap-1 shadow-xs transition-all cursor-pointer ${
                        isDark
                          ? 'bg-[#282B30] hover:bg-[#32363D] text-slate-300 hover:text-white border-[#3F4248]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" /> Ulangi Simulasi
                    </button>
                  </div>

                  {/* Visual Step Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center pt-1">
                    {/* Langkah 1 Satuan */}
                    <div
                      className={`p-3.5 rounded-2xl border transition-all ${
                        addStep >= 1
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-400/50 shadow-md'
                            : 'bg-amber-100/80 border-amber-400 shadow-md'
                          : isDark
                          ? 'bg-white/5 border-white/10 opacity-50'
                          : 'bg-slate-50 border-slate-200 opacity-50'
                      }`}
                    >
                      <span className="text-[10px] font-fun font-black uppercase px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 inline-block mb-1">
                        1. Satuan: 8 + 7 = 15
                      </span>
                      <div className="text-xs font-semibold py-1">
                        Tulis <strong>5</strong> di satuan,<br />
                        <span className="text-amber-500 font-bold">Simpan 1</span> di atas puluhan.
                      </div>
                    </div>

                    {/* Langkah 2 Puluhan */}
                    <div
                      className={`p-3.5 rounded-2xl border transition-all ${
                        addStep >= 2
                          ? isDark
                            ? 'bg-sky-500/20 border-sky-400/50 shadow-md'
                            : 'bg-sky-100/80 border-sky-400 shadow-md'
                          : isDark
                          ? 'bg-white/5 border-white/10 opacity-50'
                          : 'bg-slate-50 border-slate-200 opacity-50'
                      }`}
                    >
                      <span className="text-[10px] font-fun font-black uppercase px-2 py-0.5 rounded-full bg-sky-400 text-slate-950 inline-block mb-1">
                        2. Puluhan: 6 + 5 + 1 = 12
                      </span>
                      <div className="text-xs font-semibold py-1">
                        Tulis <strong>2</strong> di puluhan,<br />
                        <span className="text-sky-500 font-bold">Simpan 1</span> di atas ratusan.
                      </div>
                    </div>

                    {/* Langkah 3 Ratusan */}
                    <div
                      className={`p-3.5 rounded-2xl border transition-all ${
                        addStep >= 3
                          ? isDark
                            ? 'bg-emerald-500/20 border-emerald-400/50 shadow-md'
                            : 'bg-emerald-100/80 border-emerald-400 shadow-md'
                          : isDark
                          ? 'bg-white/5 border-white/10 opacity-50'
                          : 'bg-slate-50 border-slate-200 opacity-50'
                      }`}
                    >
                      <span className="text-[10px] font-fun font-black uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 inline-block mb-1">
                        3. Ratusan: 2 + 1 + 1 = 4
                      </span>
                      <div className="text-xs font-semibold py-1">
                        Tulis <strong>4</strong> di ratusan.<br />
                        <strong className="text-emerald-500">Hasil Total = 425!</strong>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Trigger Button */}
                  {addStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextAddStep}
                      className="w-full py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-fun font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40"
                    >
                      <span>
                        {addStep === 0 && '▶️ Klik untuk Mulai: Hitung Satuan (8 + 7)'}
                        {addStep === 1 && '▶️ Lanjutkan: Hitung Puluhan + Simpanan (6 + 5 + 1)'}
                        {addStep === 2 && '▶️ Terakhir: Hitung Ratusan + Simpanan (2 + 1 + 1)'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold font-fun flex items-center justify-center gap-2 border ${
                        isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Selesai! 268 + 157 = 425. Semua nilai tempat telah terhitung dengan benar! 🎉</span>
                    </div>
                  )}
                </div>
              </div>

              {/* E. CARA MUDAH MENGINGAT PENJUMLAHAN & F. TIPS 5 LANGKAH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* E. Cara Mudah Mengingat */}
                <div
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-inner space-y-3 transition-colors ${
                    isDark
                      ? 'bg-[#282B30] border-white/10 text-white'
                      : 'bg-amber-50/60 border-amber-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fun font-black text-base pb-2 border-b border-white/10">
                    <span className="text-xl">⭐</span>
                    <span>E. Cara Mudah Mengingat</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div
                      className={`p-3 rounded-xl border font-semibold space-y-1 ${
                        isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-amber-200/70 shadow-xs'
                      }`}
                    >
                      <span className="text-amber-500 font-bold font-fun block">Urutan dari Kanan ke Kiri:</span>
                      <p className={`font-black text-sm ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                        "SATUAN ➔ PULUHAN ➔ RATUSAN"
                      </p>
                      <ol className={`list-decimal list-inside space-y-0.5 text-[11px] pt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <li><strong>SATUAN</strong> → jumlahkan dulu</li>
                        <li><strong>PULUHAN</strong> → lanjutkan</li>
                        <li><strong>RATUSAN</strong> → terakhir</li>
                      </ol>
                    </div>

                    <div
                      className={`p-3 rounded-xl border font-semibold space-y-1 ${
                        isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-sky-200/70 shadow-xs'
                      }`}
                    >
                      <span className="text-sky-500 font-bold font-fun block">🧠 Rumus Emas Menyimpan:</span>
                      <p className={`font-black text-xs sm:text-sm ${isDark ? 'text-sky-300' : 'text-sky-900'}`}>
                        "Belakang ditulis, depan disimpan."
                      </p>
                      <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Contoh: <strong>7 + 8 = 15</strong> → Tulis <strong>5</strong> di bawah, Simpan <strong>1</strong> di atas kolom berikutnya.
                      </p>
                    </div>
                  </div>
                </div>

                {/* F. Tips Menjumlahkan dengan Benar (5 Langkah) */}
                <div
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-inner space-y-3 transition-colors ${
                    isDark
                      ? 'bg-[#282B30] border-white/10 text-white'
                      : 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fun font-black text-base pb-2 border-b border-white/10">
                    <span className="text-xl">💡</span>
                    <span>F. Tips 5 Langkah Mudah</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 dark:bg-black/20">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">1</span>
                      <span><strong>Susun</strong>: Sejajarkan angka sesuai nilai tempat.</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 dark:bg-black/20">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">2</span>
                      <span><strong>Mulai dari Kanan</strong>: Jumlahkan dari satuan.</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 dark:bg-black/20">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">3</span>
                      <span><strong>Periksa Hasil</strong>: Jika &ge; 10, lakukan menyimpan.</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 dark:bg-black/20">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">4</span>
                      <span><strong>Lanjutkan</strong>: Jumlahkan puluhan lalu ratusan.</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 dark:bg-black/20">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">5</span>
                      <span><strong>Cek Kembali</strong>: Pastikan semua kolom tepat.</span>
                    </div>

                    <div
                      className={`mt-2 p-2 rounded-xl text-center font-fun font-black text-[11px] border ${
                        isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      Kata Kunci: Susun ➔ Satuan ➔ Puluhan ➔ Ratusan ➔ Cek
                    </div>
                  </div>
                </div>
              </div>

              {/* G. PENJUMLAHAN DALAM KEHIDUPAN SEHARI-HARI */}
              <div
                className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
                  isDark
                    ? 'bg-[#282B30] border-white/10 text-white'
                    : 'bg-sky-50/60 border-sky-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-8 h-8 rounded-xl border font-fun font-black text-base flex items-center justify-center ${
                        isDark
                          ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                          : 'bg-sky-200 text-sky-950 border-sky-400'
                      }`}
                    >
                      G
                    </span>
                    <div>
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Penjumlahan dalam Kehidupan Sehari-hari
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Contoh nyata yang sering kita temui di sekitar kita
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Contoh 1: Belanja Warung */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-sky-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-sky-500" />
                      <h4 className={`font-fun font-black text-xs sm:text-sm ${isDark ? 'text-sky-300' : 'text-sky-900'}`}>
                        1. Belanja di Warung
                      </h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Rani membeli <strong>Bakso (Rp125)</strong> dan <strong>Sosis (Rp150)</strong>.
                    </p>
                    <div
                      className={`p-2.5 rounded-xl border font-fun text-xs flex items-center justify-between font-bold ${
                        isDark ? 'bg-[#181A1D] border-white/10 text-white' : 'bg-sky-50 border-sky-200 text-slate-800'
                      }`}
                    >
                      <span>125 + 150 =</span>
                      <span className="text-sm font-black text-sky-500">Rp275</span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Rani membayar Rp275.</p>
                  </div>

                  {/* Contoh 2: Membeli Makanan */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-sky-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-amber-500" />
                      <h4 className={`font-fun font-black text-xs sm:text-sm ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                        2. Membeli Jajanan
                      </h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Budi membeli <strong>Telur (Rp100)</strong>, <strong>Ceker (Rp175)</strong>, & <strong>Makaroni (Rp125)</strong>.
                    </p>
                    <div
                      className={`p-2.5 rounded-xl border font-fun text-xs flex items-center justify-between font-bold ${
                        isDark ? 'bg-[#181A1D] border-white/10 text-white' : 'bg-amber-50 border-amber-200 text-slate-800'
                      }`}
                    >
                      <span>100 + 175 + 125 =</span>
                      <span className="text-sm font-black text-amber-500">Rp400</span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Budi membayar Rp400.</p>
                  </div>

                  {/* Contoh 3: Jumlah Buku */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 shadow-md transition-colors ${
                      isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-sky-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      <h4 className={`font-fun font-black text-xs sm:text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                        3. Jumlah Buku Rak
                      </h4>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Rak pertama ada <strong>125 buku</strong>, rak kedua ada <strong>235 buku</strong>.
                    </p>
                    <div
                      className={`p-2.5 rounded-xl border font-fun text-xs flex items-center justify-between font-bold ${
                        isDark ? 'bg-[#181A1D] border-white/10 text-white' : 'bg-emerald-50 border-emerald-200 text-slate-800'
                      }`}
                    >
                      <span>125 + 235 =</span>
                      <span className="text-sm font-black text-emerald-500">360 Buku</span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Total semua buku ada 360.</p>
                  </div>
                </div>
              </div>

              {/* H. AYO BERPIKIR! & I. RANGKUMAN PENJUMLAHAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* H. Ayo Berpikir (Stiker Dina) */}
                <div
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-inner space-y-3 transition-colors ${
                    isDark
                      ? 'bg-[#282B30] border-white/10 text-white'
                      : 'bg-pink-50/60 border-pink-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fun font-black text-base pb-2 border-b border-white/10">
                    <span className="text-xl">🎉</span>
                    <span>H. Ayo Berpikir!</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      isDark ? 'bg-[#1F2125] border-white/5 text-slate-300' : 'bg-white border-pink-200 text-slate-700'
                    }`}
                  >
                    <p className="leading-relaxed">
                      Dina mempunyai <strong>245 stiker</strong>. Kemudian, ia mendapat lagi <strong>138 stiker</strong> dari kakaknya. Berapa jumlah stiker Dina sekarang?
                    </p>
                    <div
                      className={`p-2.5 rounded-xl border text-center font-mono font-bold ${
                        isDark ? 'bg-[#181A1D] border-white/10' : 'bg-pink-50 border-pink-200'
                      }`}
                    >
                      <pre className="text-xs sm:text-sm">
{`     1
   2 4 5
+  1 3 8
---------
   3 8 3`}
                      </pre>
                    </div>
                    <div className="text-center font-fun font-black text-xs text-pink-600 dark:text-pink-400">
                      245 + 138 = 383 Stiker! ✨
                    </div>
                  </div>
                </div>

                {/* I. Rangkuman Penjumlahan */}
                <div
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-inner space-y-3 transition-colors ${
                    isDark
                      ? 'bg-[#282B30] border-white/10 text-white'
                      : 'bg-amber-50/60 border-amber-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-fun font-black text-base pb-2 border-b border-white/10">
                    <span className="text-xl">📌</span>
                    <span>I. Rangkuman Penjumlahan</span>
                  </div>

                  <ul className={`space-y-1.5 text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <li>📌 <strong>Penjumlahan</strong>: kegiatan menggabungkan bilangan.</li>
                    <li>📌 Nilai tempat: <strong>ratusan, puluhan, dan satuan</strong>.</li>
                    <li>📌 <strong>Tanpa menyimpan</strong>: jika hasil setiap tempat &lt; 10.</li>
                    <li>📌 <strong>Dengan menyimpan</strong>: jika hasil suatu tempat &ge; 10.</li>
                    <li>📌 Arah pengerjaan: <strong>Satuan ➔ Puluhan ➔ Ratusan</strong>.</li>
                  </ul>

                  <div
                    className={`p-2.5 rounded-xl border text-center font-fun font-black text-[11px] shadow-xs ${
                      isDark ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-amber-100 text-amber-950 border-amber-300'
                    }`}
                  >
                    🌟 "Susun dengan tepat, mulai dari satuan, simpan jika perlu, lalu cek kembali!"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* BAGIAN 2: MATERI PENGURANGAN LENGKAP                                     */}
          {/* ========================================================================= */}
          {(selectedCategory === 'all' || selectedCategory === 'pengurangan') && (
            <div className="space-y-6 pt-4">
              {/* HEADER BADGE SECTION PENGURANGAN */}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-9 h-9 rounded-2xl bg-rose-500 text-white font-fun font-black text-xl flex items-center justify-center shadow-md">
                  ➖
                </span>
                <div>
                  <h2 className={`font-fun font-black text-xl sm:text-2xl ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                    Modul Pembelajaran: Pengurangan Bilangan
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Mencari selisih, pengurangan tanpa meminjam, teknik meminjam (borrowing), dan simulasi
                  </p>
                </div>
              </div>

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
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        1. Mengenal Pengurangan
                      </h3>
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
                    <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                      💡 Arti Pengurangan:
                    </h4>
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
                    <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                      📊 Dalam Bentuk Nilai Tempat:
                    </h4>
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
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        3. Pengurangan Tanpa Meminjam
                      </h3>
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
                      <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        4. Pengurangan Dengan Meminjam (*Borrowing*)
                      </h3>
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
                    <h4 className={`font-fun font-black text-sm flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <span>⚡ Simulasi Interaktif: Pinjam Satuan (352 − 127)</span>
                    </h4>
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
                  <span>Pengurangan Sehari-hari (Uang Kembalian Dina)</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                    isDark ? 'bg-[#1F2125] border-white/5 text-slate-300' : 'bg-white border-emerald-200/70 text-slate-700'
                  }`}
                >
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
          )}

          {/* ========================================================================= */}
          {/* BAGIAN 3: NILAI TEMPAT SPESIFIK (JIKA DIPILIH KHUSUS)                      */}
          {/* ========================================================================= */}
          {selectedCategory === 'nilai-tempat' && (
            <div
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
                isDark
                  ? 'bg-[#282B30] border-white/10 text-white'
                  : 'bg-sky-50/60 border-sky-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-8 h-8 rounded-xl border font-fun font-black text-base flex items-center justify-center ${
                      isDark
                        ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                        : 'bg-sky-200 text-sky-950 border-sky-400'
                    }`}
                  >
                    🔢
                  </span>
                  <div>
                    <h3 className={`font-fun font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Struktur Nilai Tempat Bilangan (1 - 1.000)
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Memahami peran ratusan, puluhan, dan satuan dalam matematika
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                <div
                  className={`p-4 rounded-2xl border space-y-2 shadow-md transition-colors ${
                    isDark ? 'bg-[#1F2125] border-orange-400/30' : 'bg-white border-orange-200'
                  }`}
                >
                  <div className="px-3 py-1 rounded-xl bg-[#FB923C] text-white font-fun font-black text-xs uppercase tracking-wider shadow-xs">
                    KOLOM RATUSAN (100)
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    Tiap 1 sedotan bernilai <strong>100</strong>.<br />
                    10 puluhan = 1 ratusan.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-2 shadow-md transition-colors ${
                    isDark ? 'bg-[#1F2125] border-amber-400/30' : 'bg-white border-amber-200'
                  }`}
                >
                  <div className="px-3 py-1 rounded-xl bg-[#FBBF24] text-slate-950 font-fun font-black text-xs uppercase tracking-wider shadow-xs">
                    KOLOM PULUHAN (10)
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    Tiap 1 sedotan bernilai <strong>10</strong>.<br />
                    10 satuan = 1 puluhan.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-2 shadow-md transition-colors ${
                    isDark ? 'bg-[#1F2125] border-yellow-400/30' : 'bg-white border-yellow-200'
                  }`}
                >
                  <div className="px-3 py-1 rounded-xl bg-[#B45309] text-white font-fun font-black text-xs uppercase tracking-wider shadow-xs">
                    KOLOM SATUAN (1)
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    Tiap 1 sedotan bernilai <strong>1</strong>.<br />
                    Satuan dihitung dari 0 hingga 9.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PlaceValueConcept;
