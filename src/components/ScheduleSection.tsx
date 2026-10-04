import React from 'react';
import { Calendar, Clock, Video, BellRing, Laptop, Users, ShieldAlert } from 'lucide-react';
import { CLASS_INFO } from '../data/courses';

export const ScheduleSection: React.FC = () => {
  return (
    <section id="schedule" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#050A17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full">
              Lịch Học & Phòng Học Trực Tuyến
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Thời Gian Khai Giảng & Quy Cách Tham Gia
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Học viên tham gia trực tiếp qua Zoom để tương tác và hỏi đáp trực tiếp cùng Chuyên Gia Ngô Tuyết.
          </p>
        </div>

        {/* 3 Step Timeline / Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c1935] to-[#081023] border border-blue-500/25 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-400/40 flex items-center justify-center text-sky-400 mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-sky-400 tracking-wider uppercase">Buổi 01 · Cơ Bản Đến Nâng Cao</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">
              Khai Phá Siêu Trợ Lý ChatGPT & Tự Động Hóa
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Khám phá 6 kỹ năng tinh hoa ChatGPT, công thức viết Prompt đỉnh cao và xây dựng trợ lý AI tự động cho công việc hàng ngày.
            </p>
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 pt-3 border-t border-slate-800">
              <Clock className="w-3.5 h-3.5" />
              19:30 - 21:30 | Thứ Ba
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c1935] to-[#081023] border border-blue-500/25 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-cyan-900/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">Buổi 02 · Thực Hành Trực Tiếp</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">
              Thiết Kế Website Vibe Code & Landing Page
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Cầm tay chỉ việc: Biến ý tưởng thành website thương mại, landing page bán hàng và gắn kết Google Sheets lưu khách hàng tự động.
            </p>
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 pt-3 border-t border-slate-800">
              <Clock className="w-3.5 h-3.5" />
              19:30 - 21:30 | Thứ Năm
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c1935] to-[#081023] border border-blue-500/25 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-rose-900/60 border border-rose-400/40 flex items-center justify-center text-rose-300 mb-4">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-rose-400 tracking-wider uppercase">Buổi 03 · Đột Phá Doanh Số & Giáo Trình</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">
              Sản Xuất Video AI Đa Kênh & Giáo Án Số 4.0
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Quy trình làm video ngắn triệu view trên TikTok, YouTube Reels kết hợp soạn giáo trình số tương tác thông minh cho giáo viên.
            </p>
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 pt-3 border-t border-slate-800">
              <Clock className="w-3.5 h-3.5" />
              19:30 - 21:30 | Thứ Bảy
            </div>
          </div>

        </div>

        {/* 30-Minute Automatic Reminder Feature Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-400/40 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <BellRing className="w-7 h-7 animate-bounce" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span>Hệ Thống Tự Động Gửi Email Nhắc Zoom Trước 30 Phút</span>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-emerald-950 text-emerald-300 border border-emerald-700">
                Tự Động 100%
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Bạn không lo bị quên lịch học! Hệ thống Google Apps Script thông minh sẽ tự động gửi Email kèm link đăng nhập Zoom trực tiếp trước giờ khai giảng 30 phút, đảm bảo bạn luôn có mặt đúng giờ và giữ vị trí phòng học VIP.
            </p>
          </div>

          <a
            href="https://zalo.me/g/pccjfp974"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Users className="w-4 h-4" />
            <span>Vào Nhóm Zalo Nhận Lịch</span>
          </a>
        </div>

      </div>
    </section>
  );
};
