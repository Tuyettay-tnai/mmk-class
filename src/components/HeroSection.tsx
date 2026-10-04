import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, Video, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ClassBadgeMNK } from './ClassBadgeMNK';
import { ExpertBadge } from './ExpertBadge';
import { CLASS_INFO } from '../data/courses';

interface HeroSectionProps {
  onScrollToForm: () => void;
  onOpenAppsScriptModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm, onOpenAppsScriptModal }) => {
  // Simulated countdown timer (starts at 2 days, 14 hours, 32 mins, 40 secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-800/60">
      {/* High-Tech Ambient Grid & Lighting Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(14,165,233,0.18),rgba(6,11,24,0))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Urgency & Live Indicator Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-8">
          <div className="flex items-center gap-2 bg-blue-950/70 border border-blue-500/30 rounded-full px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-300 font-semibold">Chương Trình Đào Tạo Trực Tuyến 100% Miễn Phí</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Video className="w-4 h-4 text-sky-400" />
            <span>Trực tiếp qua Zoom Meeting</span>
            <span aria-hidden="true">·</span>
            <Clock className="w-4 h-4 text-amber-400" />
            <span>19:30 - 21:30</span>
          </div>
        </div>

        {/* Main Headline Block */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3.5 py-1 rounded-full">
              Khóa Huấn Luyện AI Toàn Diện
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-5">
            LÀM CHỦ CÔNG NGHỆ AI ĐỘT PHÁ
            <span className="block mt-2 text-gold-gradient font-heading">
              CÙNG CHUYÊN GIA AI NGÔ TUYẾT
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Chương trình đào tạo thực chiến 4 trong 1: Tự làm Website Vibe Code, Thành thạo kỹ năng ChatGPT, Sản xuất Video xây kênh triệu view và Số hóa giáo trình giảng dạy chuẩn 4.0.
          </p>
        </div>

        {/* VISUAL SHOWCASE: Replicating the Visual Structure of the Poster */}
        <div className="relative max-w-5xl mx-auto my-10 p-4 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B1528]/90 via-[#070D1E]/95 to-[#040814] border border-blue-500/25 shadow-2xl overflow-hidden">
          
          {/* Subtle Cyber Grid Lines inside banner */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Centerpiece MNK - CLASS Badge */}
          <div className="relative z-10 flex flex-col items-center justify-center mb-8">
            <ClassBadgeMNK size="lg" />
          </div>

          {/* 4 Flagship Course Modules (The 4 Pillars from the poster) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            
            {/* 1. Thiết Kế Website Vibe Code */}
            <div className="relative group p-5 rounded-2xl bg-[#0d1c38]/80 hover:bg-[#102447] border border-blue-500/30 hover:border-cyan-400/60 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-lg shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  &lt;/&gt;
                </div>
                <div>
                  <div className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">Đào Tạo Kỹ Năng 01</div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                    THIẾT KẾ WEBSITE VIBE CODE
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Tự tay tạo website, landing page bán hàng và portfolio tuyệt đẹp chỉ bằng câu lệnh tự nhiên (Prompt AI), không cần biết một dòng code.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/50 text-blue-200 border border-blue-700/50">Landing Page</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/50 text-blue-200 border border-blue-700/50">Chuẩn SEO</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/50 text-blue-200 border border-blue-700/50">Miễn phí Hosting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Đào Tạo Skill ChatGPT */}
            <div className="relative group p-5 rounded-2xl bg-[#0d1c38]/80 hover:bg-[#102447] border border-blue-500/30 hover:border-emerald-400/60 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  💬
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">Đào Tạo Kỹ Năng 02</div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-200 transition-colors">
                    SKILL CHATGPT TOÀN DIỆN
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Làm chủ 6 sức mạnh cốt lõi: Lên ý tưởng • Viết nội dung • Tạo hình ảnh • Tạo video • Phân tích số liệu • Tự động hóa quy trình.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">Ý tưởng</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">Viết bài</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">Tạo ảnh/Video</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">Tự động hóa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Đào Tạo Sản Xuất Video Xây Kênh AI */}
            <div className="relative group p-5 rounded-2xl bg-[#0d1c38]/80 hover:bg-[#102447] border border-blue-500/30 hover:border-rose-400/60 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-950 border border-rose-400/40 flex items-center justify-center text-rose-300 font-bold text-xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  🎬
                </div>
                <div>
                  <div className="text-[11px] font-bold text-rose-400 tracking-wider uppercase">Đào Tạo Kỹ Năng 03</div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                    SẢN XUẤT VIDEO XÂY KÊNH AI
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Sản xuất hàng trăm video ngắn thu hút hàng triệu lượt xem trên TikTok, YouTube Shorts, Reels và dựng tự động với CapCut.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">TikTok</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800">YouTube</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">Facebook</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-600">CapCut AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Đào Tạo Xây Dựng Giáo Trình Số Cho Giáo Viên */}
            <div className="relative group p-5 rounded-2xl bg-[#0d1c38]/80 hover:bg-[#102447] border border-blue-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  📖
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">Đào Tạo Kỹ Năng 04</div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    XÂY DỰNG GIÁO TRÌNH SỐ CHO GIÁO VIÊN
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Giải pháp số hóa bài giảng tương tác, tạo tài nguyên trực quan, ngân hàng bài tập, đề kiểm tra thông minh và chứng nhận số.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">Bài giảng</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">Tài nguyên</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">Bài tập</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">Kiểm tra</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Lower Centerpiece: Chuyên Gia AI Ngô Tuyết Badge */}
          <div className="relative z-10 mt-10 flex flex-col items-center justify-center">
            <ExpertBadge />
          </div>

        </div>

        {/* Urgency Counter & Call-To-Action Block */}
        <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-blue-950/70 to-slate-900/90 border border-amber-400/40 text-center shadow-xl">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 mb-2">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Suất học tài trợ miễn phí có hạn:
            </span>
            <span className="font-bold text-white">
              Đã nhận <span className="text-amber-400 font-mono text-base">{CLASS_INFO.claimedSeats}</span> / {CLASS_INFO.totalFreeSeats} vé
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-5 p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 rounded-full transition-all duration-1000"
              style={{ width: `${(CLASS_INFO.claimedSeats / CLASS_INFO.totalFreeSeats) * 100}%` }}
            />
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
            <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-2 min-w-[60px]">
              <span className="block text-xl sm:text-2xl font-mono font-bold text-amber-400">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-slate-400">Ngày</span>
            </div>
            <span className="text-amber-400 font-bold text-xl">:</span>
            <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-2 min-w-[60px]">
              <span className="block text-xl sm:text-2xl font-mono font-bold text-amber-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-slate-400">Giờ</span>
            </div>
            <span className="text-amber-400 font-bold text-xl">:</span>
            <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-2 min-w-[60px]">
              <span className="block text-xl sm:text-2xl font-mono font-bold text-amber-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-slate-400">Phút</span>
            </div>
            <span className="text-amber-400 font-bold text-xl">:</span>
            <div className="bg-slate-950/80 border border-slate-700 rounded-lg p-2 min-w-[60px]">
              <span className="block text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-slate-400">Giây</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onScrollToForm}
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-lg hover:shadow-amber-400/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>ĐĂNG KÝ GIỮ VÉ MIỄN PHÍ NGAY</span>
              <ArrowRight className="w-5 h-5 text-slate-900" />
            </button>

            <a
              href="https://zalo.me/g/pccjfp974"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-sky-200" />
              <span>Vào Nhóm Zalo Nhận Vé</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Cam kết 100% không thu phí • Tặng kèm kho tài liệu & Prompt AI độc quyền
          </p>

        </div>

      </div>
    </section>
  );
};
