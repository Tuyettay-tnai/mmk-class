import React from 'react';

interface ClassBadgeMNKProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ClassBadgeMNK: React.FC<ClassBadgeMNKProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-24 h-24 text-2xl',
    md: 'w-32 h-32 md:w-36 md:h-36 text-4xl',
    lg: 'w-44 h-44 md:w-52 md:h-52 text-5xl md:text-6xl'
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow & Aura */}
      <div className="absolute inset-0 rounded-3xl bg-blue-500/25 blur-xl animate-pulse" />
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-amber-400/40 via-blue-600/30 to-blue-900/60 blur-md" />

      {/* Main Shield Container */}
      <div className={`relative ${sizeClasses} rounded-2xl md:rounded-3xl p-[3px] bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-2xl flex flex-col items-center justify-center overflow-hidden`}>
        {/* Inner Radial Background */}
        <div className="w-full h-full rounded-[14px] md:rounded-[22px] bg-gradient-to-b from-[#0e2a5f] via-[#091b40] to-[#040c1d] flex flex-col items-center justify-between py-2 md:py-3 px-2 border border-blue-400/40 shadow-inner relative">
          
          {/* Subtle Top Sheen */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-[20px]" />

          {/* Academic Graduation Cap (Mortarboard) */}
          <div className="relative z-10 -mt-1 md:-mt-2 flex items-center justify-center">
            <svg className="w-8 h-8 md:w-11 md:h-11 drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]" viewBox="0 0 48 48" fill="none">
              {/* Cap Base */}
              <path d="M24 6L4 16L24 26L44 16L24 6Z" fill="url(#goldGradCap)" stroke="#FEF08A" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 21V33C12 37 17.5 40 24 40C30.5 40 36 37 36 33V21" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round"/>
              {/* Tassel */}
              <path d="M40 18V30C40 32 38.5 34 37 34" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="37" cy="34" r="2" fill="#FDE68A"/>
              <defs>
                <linearGradient id="goldGradCap" x1="4" y1="6" x2="44" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A"/>
                  <stop offset="0.5" stopColor="#F59E0B"/>
                  <stop offset="1" stopColor="#B45309"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* "MNK" 3D Gold Typography */}
          <div className="relative z-10 flex items-center justify-center tracking-tight font-black leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            <span className="bg-gradient-to-b from-[#FFFBEB] via-[#FBBF24] to-[#B45309] bg-clip-text text-transparent font-extrabold filter drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]">
              MNK
            </span>
          </div>

          {/* "-CLASS-" Ribbon Plate */}
          <div className="relative z-10 w-full flex items-center justify-center">
            <div className="px-2.5 py-0.5 md:py-1 rounded-full bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 border border-sky-300 shadow-md flex items-center justify-center">
              <span className="text-[9px] md:text-[11px] font-black tracking-widest text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                -CLASS-
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
