import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/curriculum';
import type { RowValues, OperationMode } from '../types';
import { sound } from '../utils/sound';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizModeProps {
  onApplyQuestionToBoard: (
    row1: RowValues,
    row2: RowValues,
    operation: OperationMode
  ) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ onApplyQuestionToBoard }) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  const currentQ = QUIZ_QUESTIONS[activeQuestionIdx];

  const numToRow = (num: number): RowValues => {
    const ratusan = Math.floor(num / 100);
    const remainder = num % 100;
    const puluhan = Math.floor(remainder / 10);
    const satuan = remainder % 10;
    return { ratusan, puluhan, satuan };
  };

  const handleApplyToBoard = () => {
    const row1 = numToRow(currentQ.num1);
    const row2 = numToRow(currentQ.num2);
    sound.playSparkle();
    onApplyQuestionToBoard(row1, row2, currentQ.operation);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Question Switcher Tabs */}
      <div className="flex flex-wrap gap-2">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const isCurrent = idx === activeQuestionIdx;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                setActiveQuestionIdx(idx);
                sound.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-fun transition-all border-2 ${
                isCurrent
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>Soal #{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 text-[10px] font-black font-fun uppercase tracking-wide">
            {currentQ.level}
          </span>
          <span className="text-xs text-slate-400 font-bold font-fun">
            #{activeQuestionIdx + 1}
          </span>
        </div>

        {/* Story */}
        <div className="space-y-3">
          <h3 className="font-fun text-base sm:text-lg font-bold text-slate-800 leading-snug">
            {currentQ.story}
          </h3>

          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
            <span className="font-fun font-black text-xl text-slate-900">
              {currentQ.num1} {currentQ.operation === 'addition' ? '+' : '−'} {currentQ.num2} = ?
            </span>

            <button
              type="button"
              onClick={handleApplyToBoard}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black font-fun flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Pasang ke Papan</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
