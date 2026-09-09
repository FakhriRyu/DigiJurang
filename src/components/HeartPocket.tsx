import React from 'react';
import type { PlaceValue } from '../types';
import { StrawGraphic } from './StrawGraphic';
import { Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

interface HeartPocketProps {
  type: PlaceValue;
  rowNumber: 1 | 2 | 3;
  count: number;
  isInteractive: boolean;
  isSliding: boolean;
  isOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onUpdateValue?: (delta: number) => void;
  onBorrow?: () => void;
  canBorrow?: boolean;
  borrowLabel?: string;
}

export const HeartPocket: React.FC<HeartPocketProps> = ({
  type,
  rowNumber,
  count,
  isInteractive,
  isSliding,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onUpdateValue,
  onBorrow,
  canBorrow,
  borrowLabel
}) => {
  // Visual themes matching the real photo:
  // Ratusan = Blue pocket with orange heart
  // Puluhan = Yellow pocket with coral heart
  // Satuan = Brown/Rose pocket with gold heart
  const theme = {
    ratusan: {
      pocketBg: 'bg-[#38BDF8]',
      pocketBorder: 'border-[#0284C7]',
      stitchColor: 'border-white/90',
      heartBg: 'bg-[#FB923C]',
      heartBorder: 'border-white/80',
      heartColor: '#FFFFFF',
      badge: 'bg-[#0369A1] text-white',
      accent: 'text-sky-950'
    },
    puluhan: {
      pocketBg: 'bg-[#FBBF24]',
      pocketBorder: 'border-[#D97706]',
      stitchColor: 'border-white/90',
      heartBg: 'bg-[#F87171]',
      heartBorder: 'border-white/80',
      heartColor: '#FFFFFF',
      badge: 'bg-[#B45309] text-white',
      accent: 'text-amber-950'
    },
    satuan: {
      pocketBg: 'bg-[#B45309]', // Warm reddish brown like in photo
      pocketBorder: 'border-[#78350F]',
      stitchColor: 'border-white/90',
      heartBg: 'bg-[#FBBF24]',
      heartBorder: 'border-white/80',
      heartColor: '#FFFFFF',
      badge: 'bg-[#451A03] text-white',
      accent: 'text-amber-950'
    }
  }[type];

  const strawColors = ['red', 'blue', 'emerald', 'amber', 'purple'];
  const items = Array.from({ length: Math.min(count, 12) }, (_, i) => i);
  const hasMore = count > 12;

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative flex flex-col items-center select-none transition-all duration-150 ${
        isOver ? 'scale-105' : ''
      }`}
    >
      {/* Straws peaking out of the pocket opening with clear spacing */}
      <div className="w-full flex flex-wrap items-end justify-center gap-1 sm:gap-2 min-h-[48px] sm:min-h-[58px] px-0.5 sm:px-1 z-0 overflow-visible pb-0.5">
        <AnimatePresence>
          {items.map((idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, y: 15 }}
              animate={{
                scale: 1,
                y: isSliding && (rowNumber === 1 || rowNumber === 2) ? 60 : 0,
                opacity: isSliding && (rowNumber === 1 || rowNumber === 2) ? 0.2 : 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25, delay: idx * 0.015 }}
              className="origin-bottom"
            >
              <StrawGraphic
                type={type}
                color={strawColors[idx % strawColors.length]}
                size="sm"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {count === 0 && (
          <span className="text-[10px] sm:text-[11px] font-fun text-slate-400/80 italic pb-1">
            (Kosong)
          </span>
        )}
      </div>

      {/* Main Pocket Body (Shaped like denim stitched pocket in reference photo) */}
      <div
        className={`relative w-full ${theme.pocketBg} border ${theme.pocketBorder} rounded-b-xl sm:rounded-b-2xl rounded-t-sm sm:rounded-t-md p-1.5 sm:p-2.5 shadow-md flex flex-col items-center justify-between min-h-[82px] sm:min-h-[95px] z-10 ${
          isOver ? 'ring-2 ring-yellow-300' : ''
        }`}
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)'
        }}
      >
        {/* White dashed stitching line around pocket edge */}
        <div
          className={`absolute inset-0.5 sm:inset-1 border border-dashed ${theme.stitchColor} rounded-b-lg sm:rounded-b-xl rounded-t-xs pointer-events-none`}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)'
          }}
        ></div>

        {/* Top Rim Strip */}
        <div className="w-full flex items-center justify-between z-20 pt-0.5">
          <span className={`text-[9px] sm:text-[10px] font-black font-fun px-1 sm:px-1.5 py-0.2 rounded-md ${theme.badge} shadow-xs`}>
            {count}
          </span>

          {/* Quick +/- Buttons */}
          {isInteractive && onUpdateValue && (
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (count > 0) {
                    onUpdateValue(-1);
                    sound.playRemove();
                  }
                }}
                disabled={count === 0}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center text-[10px] sm:text-xs font-black shadow-xs active:scale-90 disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateValue(1);
                  sound.playPop(1.1);
                }}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center text-[10px] sm:text-xs font-black shadow-xs active:scale-90 cursor-pointer"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          )}
        </div>

        {/* The Heart Patch in the Center (Exact Match to Photo) */}
        <div className="relative my-auto flex items-center justify-center z-10 py-0.5 sm:py-1">
          <div
            className={`w-7 h-7 sm:w-10 sm:h-10 ${theme.heartBg} border border-dashed ${theme.heartBorder} rounded-full flex items-center justify-center shadow-xs transform hover:scale-110 transition-transform`}
            style={{
              clipPath:
                'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")'
            }}
          >
            {/* Heart Inner Stitch */}
            <span className="text-white text-xs font-black drop-shadow-xs"></span>
          </div>

          {/* SVG Heart Overlay for crisp presentation */}
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 filter drop-shadow-xs"
            viewBox="0 0 24 24"
            fill={type === 'ratusan' ? '#FB923C' : type === 'puluhan' ? '#F87171' : '#FBBF24'}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Value Label at Bottom Tip */}
        <div className="text-[9px] sm:text-[10px] font-black font-fun text-white/95 tracking-wide drop-shadow-xs z-10 pb-0.5 sm:pb-1">
          {type === 'ratusan' ? `${count * 100}` : type === 'puluhan' ? `${count * 10}` : `${count}`}
        </div>
      </div>

      {hasMore && (
        <span className="text-[8px] sm:text-[9px] font-bold text-slate-700 bg-white px-1.5 py-0.2 rounded-full shadow-xs border border-slate-300 mt-1">
          +{count - 12}
        </span>
      )}

      {/* Borrow helper button under pocket if active */}
      {canBorrow && onBorrow && (
        <button
          type="button"
          onClick={onBorrow}
          className="mt-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-[9px] sm:text-[10px] font-black font-fun shadow-sm border border-yellow-500 animate-bounce flex items-center justify-center gap-1 z-30 cursor-pointer max-w-full"
        >
          <span className="truncate">⚡ {borrowLabel || 'Pinjam'}</span>
        </button>
      )}
    </div>
  );
};
