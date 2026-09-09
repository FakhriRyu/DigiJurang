import React from 'react';
import type { RowValues, OperationMode } from '../types';
import { sound } from '../utils/sound';
import { Volume2 } from 'lucide-react';

interface SoalNotepadProps {
  problem1: number;
  problem2: number;
  result: RowValues;
  operation: OperationMode;
  hasMerged: boolean;
  onUpdateProblem?: (row: 1 | 2, num: number) => void;
}

export const SoalNotepad: React.FC<SoalNotepadProps> = ({
  problem1,
  problem2,
  result,
  operation,
  hasMerged,
  onUpdateProblem
}) => {
  const valResult = result.ratusan * 100 + result.puluhan * 10 + result.satuan;

  const handleReadProblem = () => {
    let text = `Soal: ${problem1} ${operation === 'addition' ? 'ditambah' : 'dikurangi'} ${problem2}. `;
    if (hasMerged) {
      text += `Sama dengan ${valResult}.`;
    }
    sound.speak(text);
  };

  const handleNumberChange = (row: 1 | 2, rawVal: string) => {
    if (rawVal === '') {
      if (onUpdateProblem) {
        onUpdateProblem(row, 0);
      }
      return;
    }
    const parsed = parseInt(rawVal, 10);
    const safeNum = isNaN(parsed) ? 0 : Math.max(0, Math.min(parsed, 999));
    if (onUpdateProblem) {
      onUpdateProblem(row, safeNum);
      sound.playPop(1.1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[240px] sm:max-w-[260px]">
      {/* SOAL Badge */}
      <div className="relative mb-2">
        <div className="px-5 py-1 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 border-2 border-white text-white font-fun font-black text-lg sm:text-xl tracking-wider shadow-md text-center transform -rotate-2">
          SOAL
        </div>
      </div>

      {/* Spiral Notepad */}
      <div className="w-full bg-[#FFFDF5] rounded-2xl border-2 border-amber-300/80 p-3.5 shadow-lg relative flex flex-col justify-between">
        {/* Spiral Binder Holes */}
        <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-dashed border-amber-200">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1C1E21] border border-slate-400"></div>
              <div className="w-1 h-2 bg-slate-300 -mt-0.5"></div>
            </div>
          ))}
        </div>

        {/* Natural Vertical Math Equation (Whole Numbers) */}
        <div className="bg-white rounded-xl p-3 border border-amber-200/80 shadow-xs space-y-2">
          {/* Top Title & Audio Read Button */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <span className="text-[11px] font-fun font-bold text-slate-400 uppercase tracking-wide">
              Ketik Angka Soal:
            </span>
            <button
              type="button"
              onClick={handleReadProblem}
              title="Dengarkan Soal"
              className="p-1 rounded-md text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bilangan 1 Input */}
          <div className="flex items-center justify-end gap-2">
            <input
              type="number"
              min="0"
              max="999"
              value={problem1 === 0 ? '' : problem1}
              onChange={(e) => handleNumberChange(1, e.target.value)}
              placeholder="0"
              className="w-full text-right font-black font-fun text-2xl sm:text-3xl text-slate-800 bg-amber-50/50 hover:bg-amber-50 focus:bg-white border border-transparent focus:border-amber-400 rounded-xl px-3 py-1 outline-none transition-all"
              title="Ketik Bilangan 1 di sini"
            />
          </div>

          {/* Bilangan 2 Input with Operator */}
          <div className="flex items-center justify-between gap-1 border-b-2 border-slate-700 pb-2 relative">
            <span className="text-2xl font-black font-fun text-rose-600 pl-1 select-none">
              {operation === 'addition' ? '+' : '−'}
            </span>

            <input
              type="number"
              min="0"
              max="999"
              value={problem2 === 0 ? '' : problem2}
              onChange={(e) => handleNumberChange(2, e.target.value)}
              placeholder="0"
              className="w-full text-right font-black font-fun text-2xl sm:text-3xl text-slate-800 bg-sky-50/50 hover:bg-sky-50 focus:bg-white border-2 border-transparent focus:border-sky-400 rounded-xl px-3 py-1 outline-none transition-all"
              title="Ketik Bilangan 2 di sini"
            />
          </div>

          {/* Result */}
          <div className="flex items-center justify-end pt-1 px-3">
            <span className="font-black font-fun text-3xl sm:text-4xl text-emerald-700 tracking-wider">
              {hasMerged ? valResult : '?'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
