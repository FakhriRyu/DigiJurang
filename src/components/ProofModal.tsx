import React, { useState, useEffect } from 'react';
import type { RowValues, ThemeMode } from '../types';
import { StrawGraphic } from './StrawGraphic';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  X,
  Play,
  RotateCcw,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RowValues;
  row1: RowValues;
  row2: RowValues;
  operation: 'addition' | 'subtraction';
  themeMode?: ThemeMode;
}

export const ProofModal: React.FC<ProofModalProps> = ({
  isOpen,
  onClose,
  result,
  row1,
  row2,
  operation,
  themeMode = 'dark'
}) => {
  const [countedRatusan, setCountedRatusan] = useState<number[]>([]);
  const [countedPuluhan, setCountedPuluhan] = useState<number[]>([]);
  const [countedSatuan, setCountedSatuan] = useState<number[]>([]);
  const [isAutoCounting, setIsAutoCounting] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const isDark = themeMode === 'dark';

  const totalCalculated = result.ratusan * 100 + result.puluhan * 10 + result.satuan;
  const val1 = row1.ratusan * 100 + row1.puluhan * 10 + row1.satuan;
  const val2 = row2.ratusan * 100 + row2.puluhan * 10 + row2.satuan;

  useEffect(() => {
    if (isOpen) {
      setCountedRatusan([]);
      setCountedPuluhan([]);
      setCountedSatuan([]);
      setIsAutoCounting(false);
      setShowCelebration(false);
      sound.playPop(1.3);
      sound.speak(`Mari kita buktikan hasil ${val1} ${operation === 'addition' ? 'tambah' : 'kurang'} ${val2}`);
    }
  }, [isOpen, result]);

  useEffect(() => {
    const isRatusanDone = countedRatusan.length === result.ratusan;
    const isPuluhanDone = countedPuluhan.length === result.puluhan;
    const isSatuanDone = countedSatuan.length === result.satuan;

    if (
      isOpen &&
      isRatusanDone &&
      isPuluhanDone &&
      isSatuanDone &&
      (result.ratusan > 0 || result.puluhan > 0 || result.satuan > 0) &&
      !showCelebration
    ) {
      setShowCelebration(true);
      sound.playTada();
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 }
      });
      sound.speak(`Hebat! Total hasil perhitungan adalah ${totalCalculated}.`);
    }
  }, [countedRatusan, countedPuluhan, countedSatuan, result, isOpen, showCelebration, totalCalculated]);

  if (!isOpen) return null;

  const currentCountedValue =
    countedRatusan.length * 100 + countedPuluhan.length * 10 + countedSatuan.length;

  const totalItemsCount = result.ratusan + result.puluhan + result.satuan;
  const currentCountedItems =
    countedRatusan.length + countedPuluhan.length + countedSatuan.length;

  const handleClickRatusan = (idx: number) => {
    if (countedRatusan.includes(idx)) return;
    const next = [...countedRatusan, idx];
    setCountedRatusan(next);
    sound.playDing(next.length);
    sound.speak(`${next.length * 100}`);
  };

  const handleClickPuluhan = (idx: number) => {
    if (countedPuluhan.includes(idx)) return;
    const next = [...countedPuluhan, idx];
    setCountedPuluhan(next);
    sound.playDing(next.length);
    sound.speak(`${next.length * 10}`);
  };

  const handleClickSatuan = (idx: number) => {
    if (countedSatuan.includes(idx)) return;
    const next = [...countedSatuan, idx];
    setCountedSatuan(next);
    sound.playDing(next.length);
    sound.speak(`${next.length}`);
  };

  const handleAutoCount = async () => {
    if (isAutoCounting) return;
    setIsAutoCounting(true);
    setCountedRatusan([]);
    setCountedPuluhan([]);
    setCountedSatuan([]);

    for (let i = 0; i < result.ratusan; i++) {
      await new Promise((res) => setTimeout(res, 400));
      setCountedRatusan((prev) => [...prev, i]);
      sound.playDing(i + 1);
    }

    for (let i = 0; i < result.puluhan; i++) {
      await new Promise((res) => setTimeout(res, 350));
      setCountedPuluhan((prev) => [...prev, i]);
      sound.playDing(i + 1);
    }

    for (let i = 0; i < result.satuan; i++) {
      await new Promise((res) => setTimeout(res, 300));
      setCountedSatuan((prev) => [...prev, i]);
      sound.playDing(i + 1);
    }

    setIsAutoCounting(false);
  };

  const handleResetCount = () => {
    setCountedRatusan([]);
    setCountedPuluhan([]);
    setCountedSatuan([]);
    setShowCelebration(false);
    sound.playRemove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`relative w-full max-w-5xl rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden my-auto transition-colors ${
          isDark
            ? 'bg-[#1C1E21] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-3 sm:p-5 flex items-center justify-between border-b ${
            isDark ? 'bg-[#282B30] border-white/10' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-slate-950 shadow-md flex items-center justify-center text-base sm:text-lg font-bold">
              🔍
            </div>
            <div>
              <h2 className={`font-fun text-sm sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Meja Hitung Sedotan (Pembuktian Hasil)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-[#1F2125] hover:bg-[#32363D] text-slate-300 hover:text-white border-white/10'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title="Tutup"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Top Tally Bar */}
        <div
          className={`p-2.5 sm:p-3.5 border-b flex flex-wrap items-center justify-between gap-2 sm:gap-3 ${
            isDark ? 'bg-[#1F2125] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border shadow-xs ${
              isDark ? 'bg-[#282B30] border-white/10' : 'bg-amber-50 border-amber-200'
            }`}
          >
            <span className={`text-[10px] sm:text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Operasi:</span>
            <span className={`font-fun font-black text-xs sm:text-base ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
              {val1} {operation === 'addition' ? '+' : '−'} {val2} = {totalCalculated}
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border shadow-xs ${
              isDark ? 'bg-[#282B30] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className={`text-[10px] sm:text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Terhitung:</span>
            <span className={`font-fun font-black text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {currentCountedItems} / {totalItemsCount}
            </span>
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-300'}`}>|</span>
            <span className={`font-fun font-black text-xs sm:text-base ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Nilai: {currentCountedValue}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleAutoCount}
              disabled={isAutoCounting}
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-[11px] sm:text-xs font-black font-fun flex items-center gap-1.5 disabled:opacity-40 shadow-[0_3px_0_#065F46] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 fill-current" />
              {isAutoCounting ? 'Menghitung...' : 'Hitung Otomatis'}
            </button>

            <button
              type="button"
              onClick={handleResetCount}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold font-fun flex items-center gap-1 border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#282B30] hover:bg-[#32363D] text-slate-200 border-white/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Ulangi
            </button>
          </div>
        </div>

        {/* The Counting Desk Canvas */}
        <div className={`p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4 ${isDark ? 'bg-[#141619]' : 'bg-slate-100/70'}`}>
          {/* Ratusan Row - 1 straw = 100 */}
          {result.ratusan > 0 && (
            <div
              className={`rounded-2xl p-4 border shadow-inner space-y-2.5 ${
                isDark ? 'bg-[#282B30] border-white/10' : 'bg-white border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg font-fun font-black text-xs border ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    📦 Kolom Ratusan ({result.ratusan} sedotan biru)
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    1 Sedotan Biru = 100
                  </span>
                </div>
                <span className={`font-fun font-bold text-xs ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Subtotal: {countedRatusan.length * 100} / {result.ratusan * 100}
                </span>
              </div>

              <div
                className={`flex flex-wrap items-center gap-4 p-3 rounded-xl border min-h-[100px] ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-slate-50 border-emerald-200/60'
                }`}
              >
                {Array.from({ length: result.ratusan }).map((_, idx) => (
                  <StrawGraphic
                    key={`rat-${idx}`}
                    type="ratusan"
                    color="blue"
                    size="lg"
                    interactive
                    isCounted={countedRatusan.includes(idx)}
                    countIndex={idx + 1}
                    countValue={(idx + 1) * 100}
                    onClick={() => handleClickRatusan(idx)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Puluhan Row - 1 straw = 10 */}
          {result.puluhan > 0 && (
            <div
              className={`rounded-2xl p-4 border shadow-inner space-y-2.5 ${
                isDark ? 'bg-[#282B30] border-white/10' : 'bg-white border-sky-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg font-fun font-black text-xs border ${
                      isDark
                        ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                        : 'bg-sky-100 text-sky-900 border-sky-300'
                    }`}
                  >
                    🪢 Kolom Puluhan ({result.puluhan} sedotan kuning)
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
                    1 Sedotan Kuning = 10
                  </span>
                </div>
                <span className={`font-fun font-bold text-xs ${isDark ? 'text-sky-300' : 'text-sky-900'}`}>
                  Subtotal: {countedPuluhan.length * 10} / {result.puluhan * 10}
                </span>
              </div>

              <div
                className={`flex flex-wrap items-center gap-4 p-3 rounded-xl border min-h-[100px] ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-slate-50 border-sky-200/60'
                }`}
              >
                {Array.from({ length: result.puluhan }).map((_, idx) => (
                  <StrawGraphic
                    key={`pul-${idx}`}
                    type="puluhan"
                    color="yellow"
                    size="lg"
                    interactive
                    isCounted={countedPuluhan.includes(idx)}
                    countIndex={idx + 1}
                    countValue={(idx + 1) * 10}
                    onClick={() => handleClickPuluhan(idx)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Satuan Row - 1 straw = 1 */}
          {result.satuan > 0 && (
            <div
              className={`rounded-2xl p-4 border shadow-inner space-y-2.5 ${
                isDark ? 'bg-[#282B30] border-white/10' : 'bg-white border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg font-fun font-black text-xs border ${
                      isDark
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    🥢 Kolom Satuan ({result.satuan} sedotan merah/cokelat)
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    1 Sedotan Satuan = 1
                  </span>
                </div>
                <span className={`font-fun font-bold text-xs ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  Subtotal: {countedSatuan.length} / {result.satuan}
                </span>
              </div>

              <div
                className={`flex flex-wrap items-center gap-4 p-3 rounded-xl border min-h-[100px] ${
                  isDark ? 'bg-[#1F2125] border-white/5' : 'bg-slate-50 border-amber-200/60'
                }`}
              >
                {Array.from({ length: result.satuan }).map((_, idx) => (
                  <StrawGraphic
                    key={`sat-${idx}`}
                    type="satuan"
                    color="red"
                    size="lg"
                    interactive
                    isCounted={countedSatuan.includes(idx)}
                    countIndex={idx + 1}
                    countValue={idx + 1}
                    onClick={() => handleClickSatuan(idx)}
                  />
                ))}
              </div>
            </div>
          )}

          {totalCalculated === 0 && (
            <div
              className={`text-center py-10 rounded-2xl border border-dashed ${
                isDark ? 'bg-[#282B30] border-white/10' : 'bg-white border-slate-300'
              }`}
            >
              <p className={isDark ? 'text-slate-400 font-medium' : 'text-slate-500 font-medium'}>
                Kotak hasil masih kosong (0 sedotan).
              </p>
            </div>
          )}

          {/* Summary Verification Card */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border shadow-lg text-center space-y-2 ${
                  isDark
                    ? 'bg-[#181A1D] border-emerald-400/40 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-center gap-2 text-xl font-black font-fun">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <span>PEMBUKTIAN SELESAI & TEPAT!</span>
                </div>
                <p className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  Seluruh sedotan telah dihitung sesuai nilai tempatnya berjumlah{' '}
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-fun font-black">
                    {totalCalculated}
                  </span>.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold">
                  <span
                    className={`px-2.5 py-1 rounded-md border ${
                      isDark ? 'bg-[#282B30] border-emerald-400/40 text-slate-300' : 'bg-white border-emerald-200 text-slate-700'
                    }`}
                  >
                    📦 {result.ratusan} Sedotan Ratusan = {result.ratusan * 100}
                  </span>
                  <span>+</span>
                  <span
                    className={`px-2.5 py-1 rounded-md border ${
                      isDark ? 'bg-[#282B30] border-emerald-400/40 text-slate-300' : 'bg-white border-emerald-200 text-slate-700'
                    }`}
                  >
                    🪢 {result.puluhan} Sedotan Puluhan = {result.puluhan * 10}
                  </span>
                  <span>+</span>
                  <span
                    className={`px-2.5 py-1 rounded-md border ${
                      isDark ? 'bg-[#282B30] border-emerald-400/40 text-slate-300' : 'bg-white border-emerald-200 text-slate-700'
                    }`}
                  >
                    🥢 {result.satuan} Sedotan Satuan = {result.satuan}
                  </span>
                  <span>=</span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-fun font-black">
                    {totalCalculated}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          className={`p-3.5 border-t-2 flex items-center justify-end ${
            isDark ? 'bg-[#282B30] border-[#3F4248]' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 text-xs font-black font-fun flex items-center gap-1.5 shadow-[0_3px_0_#B45309] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <span>Tutup & Kembali</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
