import React from 'react';
import { Award, CheckCircle, HeartHandshake, Sparkles, Target, Zap } from 'lucide-react';
import { ExpertBadge } from './ExpertBadge';

export const ExpertSection: React.FC = () => {
  return (
    <section id="expert" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#060B18] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-3xl p-1 bg-gradient-to-b from-amber-400/50 via-blue-600/40 to-slate-900 border border-amber-400/30 shadow-2xl">
              
              {/* Inner Card Container */}
              <div className="w-full rounded-[22px] bg-gradient-to-b from-[#0c1834] via-[#091329] to-[#040813] p-6 text-center relative overflow-hidden">
                
                {/* Decorative Pattern & Glow */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none" />

                {/* Avatar / Portrait Box */}
                <div className="relative mx-auto w-52 h-64 sm:w-60 sm:h-72 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.3)] mb-6 bg-slate-900 group">
                  <img
                    src="/images/ngo-tuyet.png"
                    alt="Chuyên Gia AI Ngô Tuyết - MMK - CLASS"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://i.ibb.co/W40WQ9jX/Chat-GPT-Image-13-02-49-1-thg-10-2026.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 inset-x-2 text-center pointer-events-none">
                    <span className="text-[11px] uppercase tracking-wider text-amber-300 font-extrabold px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 shadow-md">
                      Chuyên Gia AI Ngô Tuyết
                    </span>
                  </div>
                </div>

                {/* Official Gold Expert Badge */}
                <ExpertBadge className="scale-90 sm:scale-100" />

                <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-around">
                  <div>
                    <span className="block font-mono font-bold text-base text-amber-400">10,000+</span>
                    <span className="text-slate-400">Học viên cả nước</span>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <span className="block font-mono font-bold text-base text-sky-400">100%</span>
                    <span className="text-slate-400">Thực chiến ứng dụng</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Bio & Core Values */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3.5 py-1 rounded-full">
                Người Đồng Hành Cùng Bạn
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Sứ Mệnh Phổ Cập AI Thực Chiến Cho
              <span className="text-gold-gradient font-heading block mt-1">
                Người Việt Đột Phá Năng Suất
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
              <strong>Chuyên Gia AI Ngô Tuyết</strong> là một trong những chuyên gia tiên phong tại Việt Nam trong lĩnh vực ứng dụng Trí tuệ Nhân tạo vào công việc, kinh doanh thực chiến và giáo dục số.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Với triết lý <em className="text-amber-300 font-medium">"Không dạy lý thuyết hàn lâm — Chỉ dạy thứ mang lại kết quả ngay lập tức"</em>, lớp học <strong>MMK - CLASS</strong> được cô đọng bằng các quy trình rõ ràng, công thức câu lệnh (Prompt) chuẩn xác, giúp người học dù không am hiểu công nghệ vẫn có thể làm chủ AI nhanh chóng.
            </p>

            {/* 3 Pillars of Commitment */}
            <div className="mt-8 space-y-4">
              
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Cầm tay chỉ việc & Ứng dụng ngay trong buổi học</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Từng thao tác tạo website vibe coding, viết prompt ChatGPT, render video AI hay soạn giáo án số đều được hướng dẫn trực tiếp trên màn hình Zoom.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Hỗ trợ trọn đời qua Nhóm Zalo Kín</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Sau giờ học, học viên tiếp tục được chuyên gia và đội ngũ trợ giảng giải đáp thắc mắc, cập nhật công cụ AI mới nhất tại nhóm Zalo VIP.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tặng toàn bộ kho Prompt & Bộ công cụ bản quyền</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Tất cả học viên tham dự đầy đủ sẽ được nhận trọn bộ tài liệu độc quyền từ Chuyên Gia Ngô Tuyết để ứng dụng lâu dài.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
