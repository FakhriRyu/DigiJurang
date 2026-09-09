import React, { useState, useRef } from 'react';
import type { PlaceValue, BoardOrientation, ThemeMode } from '../types';
import { StrawGraphic } from './StrawGraphic';
import { sound } from '../utils/sound';
import { ChevronDown, ChevronUp, Sparkles, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipetteTrayProps {
  onAdd?: (targetRow: 1 | 2, type: PlaceValue, amount?: number) => void;
  disabled?: boolean;
  orientation?: BoardOrientation;
  themeMode?: ThemeMode;
}

export const PipetteTray: React.FC<PipetteTrayProps> = ({
  disabled = false,
  orientation = 'landscape',
  themeMode = 'dark'
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const dragGhostRef = useRef<HTMLDivElement>(null);
  const isDark = themeMode === 'dark';

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ isStraw: true }));
    e.dataTransfer.effectAllowed = 'copy';

    if (dragGhostRef.current) {
      // Set the drag ghost to strictly only the straw graphic
      e.dataTransfer.setDragImage(dragGhostRef.current, 10, 45);
    }
    sound.playPop(1.2);
  };

  return (
    <div className="sticky bottom-3 z-30 w-full flex justify-center px-2 pointer-events-none">
      {/* Hidden dedicated single straw ghost for drag image */}
      <div
        ref={dragGhostRef}
        aria-hidden="true"
        className="fixed -top-[9999px] -left-[9999px] pointer-events-none"
      >
        <StrawGraphic color="amber" size="md" />
      </div>

      <div
        className={`pointer-events-auto backdrop-blur-md rounded-2xl sm:rounded-3xl border border-amber-400/40 shadow-xl p-2.5 sm:p-3 w-full transition-all duration-300 ${
          isDark ? 'bg-[#1C1E21]/95 text-white' : 'bg-white/95 text-slate-900 border-amber-300'
        } ${orientation === 'landscape' ? 'max-w-xs sm:max-w-sm' : 'max-w-xs'}`}
      >
        {/* Top Header Bar */}
        <div
          className={`flex items-center justify-between px-1 pb-1.5 border-b ${
            isDark ? 'border-white/10' : 'border-amber-200'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg">🥤</span>
            <span className={`font-fun font-black text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Wadah Sedotan
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-[#282B30] text-slate-300 hover:text-white' : 'hover:bg-slate-100 text-slate-600'
            }`}
            title={isMinimized ? 'Buka Wadah' : 'Sembunyikan'}
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Straw Dispenser Body */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-2 flex items-center justify-between gap-3 rounded-xl p-2 border shadow-inner ${
                isDark ? 'bg-[#282B30] border-white/10' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              {/* The Draggable Straw Manipulative (Only the straw is draggable!) */}
              <div
                draggable={!disabled}
                onDragStart={handleDragStart}
                className={`relative group p-2 rounded-xl border border-dashed shadow-xs cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-all select-none flex items-center justify-center min-w-[52px] min-h-[70px] ${
                  isDark
                    ? 'bg-[#1F2125] hover:bg-[#181A1D] border-amber-400/60 hover:border-amber-300'
                    : 'bg-white hover:bg-amber-100/50 border-amber-400 hover:border-amber-500'
                }`}
                title="Tarik sedotan ini ke kantong mana saja"
              >
                <div className="transform -rotate-6 group-hover:rotate-0 transition-transform">
                  <StrawGraphic color="amber" size="md" />
                </div>

                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow-xs">
                  <Move className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Instructional Text next to the straw */}
              <div className="flex-1 flex flex-col justify-center">
                <span className={`font-fun font-black text-xs flex items-center gap-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span>Tarik Sedotan 🥤</span>
                </span>
                <span className={`text-[10px] sm:text-[11px] font-medium leading-tight ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Tarik & taruh ke kantong ratusan, puluhan, atau satuan
                </span>
              </div>

              <Sparkles className="w-4 h-4 text-amber-400 mr-1 hidden sm:block animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
