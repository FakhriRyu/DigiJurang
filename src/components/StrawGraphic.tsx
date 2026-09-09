import React from 'react';
import type { PlaceValue } from '../types';

interface StrawGraphicProps {
  type?: PlaceValue;
  color?: 'red' | 'blue' | 'emerald' | 'amber' | 'purple' | 'yellow' | string;
  size?: 'sm' | 'md' | 'lg';
  isCounted?: boolean;
  countIndex?: number;
  countValue?: number; // e.g. 100, 10, or 1
  interactive?: boolean;
  onClick?: () => void;
}

export const StrawGraphic: React.FC<StrawGraphicProps> = ({
  type = 'satuan',
  color,
  size = 'md',
  isCounted = false,
  countIndex,
  countValue,
  interactive = false,
  onClick
}) => {
  // Default color based on place value column if not explicitly overridden:
  // Ratusan = Blue straw (represents 100)
  // Puluhan = Yellow/Gold straw (represents 10)
  // Satuan = Red/Amber straw (represents 1)
  const defaultColor = color || (
    type === 'ratusan' ? 'blue' : type === 'puluhan' ? 'yellow' : 'amber'
  );

  const colorThemes: Record<string, { primary: string; secondary: string; stripe: string; border: string }> = {
    red: { primary: '#EF4444', secondary: '#DC2626', stripe: '#FEE2E2', border: '#B91C1C' },
    blue: { primary: '#0284C7', secondary: '#0369A1', stripe: '#E0F2FE', border: '#075985' },
    emerald: { primary: '#10B981', secondary: '#059669', stripe: '#D1FAE5', border: '#047857' },
    amber: { primary: '#D97706', secondary: '#B45309', stripe: '#FEF3C7', border: '#78350F' },
    yellow: { primary: '#F59E0B', secondary: '#D97706', stripe: '#FEF9C3', border: '#B45309' },
    purple: { primary: '#8B5CF6', secondary: '#7C3AED', stripe: '#EDE9FE', border: '#6D28D9' }
  };

  const theme = colorThemes[defaultColor] || colorThemes.amber;

  // Single Straw Dimensions
  const dimensions = {
    sm: { w: 14, h: 56 },
    md: { w: 18, h: 80 },
    lg: { w: 22, h: 100 }
  }[size];

  // Tooltip based on place value
  const valueLabel = type === 'ratusan' ? '1 Sedotan Ratusan (Nilai 100)' : type === 'puluhan' ? '1 Sedotan Puluhan (Nilai 10)' : '1 Sedotan Satuan (Nilai 1)';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none transition-transform ${
        interactive ? 'cursor-pointer hover:-translate-y-1 active:translate-y-0.5' : ''
      }`}
      title={valueLabel}
    >
      {/* Count badge when counted in proof mode */}
      {countIndex !== undefined && (
        <span
          className={`absolute -top-3.5 z-20 px-1.5 py-0.2 rounded-full text-[10px] font-black font-fun shadow-sm border transition-all ${
            isCounted
              ? 'bg-amber-400 text-amber-950 border-amber-500 scale-110'
              : 'bg-white text-slate-600 border-slate-300'
          }`}
        >
          {countValue ? `${countValue}` : `#${countIndex}`}
        </span>
      )}

      {/* 1 Single Straw Vector SVG */}
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 20 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-sm transition-all duration-200 ${
          isCounted ? 'filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)] scale-105' : ''
        }`}
      >
        {/* Main Straw Body */}
        <rect
          x="3"
          y="2"
          width="14"
          height="86"
          rx="7"
          fill={theme.primary}
          stroke={theme.border}
          strokeWidth="1.5"
        />

        {/* Diagonal Stripes Pattern */}
        <path d="M3 14 L17 24 L17 29 L3 19 Z" fill={theme.stripe} opacity="0.9" />
        <path d="M3 34 L17 44 L17 49 L3 39 Z" fill={theme.stripe} opacity="0.9" />
        <path d="M3 54 L17 64 L17 69 L3 59 Z" fill={theme.stripe} opacity="0.9" />
        <path d="M3 74 L17 84 L17 89 L3 79 Z" fill={theme.stripe} opacity="0.9" />

        {/* Accordion Bend Joint */}
        <rect x="2.5" y="16" width="15" height="2" rx="1" fill={theme.border} opacity="0.6" />
        <rect x="2.5" y="20" width="15" height="2" rx="1" fill={theme.border} opacity="0.6" />
        <rect x="2.5" y="24" width="15" height="2" rx="1" fill={theme.border} opacity="0.6" />

        {/* Cylindrical Gloss Highlight */}
        <rect x="5" y="4" width="2" height="82" rx="1" fill="#FFFFFF" opacity="0.5" />
      </svg>
    </div>
  );
};
