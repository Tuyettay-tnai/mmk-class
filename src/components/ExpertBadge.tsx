import React from 'react';

interface ExpertBadgeProps {
  className?: string;
}

export const ExpertBadge: React.FC<ExpertBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Golden Crown on top */}
      <div className="relative -mb-3 z-20 flex items-center justify-center">
        <svg className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_4px_12px_rgba(245,158,11,0.8)]" viewBox="0 0 48 48" fill="none">
          {/* Crown Base */}
          <path 
            d="M6 34L10 16L18 24L24 10L30 24L38 16L42 34H6Z" 
            fill="url(#goldCrown)" 
            stroke="#FEF08A" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
          {/* Jewels */}
          <circle cx="24" cy="10" r="3" fill="#60A5FA" stroke="#FEF08A" strokeWidth="1"/>
          <circle cx="10" cy="16" r="2.5" fill="#EF4444" stroke="#FEF08A" strokeWidth="1"/>
          <circle cx="38" cy="16" r="2.5" fill="#EF4444" stroke="#FEF08A" strokeWidth="1"/>
          <circle cx="24" cy="28" r="2.5" fill="#FDE68A"/>
          {/* Crown Rim band */}
          <rect x="6" y="34" width="36" height="5" rx="2" fill="url(#crownBand)" stroke="#F59E0B" strokeWidth="1"/>
          <defs>
            <linearGradient id="goldCrown" x1="6" y1="10" x2="42" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFBEB"/>
              <stop offset="0.3" stopColor="#FDE68A"/>
              <stop offset="0.7" stopColor="#D97706"/>
              <stop offset="1" stopColor="#92400E"/>
            </linearGradient>
            <linearGradient id="crownBand" x1="6" y1="34" x2="42" y2="39" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B"/>
              <stop offset="0.5" stopColor="#FEF08A"/>
              <stop offset="1" stopColor="#B45309"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Banner / Ribbon: "Chuyên Gia AI" */}
      <div className="relative z-10 px-6 py-1 rounded-full bg-gradient-to-r from-blue-900 via-sky-600 to-blue-900 border border-amber-300/80 shadow-lg">
        <span className="italic font-brand text-xs md:text-sm font-bold tracking-wider text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          Chuyên Gia AI
        </span>
      </div>

      {/* Golden Nameplate Frame: "Ngô Tuyết" */}
      <div className="relative -mt-2 z-10 w-full max-w-sm md:max-w-md p-[2px] rounded-2xl md:rounded-3xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 shadow-[0_10px_35px_rgba(245,158,11,0.3)]">
        <div className="w-full rounded-[14px] md:rounded-[22px] bg-gradient-to-b from-[#0c234b] via-[#091b3b] to-[#040e21] py-2 md:py-3 px-6 md:px-10 border border-sky-400/30 flex items-center justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center">
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#FDE047] to-[#CA8A04] bg-clip-text text-transparent font-heading filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
              Ngô Tuyết
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
