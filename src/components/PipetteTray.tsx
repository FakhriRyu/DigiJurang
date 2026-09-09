import React, { useState, useRef, useEffect } from 'react';
import type { PlaceValue, BoardOrientation, ThemeMode } from '../types';
import { StrawGraphic } from './StrawGraphic';
import { sound } from '../utils/sound';
import { ChevronDown, ChevronUp, Sparkles, Move, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipetteTrayProps {
  onAdd?: (targetRow: 1 | 2, type: PlaceValue, amount?: number) => void;
  disabled?: boolean;
  orientation?: BoardOrientation;
  themeMode?: ThemeMode;
}

export const PipetteTray: React.FC<PipetteTrayProps> = ({
  onAdd,
  disabled = false,
  orientation = 'landscape',
  themeMode = 'light'
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false);
  const [touchDrag, setTouchDrag] = useState<{ active: boolean; x: number; y: number } | null>(null);

  const dragGhostRef = useRef<HTMLDivElement>(null);
  const isDark = themeMode === 'dark';

  // Desktop HTML5 Drag Start
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ isStraw: true }));
    e.dataTransfer.effectAllowed = 'copy';

    if (dragGhostRef.current) {
      e.dataTransfer.setDragImage(dragGhostRef.current, 10, 45);
    }
    sound.playPop(1.2);
  };

  // Mobile Touch Drag Start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    const touch = e.touches[0];
    if (!touch) return;

    setTouchDrag({
      active: true,
      x: touch.clientX,
      y: touch.clientY
    });
    sound.playPop(1.1);
  };

  // Handle Touch Move & Touch End via global window listeners for reliable tracking
  useEffect(() => {
    if (!touchDrag?.active) return;

    const handleWindowTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      // Prevent scrolling while dragging manipulative
      if (e.cancelable) {
        e.preventDefault();
      }

      setTouchDrag({
        active: true,
        x: touch.clientX,
        y: touch.clientY
      });

      // Hit-test element under finger
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const pocket = el?.closest('[data-pocket-key]');

      if (pocket && pocket.getAttribute('data-pocket-interactive') === 'true') {
        const pocketKey = pocket.getAttribute('data-pocket-key');
        window.dispatchEvent(
          new CustomEvent('digijurang:draghover', { detail: { pocketKey } })
        );
      } else {
        window.dispatchEvent(
          new CustomEvent('digijurang:draghover', { detail: { pocketKey: null } })
        );
      }
    };

    const handleWindowTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (touch) {
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const pocket = el?.closest('[data-pocket-key]');

        if (pocket && pocket.getAttribute('data-pocket-interactive') === 'true') {
          const row = Number(pocket.getAttribute('data-pocket-row')) as 1 | 2;
          const type = pocket.getAttribute('data-pocket-type') as PlaceValue;

          if (onAdd && (row === 1 || row === 2) && type) {
            onAdd(row, type, 1);
            sound.playPop(1.3);
            if (navigator.vibrate) {
              navigator.vibrate(25);
            }
          }
        }
      }

      // Clear hover highlight
      window.dispatchEvent(
        new CustomEvent('digijurang:draghover', { detail: { pocketKey: null } })
      );
      setTouchDrag(null);
    };

    const handleWindowTouchCancel = () => {
      window.dispatchEvent(
        new CustomEvent('digijurang:draghover', { detail: { pocketKey: null } })
      );
      setTouchDrag(null);
    };

    window.addEventListener('touchmove', handleWindowTouchMove, { passive: false });
    window.addEventListener('touchend', handleWindowTouchEnd);
    window.addEventListener('touchcancel', handleWindowTouchCancel);

    return () => {
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
      window.removeEventListener('touchcancel', handleWindowTouchCancel);
    };
  }, [touchDrag?.active, onAdd]);

  const handleQuickAdd = (row: 1 | 2, type: PlaceValue) => {
    if (disabled || !onAdd) return;
    onAdd(row, type, 1);
    sound.playPop(1.2);
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  return (
    <>
      {/* Floating Ghost Element following finger on mobile touch drag */}
      {touchDrag?.active && (
        <div
          className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-[120%] flex flex-col items-center filter drop-shadow-2xl animate-pulse"
          style={{
            left: `${touchDrag.x}px`,
            top: `${touchDrag.y}px`
          }}
        >
          <div className="transform -rotate-12 scale-125">
            <StrawGraphic color="amber" size="md" />
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-400 border-2 border-white text-slate-950 font-black font-fun text-[11px] shadow-lg whitespace-nowrap">
            🥤 Lepas di Kantong
          </div>
        </div>
      )}

      <div className="sticky bottom-3 z-30 w-full flex justify-center px-2 pointer-events-none">
        {/* Hidden dedicated single straw ghost for desktop drag image */}
        <div
          ref={dragGhostRef}
          aria-hidden="true"
          className="fixed -top-[9999px] -left-[9999px] pointer-events-none"
        >
          <StrawGraphic color="amber" size="md" />
        </div>

        <div
          className={`pointer-events-auto backdrop-blur-md rounded-2xl sm:rounded-3xl border shadow-xl p-2.5 sm:p-3 w-full transition-all duration-300 ${
            isDark
              ? 'bg-[#1C1E21]/95 text-white border-amber-400/40'
              : 'bg-white/95 text-slate-900 border-amber-300'
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

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-fun font-bold flex items-center gap-0.5 transition-colors cursor-pointer ${
                  showQuickAdd
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : isDark
                    ? 'bg-white/10 text-amber-300 hover:bg-white/15'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
                title="Pilih cepat tanpa geser"
              >
                <Plus className="w-3 h-3" />
                <span>Pilih</span>
              </button>

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
          </div>

          {/* Straw Dispenser Body */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 mt-2"
              >
                <div
                  className={`flex items-center justify-between gap-3 rounded-xl p-2 border shadow-inner ${
                    isDark ? 'bg-[#282B30] border-white/10' : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  {/* The Draggable Straw Manipulative (Supports HTML5 Mouse Drag AND Mobile Touch Drag) */}
                  <div
                    draggable={!disabled}
                    onDragStart={handleDragStart}
                    onTouchStart={handleTouchStart}
                    onClick={() => setShowQuickAdd(true)}
                    className={`relative group p-2 rounded-xl border border-dashed shadow-xs cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-all select-none flex items-center justify-center min-w-[52px] min-h-[70px] touch-none ${
                      isDark
                        ? 'bg-[#1F2125] hover:bg-[#181A1D] border-amber-400/60 hover:border-amber-300'
                        : 'bg-white hover:bg-amber-100/50 border-amber-400 hover:border-amber-500'
                    }`}
                    title="Tarik sedotan ini atau sentuh untuk memasukkan"
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
                      Tarik & lepas ke kantong di atas, atau klik tombol <strong>Pilih</strong>
                    </span>
                  </div>

                  <Sparkles className="w-4 h-4 text-amber-400 mr-1 hidden sm:block animate-pulse" />
                </div>

                {/* Quick Add Popover Panel */}
                <AnimatePresence>
                  {showQuickAdd && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      className={`p-2 rounded-xl border shadow-md space-y-1.5 ${
                        isDark ? 'bg-[#25282D] border-white/10' : 'bg-white border-amber-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-fun font-bold px-1 text-slate-500">
                        <span>Masukkan 1 Sedotan Langsung:</span>
                      </div>

                      {/* Kotak 1 Buttons */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black font-fun px-1.5 py-0.5 rounded-md bg-amber-500 text-slate-950 shrink-0">
                          Kotak 1
                        </span>
                        <div className="grid grid-cols-3 gap-1 flex-1">
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(1, 'ratusan')}
                            className="px-1 py-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white font-fun font-black text-[9px] shadow-xs cursor-pointer active:scale-90"
                          >
                            Ratusan
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(1, 'puluhan')}
                            className="px-1 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-fun font-black text-[9px] shadow-xs cursor-pointer active:scale-90"
                          >
                            Puluhan
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(1, 'satuan')}
                            className="px-1 py-1 rounded-md bg-rose-500 hover:bg-rose-400 text-white font-fun font-black text-[9px] shadow-xs cursor-pointer active:scale-90"
                          >
                            Satuan
                          </button>
                        </div>
                      </div>

                      {/* Kotak 2 Buttons */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black font-fun px-1.5 py-0.5 rounded-md bg-sky-500 text-white shrink-0">
                          Kotak 2
                        </span>
                        <div className="grid grid-cols-3 gap-1 flex-1">
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(2, 'ratusan')}
                            className="px-1 py-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white font-fun font-black text-[9px] shadow-xs cursor-pointer active:scale-90"
                          >
                            Ratusan
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(2, 'puluhan')}
                            className="px-1 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-fun font-black text-[9px] shadow-xs cursor-pointer active:scale-90"
                          >
                            Puluhan
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(2, 'satuan')}
                            className="px-1 py-1 rounded-md bg-rose-500 hover:bg-rose-400 text-white font-fun font-black text-[9px] shadow-xs cursor-pointer active:scale-90"
                          >
                            Satuan
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
