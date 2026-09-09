import React from 'react';
import type { ThemeMode } from '../types';
import { sound } from '../utils/sound';
import {
  Target,
  Layers,
  Sparkles,
  CheckCircle2,
  Users,
  Lightbulb,
  Volume2
} from 'lucide-react';

interface LearningObjectivesProps {
  onGoToBoard: () => void;
  themeMode?: ThemeMode;
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({
  onGoToBoard,
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

        {/* 3D Cutout Letters Title: "PANDUAN" */}
        <div className="text-center my-2 space-y-1.5 sm:space-y-2 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black font-fun tracking-wider py-1">
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white border border-white/80 shadow-[0_2px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform -rotate-3">
              P
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white border border-white/80 shadow-[0_2px_0_#9A3412] sm:shadow-[0_3px_0_#9A3412] transform rotate-2">
              A
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FBBF24] text-slate-950 border border-white/80 shadow-[0_2px_0_#B45309] sm:shadow-[0_3px_0_#B45309] transform -rotate-2">
              N
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white border border-white/80 shadow-[0_2px_0_#065F46] sm:shadow-[0_3px_0_#065F46] transform rotate-3">
              D
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#38BDF8] text-slate-950 border border-white/80 shadow-[0_2px_0_#0369A1] sm:shadow-[0_3px_0_#0369A1] transform -rotate-1">
              U
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#818CF8] text-white border border-white/80 shadow-[0_2px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform rotate-2">
              A
            </span>
            <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white border border-white/80 shadow-[0_2px_0_#9D174D] sm:shadow-[0_3px_0_#9D174D] transform -rotate-2">
              N
            </span>
          </div>

          <p className={`text-xs sm:text-sm font-bold font-fun ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
            Panduan Lengkap Penggunaan & Pembelajaran bagi Guru dan Siswa
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 pt-2 relative z-10">
          {/* 1. Mengenal Media & Latar Belakang */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-amber-50/60 border-amber-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                  isDark
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                    : 'bg-amber-200 text-amber-950 border-amber-400'
                }`}
              >
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-black font-fun ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1. Mengenal Media DIGI JURANG
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Transformasi alat peraga Papan Jurang (Papan Penjumlahan & Pengurangan) dari konkret fisik ke interaktif digital
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div
                className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-amber-200/70 shadow-xs'
                }`}
              >
                <h3 className={`font-fun font-bold text-sm flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  <span>🎯 Latar Belakang & Masalah Pembelajaran</span>
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Banyak siswa kelas rendah (Fase A & B / Kelas 1–3 SD) mengalami kesulitan saat mempelajari operasi bilangan bersusun karena langsung disajikan dalam bentuk simbol matematika abstrak. Kesalahan fatal paling sering terjadi pada <strong>pengurangan dengan teknik meminjam (borrowing)</strong>, di mana siswa sering membalik angka pengurangan karena tidak memahami konsep nilai tempat di balik peminjaman tersebut.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-sky-200/70 shadow-xs'
                }`}
              >
                <h3 className={`font-fun font-bold text-sm flex items-center gap-1.5 ${isDark ? 'text-sky-300' : 'text-sky-900'}`}>
                  <span>🧠 Landasan Teori Belajar (Jerome Bruner)</span>
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  DIGI JURANG dirancang mengikuti 3 tahapan pemahaman matematis Bruner:
                </p>
                <ul className={`text-xs space-y-1 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong className={isDark ? 'text-white' : 'text-slate-900'}>Tahap Enaktif (Konkret):</strong> Siswa memanipulasi sedotan/pipet nyata.</li>
                  <li><strong className={isDark ? 'text-white' : 'text-slate-900'}>Tahap Ikonik (Visual):</strong> Siswa melihat kantong nilai tempat, warna, dan proses meluncur.</li>
                  <li><strong className={isDark ? 'text-white' : 'text-slate-900'}>Tahap Simbolik (Abstrak):</strong> Siswa menghubungkan pengalaman manipulatif dengan angka pada buku catatan soal.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Tujuan Pembelajaran (Capaian Pembelajaran) */}
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
                  2. Tujuan Pembelajaran (TP)
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Kompetensi yang diharapkan dicapai siswa setelah berinteraksi dengan media DIGI JURANG
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              <div
                className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Memahami Nilai Tempat Bilangan
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Siswa dapat mengidentifikasi letak dan nilai suatu angka dalam bilangan cacah hingga 1.000: <strong>Satuan</strong> (1), <strong>Puluhan</strong> (10), dan <strong>Ratusan</strong> (100).
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Representasi Manipulatif Sedotan
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Siswa memahami bahwa sebatang sedotan bernilai konkret sesuai kantong tempatnya berada (1 batang di Ratusan = 100, Puluhan = 10, Satuan = 1).
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Operasi Penjumlahan Bersusun
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Siswa memahami proses penjumlahan sebagai kegiatan mengumpulkan dan menggabungkan sedotan dari Kotak 1 dan Kotak 2 ke dalam Kotak Hasil.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs">
                  4
                </div>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Pengurangan Tanpa Meminjam
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Siswa dapat menyelesaikan pengurangan ketika setiap digit bilangan pertama mencukupi untuk dikurangi oleh digit bilangan kedua.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs">
                  5
                </div>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Pengurangan dengan Meminjam
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Siswa menguasai konsep pertukaran nilai: <strong>1 puluhan ditukar menjadi 10 satuan</strong> saat bilangan yang dikurangi tidak cukup.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/70 shadow-xs'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black flex items-center justify-center text-xs">
                  6
                </div>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Pembuktian Mandiri (*Concrete Proof*)
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Siswa mampu membilang sedotan satu per satu di Meja Pembuktian Hasil untuk mengonfirmasi kebenaran jawaban secara konkret.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Panduan Langkah Demi Langkah Penggunaan Media */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-5 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-purple-50/60 border-purple-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                  isDark
                    ? 'bg-purple-500/20 text-purple-400 border-purple-400/40'
                    : 'bg-purple-200 text-purple-950 border-purple-400'
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-black font-fun ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  3. Panduan Langkah Demi Langkah Menggunakan Papan Jurang
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Alur interaksi pembelajaran dari penentuan soal hingga pembuktian hasil
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-amber-200/80'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#FBBF24] text-slate-950 font-fun font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  1
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className={`font-fun font-black text-base flex items-center gap-2 flex-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>Penentuan Soal oleh Guru (Kotak Soal)</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isDark
                          ? 'bg-pink-500/20 text-pink-300 border-pink-400/40'
                          : 'bg-pink-100 text-pink-900 border-pink-300'
                      }`}
                    >
                      Buku Catatan Soal
                    </span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Guru mengetik angka <strong>Bilangan 1</strong> (Kotak 1) dan <strong>Bilangan 2</strong> (Kotak 2) pada kotak soal berbentuk buku catatan di sebelah kiri. Siswa kemudian meletakkan sedotan pada kantong Ratusan, Puluhan, dan Satuan sesuai soal tersebut.
                  </p>
                  <div
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                      isDark
                        ? 'bg-[#181A1D] border-white/10 text-amber-200'
                        : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Tekan ikon pengeras suara 🔊 di kotak soal untuk membacakan soal kepada siswa di kelas.</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-sky-200/80'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#38BDF8] text-slate-950 font-fun font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  2
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className={`font-fun font-black text-base flex items-center gap-2 flex-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>Pengambilan & Peletakan Sedotan Bebas (Wadah Sedotan)</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isDark
                          ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                          : 'bg-sky-100 text-sky-900 border-sky-300'
                      }`}
                    >
                      Manipulatif Konkret
                    </span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Di bagian bawah layar tersedia <strong>🥤 Wadah Sedotan</strong> tunggal. Siswa atau Guru dapat menarik (<strong>drag</strong>) sebatang sedotan dan meletakkannya (<strong>drop</strong>) ke kantong mana saja pada Kotak 1 atau Kotak 2 (Ratusan, Puluhan, atau Satuan). Nilai sedotan akan otomatis mengikuti nilai tempat kantong tersebut.
                  </p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    💡 <em>Tips:</em> Pengguna juga dapat menekan tombol <strong>+</strong> atau <strong>−</strong> langsung pada kantong untuk menambah atau mengurangi sedotan dengan cepat.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-orange-200/80'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#FB923C] text-slate-950 font-fun font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  3
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className={`font-fun font-black text-base flex items-center gap-2 flex-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>Proses Pengurangan dengan Teknik Meminjam (*Borrowing*)</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isDark
                          ? 'bg-orange-500/20 text-orange-300 border-orange-400/40'
                          : 'bg-orange-100 text-orange-900 border-orange-300'
                      }`}
                    >
                      Konsep Inti
                    </span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Jika pada operasi pengurangan jumlah sedotan di Kotak 1 kurang dari Kotak 2 pada kolom yang sama, sistem akan mendeteksi kebutuhan meminjam dan memunculkan tombol <strong>⚡ Pinjam</strong> beranimasi:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div
                      className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                        isDark
                          ? 'bg-[#181A1D] border-white/10 text-slate-300'
                          : 'bg-orange-50 border-orange-200 text-slate-800'
                      }`}
                    >
                      <span className={`font-bold font-fun ${isDark ? 'text-orange-300' : 'text-orange-900'}`}>⚡ Pinjam ke Satuan:</span>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        1 sedotan puluhan di Kotak 1 diambil, kemudian diurai menjadi <strong>10 sedotan satuan (+10)</strong>. Jumlah satuan bertambah sehingga mencukupi untuk dikurangi.
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                        isDark
                          ? 'bg-[#181A1D] border-white/10 text-slate-300'
                          : 'bg-orange-50 border-orange-200 text-slate-800'
                      }`}
                    >
                      <span className={`font-bold font-fun ${isDark ? 'text-orange-300' : 'text-orange-900'}`}>⚡ Pinjam ke Puluhan:</span>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        1 sedotan ratusan di Kotak 1 diambil, kemudian diurai menjadi <strong>10 sedotan puluhan (+10)</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-emerald-200/80'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#34D399] text-slate-950 font-fun font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  4
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className={`font-fun font-black text-base flex items-center gap-2 flex-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>Peluncuran Sedotan & Penggabungan Hasil (*Launch & Slide*)</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                          : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      Animasi Meluncur
                    </span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Setelah sedotan terisi dan siap dihitung, tekan tombol <strong>"Luncurkan Pipet 🚀"</strong>. Seluruh sedotan dari Kotak 1 dan Kotak 2 akan meluncur turun dan menyatu ke dalam <strong>Kotak 3 (Kotak Hasil)</strong> diiringi efek suara animasi luncuran yang menarik.
                  </p>
                  <p className={`text-xs font-semibold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    Pada penjumlahan: sedotan digabungkan. Pada pengurangan: selisih sedotan dihitung dan terkumpul di Kotak Hasil.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start shadow-md transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-purple-200/80'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#818CF8] text-slate-950 font-fun font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  5
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className={`font-fun font-black text-base flex items-center gap-2 flex-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>Meja Pembuktian & Penghitungan Konkret (*Proof Mode*)</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isDark
                          ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                          : 'bg-purple-100 text-purple-900 border-purple-300'
                      }`}
                    >
                      Pembuktian Nyata
                    </span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Setelah proses peluncuran selesai, klik <strong>Kotak Hasil (Kotak 3)</strong> untuk membuka <strong>Meja Hitung Sedotan</strong>. Seluruh sedotan hasil akan berjejer rapi di tengah layar.
                  </p>
                  <ul className={`text-xs space-y-1 list-disc list-inside ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <li>Siswa dapat mengklik tiap sedotan satu per satu untuk membilang nilainya secara interaktif.</li>
                    <li>Tersedia fitur <strong>"Hitung Otomatis"</strong> agar seluruh kelas dapat menyimak pembilangan sedotan bersama narasi audio.</li>
                    <li>Saat semua sedotan selesai dihitung, konfeti perayaan 🎉 akan muncul menandakan pembuktian berhasil!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Peran Guru & Siswa */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-indigo-50/60 border-indigo-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                  isDark
                    ? 'bg-indigo-500/20 text-indigo-400 border-indigo-400/40'
                    : 'bg-indigo-200 text-indigo-950 border-indigo-400'
                }`}
              >
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-black font-fun ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  4. Peran Guru dan Siswa dalam Pembelajaran
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Panduan integrasi media DIGI JURANG dalam kegiatan belajar mengajar (KBM)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div
                className={`p-5 rounded-2xl border space-y-2.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-indigo-200/70 shadow-xs'
                }`}
              >
                <h3 className={`font-fun font-black text-base flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-indigo-950'}`}>
                  <span>👨‍🏫 Peran Guru (Fasilitator)</span>
                </h3>
                <ul className={`text-xs space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Menentukan Skenario Soal:</strong> Mengisi bilangan pada Kotak Soal yang bervariasi (tanpa meminjam dan dengan meminjam).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Memantik Pertanyaan Kritis:</strong> Bertanya kepada siswa <em>"Apakah satuan di Kotak 1 cukup untuk diambil? Jika tidak cukup, apa yang harus kita lakukan?"</em></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span><strong>Memanfaatkan Fleksibilitas Tampilan:</strong> Menggunakan mode <strong>Lanskap</strong> saat menampilkan di layar proyektor / smartboard kelas.</span>
                  </li>
                </ul>
              </div>

              <div
                className={`p-5 rounded-2xl border space-y-2.5 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-pink-200/70 shadow-xs'
                }`}
              >
                <h3 className={`font-fun font-black text-base flex items-center gap-2 ${isDark ? 'text-pink-300' : 'text-pink-950'}`}>
                  <span>🧑‍🎓 Peran Siswa (Eksplorasi Aktif)</span>
                </h3>
                <ul className={`text-xs space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span><strong>Eksplorasi Kinestetik:</strong> Memindahkan sedotan secara langsung untuk merasakan kuantitas bilangan secara nyata.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span><strong>Menyaksikan Konversi Nilai:</strong> Mengamati secara visual bagaimana 1 puluhan berubah menjadi 10 satuan saat meminjam.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span><strong>Membangun Keyakinan Konseptual:</strong> Membuktikan sendiri jawaban dengan menghitung sedotan hingga tuntas tanpa rasa ragu.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. Fitur Interaktif Pendukung */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-inner space-y-4 transition-colors ${
              isDark
                ? 'bg-[#282B30] border-white/10 text-white'
                : 'bg-amber-50/60 border-amber-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
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
                  5. Fitur Interaktivitas Pendukung
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Fitur-fitur yang memaksimalkan kenyamanan pembelajaran di kelas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div
                className={`p-4 rounded-2xl border space-y-1 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <span className="text-xl">🖥️ 📱</span>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Mode Lanskap & Potret</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Sesuaikan orientasi layar menjadi <strong>Lanskap</strong> (layar lebar papan tulis) atau <strong>Potret</strong> (poster vertikal gawai).
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <span className="text-xl">🔊 🎙️</span>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Audio & Narasi Suara</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Dilengkapi efek suara taktil (pop, luncuran, tada) serta narasi suara bahasa Indonesia yang menjelaskan setiap langkah peminjaman.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-1 transition-colors ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <span className="text-xl">🔄</span>
                <h4 className={`font-fun font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Tombol Reset Instan</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Bersihkan seluruh sedotan pada papan dalam 1 klik untuk memulai latihan soal baru dengan cepat.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  onGoToBoard();
                }}
                className="px-8 py-3.5 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black font-fun text-sm sm:text-base border border-white/40 shadow-[0_4px_0_#B45309] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Buka Papan Jurang Sekarang 🚀</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
