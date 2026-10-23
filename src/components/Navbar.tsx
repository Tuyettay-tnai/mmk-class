import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onScrollToForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToForm,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#060B18]/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2.5 group"
        >
          <img 
            src="/images/mmk-badge.png" 
            alt="MMK" 
            className="w-9 h-9 object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform drop-shadow"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/TDSHm7j8/929ebe10-b0ba-4178-a758-2824b802331d.png';
            }}
          />
          <span className="font-heading tracking-wide">MMK - CLASS</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#courses" className="hover:text-amber-400 transition-colors">
            4 Khóa Học Thực Chiến
          </a>
          <a href="#expert" className="hover:text-amber-400 transition-colors">
            Chuyên Gia Ngô Tuyết
          </a>
          <a href="#schedule" className="hover:text-amber-400 transition-colors">
            Lịch Học & Phòng Zoom
          </a>
          <a 
            href="https://zalo.me/g/pccjfp974" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Nhóm Zalo VIP
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center">
          <button
            onClick={onScrollToForm}
            type="button"
            className="px-5 py-2.5 text-xs md:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md hover:shadow-amber-400/20 active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            Nhận Vé Miễn Phí
          </button>
        </div>

      </div>
    </header>
  );
};
