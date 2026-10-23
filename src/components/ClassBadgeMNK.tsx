import React, { useState } from 'react';

interface ClassBadgeMNKProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ClassBadgeMNK: React.FC<ClassBadgeMNKProps> = ({ size = 'md', className = '' }) => {
  const [imgSrc, setImgSrc] = useState('/images/mmk-badge.png');

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64'
  }[size];

  const handleImgError = () => {
    // If local path fails for any reason, fallback to direct ImgBB CDN URL
    if (imgSrc !== 'https://i.ibb.co/TDSHm7j8/929ebe10-b0ba-4178-a758-2824b802331d.png') {
      setImgSrc('https://i.ibb.co/TDSHm7j8/929ebe10-b0ba-4178-a758-2824b802331d.png');
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow & Ambient Blue Aura */}
      <div className="absolute inset-0 rounded-3xl bg-blue-500/25 blur-2xl animate-pulse pointer-events-none" />
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-b from-amber-400/30 via-blue-600/20 to-transparent blur-xl pointer-events-none" />

      {/* Main Image Container */}
      <div className={`relative ${sizeClasses} flex items-center justify-center transition-transform hover:scale-105 duration-300`}>
        <img
          src={imgSrc}
          alt="Biểu tượng MMK AI CREATIVE Khóa học AI"
          className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] filter"
          onError={handleImgError}
          loading="eager"
        />
      </div>
    </div>
  );
};
