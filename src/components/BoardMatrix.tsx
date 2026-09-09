import React, { useState } from 'react';
import type { RowValues, PlaceValue, OperationMode, BoardOrientation, ThemeMode } from '../types';
import { HeartPocket } from './HeartPocket';
import { SoalNotepad } from './SoalNotepad';
import { sound } from '../utils/sound';
import { RotateCcw, ArrowDown } from 'lucide-react';

interface BoardMatrixProps {
  problem1: number;
  problem2: number;
  row1: RowValues;
  row2: RowValues;
  result: RowValues;
  hasMerged: boolean;
  isSliding: boolean;
  operation: OperationMode;
  orientation: BoardOrientation;
  themeMode?: ThemeMode;
  onSetOperation: (op: OperationMode) => void;
  onUpdateValue: (row: 1 | 2, type: PlaceValue, delta: number) => void;
  onMerge: () => void;
  onOpenProofModal: () => void;
  onReset: () => void;
  onBorrowSatuan?: () => void;
  onBorrowPuluhan?: () => void;
  onUpdateProblem: (row: 1 | 2, num: number) => void;
}

export const BoardMatrix: React.FC<BoardMatrixProps> = ({
  problem1,
  problem2,
  row1,
  row2,
  result,
  hasMerged,
  isSliding,
  operation,
  orientation,
  themeMode = 'dark',
  onSetOperation,
  onUpdateValue,
  onMerge,
  onOpenProofModal,
  onReset,
  onBorrowSatuan,
  onBorrowPuluhan,
  onUpdateProblem
}) => {
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const isDark = themeMode === 'dark';

  const val1 = row1.ratusan * 100 + row1.puluhan * 10 + row1.satuan;
  const val2 = row2.ratusan * 100 + row2.puluhan * 10 + row2.satuan;
  const valResult = result.ratusan * 100 + result.puluhan * 10 + result.satuan;

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (dragOverKey !== key) {
      setDragOverKey(key);
    }
  };

  const handleDragLeave = (key: string) => {
    if (dragOverKey === key) {
      setDragOverKey(null);
    }
  };

  const handleDrop = (e: React.DragEvent, row: 1 | 2, pocketType: PlaceValue) => {
    e.preventDefault();
    setDragOverKey(null);
    onUpdateValue(row, pocketType, 1);
    sound.playPop(1.2);
  };

  const canBorrowToSatuan =
    operation === 'subtraction' &&
    row1.satuan < row2.satuan &&
    row1.puluhan > 0 &&
    !hasMerged;

  const canBorrowToPuluhan =
    operation === 'subtraction' &&
    row1.puluhan < row2.puluhan &&
    row1.ratusan > 0 &&
    !hasMerged;

  const isLandscape = orientation === 'landscape';

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl p-3 sm:p-7 shadow-2xl overflow-hidden transition-all duration-300 border ${
          isDark
            ? 'bg-[#1C1E21] border-white/10 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        } ${isLandscape ? 'max-w-[1400px]' : 'max-w-5xl'}`}
      >
        {/* Decorative Tape on Top Corners */}
        <div className="absolute top-0 left-2 sm:left-6 w-8 sm:w-12 h-4 sm:h-6 bg-amber-300/60 transform -rotate-12 shadow-xs pointer-events-none"></div>
        <div className="absolute top-0 right-2 sm:right-6 w-8 sm:w-12 h-4 sm:h-6 bg-amber-300/60 transform rotate-12 shadow-xs pointer-events-none"></div>

        {/* Scattered Stars on Poster */}
        <div className="absolute top-12 left-4 sm:left-6 text-yellow-400 text-lg sm:text-2xl animate-pulse pointer-events-none">⭐</div>
        <div className="absolute top-32 left-6 sm:left-10 text-yellow-300 text-base sm:text-xl pointer-events-none">⭐</div>
        <div className="absolute top-12 right-4 sm:right-6 text-yellow-400 text-lg sm:text-2xl animate-pulse pointer-events-none">⭐</div>
        <div className="absolute top-32 right-6 sm:right-10 text-yellow-300 text-base sm:text-xl pointer-events-none">⭐</div>

        {/* Top Header Artwork: Smiling Sun & Rainbows */}
        <div className="flex items-center justify-between px-1 sm:px-8 mb-2 relative z-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-2xl sm:text-4xl filter drop-shadow-md">🌈</span>
            {isLandscape && (
              <span className="hidden md:inline-block text-2xl animate-pulse">✨</span>
            )}
          </div>

          <div className="flex flex-col items-center -mt-1">
            <div className="relative flex items-center justify-center">
              <span className="text-3xl sm:text-5xl filter drop-shadow-lg">☀️</span>
            </div>
            <div
              className={`px-2.5 sm:px-3.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-fun shadow-xs -mt-1 ${
                isDark
                  ? 'bg-sky-200/90 text-sky-950'
                  : 'bg-sky-100 text-sky-950'
              }`}
            >
              DIGI JURANG
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {isLandscape && (
              <span className="hidden md:inline-block text-2xl animate-pulse">✨</span>
            )}
            <span className="text-2xl sm:text-4xl filter drop-shadow-md">🌈</span>
          </div>
        </div>

        {/* 3D Cutout Letters Title: "PAPAN JURANG" */}
        <div className="text-center my-1.5 sm:my-2 space-y-1 relative z-10">
          {isLandscape ? (
            /* Landscape Single-Row 3D Title */
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black font-fun tracking-wider py-1">
              <div className="flex items-center gap-0.5 sm:gap-1.5">
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white shadow-[0_2px_0_#991B1B] sm:shadow-[0_4px_0_#991B1B] transform -rotate-3">
                  P
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white shadow-[0_2px_0_#9A3412] sm:shadow-[0_4px_0_#9A3412] transform rotate-2">
                  A
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FBBF24] text-slate-950 shadow-[0_2px_0_#B45309] sm:shadow-[0_4px_0_#B45309] transform -rotate-2">
                  P
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white shadow-[0_2px_0_#065F46] sm:shadow-[0_4px_0_#065F46] transform rotate-3">
                  A
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white shadow-[0_2px_0_#9D174D] sm:shadow-[0_4px_0_#9D174D] transform -rotate-1">
                  N
                </span>
              </div>

              <div className="w-1.5 sm:w-4"></div>

              <div className="flex items-center gap-0.5 sm:gap-1.5">
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FDE047] text-amber-950 shadow-[0_2px_0_#A16207] sm:shadow-[0_4px_0_#A16207] transform -rotate-3">
                  J
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white shadow-[0_2px_0_#9D174D] sm:shadow-[0_4px_0_#9D174D] transform rotate-2">
                  U
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#38BDF8] text-white shadow-[0_2px_0_#0369A1] sm:shadow-[0_3px_0_#0369A1] transform -rotate-2">
                  R
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white shadow-[0_2px_0_#C2410C] sm:shadow-[0_4px_0_#C2410C] transform rotate-3">
                  A
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#818CF8] text-white shadow-[0_2px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform -rotate-1">
                  N
                </span>
                <span className="px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white shadow-[0_2px_0_#991B1B] sm:shadow-[0_4px_0_#991B1B] transform rotate-2">
                  G
                </span>
              </div>
            </div>
          ) : (
            /* Portrait 2-Row Stacked Title */
            <>
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-2xl xs:text-3xl sm:text-5xl font-black font-fun tracking-wider">
                <span className="px-2 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F87171] text-white shadow-[0_2px_0_#991B1B] sm:shadow-[0_4px_0_#991B1B] transform -rotate-3">
                  P
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FB923C] text-white shadow-[0_2px_0_#9A3412] sm:shadow-[0_4px_0_#9A3412] transform rotate-2">
                  A
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#FBBF24] text-slate-950 shadow-[0_2px_0_#B45309] sm:shadow-[0_4px_0_#B45309] transform -rotate-2">
                  P
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#34D399] text-white shadow-[0_2px_0_#065F46] sm:shadow-[0_4px_0_#065F46] transform rotate-3">
                  A
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-[#F472B6] text-white shadow-[0_2px_0_#9D174D] sm:shadow-[0_4px_0_#9D174D] transform -rotate-1">
                  N
                </span>
              </div>

              <div className="flex items-center justify-center gap-1 sm:gap-2 text-3xl xs:text-4xl sm:text-6xl font-black font-fun tracking-wider pt-0.5 sm:pt-1">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl bg-[#FDE047] text-amber-950 shadow-[0_3px_0_#A16207] sm:shadow-[0_5px_0_#A16207] transform -rotate-3">
                  J
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl bg-[#F472B6] text-white shadow-[0_3px_0_#9D174D] sm:shadow-[0_5px_0_#9D174D] transform rotate-2">
                  U
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl bg-[#38BDF8] text-white shadow-[0_3px_0_#0369A1] sm:shadow-[0_5px_0_#0369A1] transform -rotate-2">
                  R
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl bg-[#FB923C] text-white shadow-[0_3px_0_#C2410C] sm:shadow-[0_5px_0_#C2410C] transform rotate-3">
                  A
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl bg-[#818CF8] text-white shadow-[0_3px_0_#3730A3] sm:shadow-[0_3px_0_#3730A3] transform -rotate-1">
                  N
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl bg-[#F87171] text-white shadow-[0_3px_0_#991B1B] sm:shadow-[0_3px_0_#991B1B] transform rotate-2">
                  G
                </span>
              </div>
            </>
          )}

          {/* Centralized Board Control Bar: Operation & Reset */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {/* 1. Operation Switcher */}
            <div
              className={`inline-flex rounded-full p-1 shadow-sm ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  onSetOperation('subtraction');
                  sound.playClick();
                }}
                className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-black font-fun transition-all cursor-pointer ${
                  operation === 'subtraction'
                    ? 'bg-[#EF4444] text-white shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                PENGURANGAN
              </button>
              <button
                type="button"
                onClick={() => {
                  onSetOperation('addition');
                  sound.playClick();
                }}
                className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-black font-fun transition-all cursor-pointer ${
                  operation === 'addition'
                    ? 'bg-[#10B981] text-white shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                PENJUMLAHAN
              </button>
            </div>

            {/* 2. Reset Button */}
            <button
              type="button"
              onClick={() => {
                sound.playRemove();
                onReset();
              }}
              title="Bersihkan Papan & Pipet"
              className={`px-3 py-1 rounded-full text-xs font-bold font-fun transition-all flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-rose-900/70 text-slate-300 hover:text-rose-200'
                  : 'bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* MAIN BOARD CONTENT AREA: SOAL NOTEPAD & 3X3 MATRIX */}
        <div
          className={`grid grid-cols-1 gap-6 items-start my-4 relative z-10 ${
            isLandscape ? 'lg:grid-cols-12' : 'lg:grid-cols-12'
          }`}
        >
          {/* Left Column: SOAL Notepad */}
          <div
            className={`flex flex-col items-center justify-start ${
              isLandscape ? 'lg:col-span-4 xl:col-span-3' : 'lg:col-span-4'
            }`}
          >
            <SoalNotepad
              problem1={problem1}
              problem2={problem2}
              result={result}
              operation={operation}
              hasMerged={hasMerged}
              onUpdateProblem={onUpdateProblem}
            />
          </div>

          {/* Right Column / Center Stage: 3x3 Pocket Matrix */}
          <div
            className={`flex flex-col gap-3.5 ${
              isLandscape ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-8'
            }`}
          >
            {/* Column Headers (RATUSAN, PULUHAN, SATUAN) */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 text-center">
              <div className="py-1 sm:py-1.5 px-1 sm:px-2 rounded-lg sm:rounded-xl bg-[#FB923C] shadow-xs">
                <span className="font-fun font-black text-[10px] xs:text-xs sm:text-sm text-white uppercase tracking-tight sm:tracking-wider">
                  RATUSAN (100)
                </span>
              </div>

              <div className="py-1 sm:py-1.5 px-1 sm:px-2 rounded-lg sm:rounded-xl bg-[#FBBF24] shadow-xs">
                <span className="font-fun font-black text-[10px] xs:text-xs sm:text-sm text-slate-950 uppercase tracking-tight sm:tracking-wider">
                  PULUHAN (10)
                </span>
              </div>

              <div className="py-1 sm:py-1.5 px-1 sm:px-2 rounded-lg sm:rounded-xl bg-[#B45309] shadow-xs">
                <span className="font-fun font-black text-[10px] xs:text-xs sm:text-sm text-white uppercase tracking-tight sm:tracking-wider">
                  SATUAN (1)
                </span>
              </div>
            </div>

            {/* BARIS 1 (KOTAK 1) */}
            <div
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-colors ${
                isDark ? 'bg-black/25' : 'bg-slate-100/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between mb-1 px-0.5 sm:px-1 gap-1">
                <span
                  className={`text-xs font-fun font-bold flex flex-wrap items-center gap-1 sm:gap-1.5 ${
                    isDark ? 'text-amber-300' : 'text-amber-800'
                  }`}
                >
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-[10px] sm:text-[11px]">
                    1
                  </span>
                  <span>Kotak 1:</span>
                  <strong className={`text-sm sm:text-base font-black ml-0.5 sm:ml-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {val1}
                  </strong>
                  {problem1 > 0 && (
                    <span
                      className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full font-fun font-bold transition-all ${
                        val1 === problem1
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isDark
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {val1 === problem1 ? '✓ Sesuai Soal' : `(Target: ${problem1})`}
                    </span>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                <HeartPocket
                  type="ratusan"
                  rowNumber={1}
                  count={row1.ratusan}
                  isInteractive={!hasMerged && !isSliding}
                  isSliding={isSliding}
                  isOver={dragOverKey === 'row1-ratusan'}
                  onDragOver={(e) => handleDragOver(e, 'row1-ratusan')}
                  onDragLeave={() => handleDragLeave('row1-ratusan')}
                  onDrop={(e) => handleDrop(e, 1, 'ratusan')}
                  onUpdateValue={(d) => onUpdateValue(1, 'ratusan', d)}
                />

                <HeartPocket
                  type="puluhan"
                  rowNumber={1}
                  count={row1.puluhan}
                  isInteractive={!hasMerged && !isSliding}
                  isSliding={isSliding}
                  isOver={dragOverKey === 'row1-puluhan'}
                  onDragOver={(e) => handleDragOver(e, 'row1-puluhan')}
                  onDragLeave={() => handleDragLeave('row1-puluhan')}
                  onDrop={(e) => handleDrop(e, 1, 'puluhan')}
                  onUpdateValue={(d) => onUpdateValue(1, 'puluhan', d)}
                  canBorrow={canBorrowToPuluhan}
                  borrowLabel="Pinjam 1 Ratusan"
                  onBorrow={onBorrowPuluhan}
                />

                <HeartPocket
                  type="satuan"
                  rowNumber={1}
                  count={row1.satuan}
                  isInteractive={!hasMerged && !isSliding}
                  isSliding={isSliding}
                  isOver={dragOverKey === 'row1-satuan'}
                  onDragOver={(e) => handleDragOver(e, 'row1-satuan')}
                  onDragLeave={() => handleDragLeave('row1-satuan')}
                  onDrop={(e) => handleDrop(e, 1, 'satuan')}
                  onUpdateValue={(d) => onUpdateValue(1, 'satuan', d)}
                  canBorrow={canBorrowToSatuan}
                  borrowLabel="Pinjam 1 Puluhan"
                  onBorrow={onBorrowSatuan}
                />
              </div>
            </div>

            {/* OPERATOR DIVIDER BADGE */}
            <div className="flex items-center justify-center my-0.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="h-0.5 w-8 sm:w-20 bg-gradient-to-r from-transparent to-rose-400"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rose-600 text-white font-black text-sm sm:text-lg flex items-center justify-center shadow-md">
                  {operation === 'addition' ? '+' : '−'}
                </div>
                <div className="h-0.5 w-8 sm:w-20 bg-gradient-to-l from-transparent to-rose-400"></div>
              </div>
            </div>

            {/* BARIS 2 (KOTAK 2) */}
            <div
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-colors ${
                isDark ? 'bg-black/25' : 'bg-slate-100/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between mb-1 px-0.5 sm:px-1 gap-1">
                <span
                  className={`text-xs font-fun font-bold flex flex-wrap items-center gap-1 sm:gap-1.5 ${
                    isDark ? 'text-sky-300' : 'text-sky-800'
                  }`}
                >
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-black text-[10px] sm:text-[11px]">
                    2
                  </span>
                  <span>Kotak 2:</span>
                  <strong className={`text-sm sm:text-base font-black ml-0.5 sm:ml-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {val2}
                  </strong>
                  {problem2 > 0 && (
                    <span
                      className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full font-fun font-bold transition-all ${
                        val2 === problem2
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isDark
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {val2 === problem2 ? '✓ Sesuai Soal' : `(Target: ${problem2})`}
                    </span>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                <HeartPocket
                  type="ratusan"
                  rowNumber={2}
                  count={row2.ratusan}
                  isInteractive={!hasMerged && !isSliding}
                  isSliding={isSliding}
                  isOver={dragOverKey === 'row2-ratusan'}
                  onDragOver={(e) => handleDragOver(e, 'row2-ratusan')}
                  onDragLeave={() => handleDragLeave('row2-ratusan')}
                  onDrop={(e) => handleDrop(e, 2, 'ratusan')}
                  onUpdateValue={(d) => onUpdateValue(2, 'ratusan', d)}
                />

                <HeartPocket
                  type="puluhan"
                  rowNumber={2}
                  count={row2.puluhan}
                  isInteractive={!hasMerged && !isSliding}
                  isSliding={isSliding}
                  isOver={dragOverKey === 'row2-puluhan'}
                  onDragOver={(e) => handleDragOver(e, 'row2-puluhan')}
                  onDragLeave={() => handleDragLeave('row2-puluhan')}
                  onDrop={(e) => handleDrop(e, 2, 'puluhan')}
                  onUpdateValue={(d) => onUpdateValue(2, 'puluhan', d)}
                />

                <HeartPocket
                  type="satuan"
                  rowNumber={2}
                  count={row2.satuan}
                  isInteractive={!hasMerged && !isSliding}
                  isSliding={isSliding}
                  isOver={dragOverKey === 'row2-satuan'}
                  onDragOver={(e) => handleDragOver(e, 'row2-satuan')}
                  onDragLeave={() => handleDragLeave('row2-satuan')}
                  onDrop={(e) => handleDrop(e, 2, 'satuan')}
                  onUpdateValue={(d) => onUpdateValue(2, 'satuan', d)}
                />
              </div>
            </div>

            {/* LAUNCH / MERGE CHUTE BUTTON */}
            <div className="my-0.5 flex justify-center">
              <button
                type="button"
                onClick={onMerge}
                disabled={isSliding || (val1 === 0 && val2 === 0)}
                className="w-full sm:w-auto px-5 sm:px-7 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black font-fun text-xs sm:text-base shadow-md flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <ArrowDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSliding ? 'animate-bounce text-slate-950' : ''}`} />
                <span>{isSliding ? 'Meluncurkan Pipet...' : 'Luncurkan Pipet 🚀'}</span>
              </button>
            </div>

            {/* BARIS 3 (KOTAK HASIL) */}
            <div
              onClick={() => {
                if (hasMerged || valResult > 0) {
                  onOpenProofModal();
                }
              }}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all relative ${
                hasMerged
                  ? isDark
                    ? 'bg-emerald-950/70 shadow-lg cursor-pointer hover:bg-emerald-950/80 ring-2 ring-emerald-400/50'
                    : 'bg-emerald-100 shadow-lg cursor-pointer hover:bg-emerald-200 ring-2 ring-emerald-500/50'
                  : isDark
                  ? 'bg-black/25'
                  : 'bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🕊️</span>
                  <div className="px-3 py-0.5 rounded-xl bg-[#F87171] border-2 border-white text-white font-fun font-black text-xs sm:text-sm shadow-md">
                    HASIL
                  </div>
                  {hasMerged && (
                    <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black font-fun animate-pulse shadow-xs">
                      ✨ Buktikan & Hitung
                    </span>
                  )}
                </div>

                <div
                  className={`text-xl sm:text-2xl font-black font-fun px-3 py-0.5 rounded-xl border-2 shadow-md ${
                    isDark
                      ? 'text-white bg-emerald-700/80 border-emerald-400'
                      : 'text-emerald-950 bg-emerald-300 border-emerald-500'
                  }`}
                >
                  {valResult}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <HeartPocket
                  type="ratusan"
                  rowNumber={3}
                  count={result.ratusan}
                  isInteractive={false}
                  isSliding={isSliding}
                  isOver={false}
                  onDragOver={() => {}}
                  onDragLeave={() => {}}
                  onDrop={() => {}}
                />

                <HeartPocket
                  type="puluhan"
                  rowNumber={3}
                  count={result.puluhan}
                  isInteractive={false}
                  isSliding={isSliding}
                  isOver={false}
                  onDragOver={() => {}}
                  onDragLeave={() => {}}
                  onDrop={() => {}}
                />

                <HeartPocket
                  type="satuan"
                  rowNumber={3}
                  count={result.satuan}
                  isInteractive={false}
                  isSliding={isSliding}
                  isOver={false}
                  onDragOver={() => {}}
                  onDragLeave={() => {}}
                  onDrop={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Garden Trim */}
        <div
          className={`mt-4 -mx-8 -mb-8 pt-3 px-6 flex items-end justify-between select-none pointer-events-none relative z-10 border-t-2 ${
            isDark
              ? 'bg-gradient-to-t from-emerald-800 via-emerald-700 to-transparent border-emerald-500/40'
              : 'bg-gradient-to-t from-emerald-100 via-emerald-50 to-transparent border-emerald-300'
          }`}
        >
          <div className="flex items-end gap-2 text-2xl">
            <span>🌿</span>
            <span>🌻</span>
            <span>🌼</span>
            <span className="hidden sm:inline">🌿</span>
          </div>
          <div className="flex items-end gap-2 text-2xl">
            <span className="hidden sm:inline">🌿</span>
            <span>🌼</span>
            <span>🌻</span>
            <span>🌿</span>
          </div>
        </div>
      </div>
    </div>
  );
};
