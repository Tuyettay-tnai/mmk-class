import React from 'react';
import { COURSE_MODULES } from '../data/courses';
import { Code, Bot, Video, BookOpen, Check, ArrowRight } from 'lucide-react';

interface CourseModulesSectionProps {
  onSelectCourseToRegister: (courseTitle: string) => void;
}

export const CourseModulesSection: React.FC<CourseModulesSectionProps> = ({ onSelectCourseToRegister }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="w-6 h-6 text-cyan-400" />;
      case 'chatgpt':
        return <Bot className="w-6 h-6 text-emerald-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-rose-400" />;
      case 'book':
        return <BookOpen className="w-6 h-6 text-amber-400" />;
      default:
        return <Bot className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="courses" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#050914] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3 py-1 rounded-full">
              Khung Chương Trình Đào Tạo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            4 Trụ Cột Đào Tạo Thực Chiến Tại
            <span className="text-gold-gradient font-heading ml-2">MNK - CLASS</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Nội dung thiết kế thực chiến, hướng dẫn từng bước trực quan. Bạn có thể chọn học theo từng kỹ năng hoặc đăng ký nhận vé trọn bộ 4 học phần.
          </p>
        </div>

        {/* 4 In-Depth Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COURSE_MODULES.map((course, index) => (
            <div
              key={course.id}
              className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0c162d] to-[#080e1e] border border-slate-800 hover:border-slate-600 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Subtle Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      {getIcon(course.iconType)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                        Module 0{index + 1} · {course.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {course.shortTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm font-semibold text-sky-300 mb-3">
                  "{course.tagline}"
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Skills Checklist (From poster bullets) */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Kỹ năng sẽ đạt được:
                  </span>
                  {course.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Platforms if present */}
                {course.platforms && (
                  <div className="mb-6 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-400 font-medium">Nền tảng thực chiến:</span>
                    {course.platforms.map((p, pIdx) => (
                      <span 
                        key={pIdx} 
                        className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-200 border border-slate-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Target Audience */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 mb-6">
                  <strong className="text-slate-300">Phù hợp nhất cho:</strong> {course.audience}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Tài trợ 100% Học phí
                </span>

                <button
                  onClick={() => onSelectCourseToRegister(course.title)}
                  type="button"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded-lg border border-slate-700 hover:border-amber-300 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Chọn Khóa Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Combo Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-blue-950/90 border border-amber-400/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30">
              Đặc Quyền Vé VIP MNK - CLASS
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              Nhận Trọn Bộ Combo 4 Khóa Học Miễn Phí
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Học viên đăng ký sớm được kích hoạt vé học cả 4 học phần, tặng kèm tài liệu giáo trình số và bộ Prompt AI độc quyền từ Chuyên Gia Ngô Tuyết.
            </p>
          </div>

          <button
            onClick={() => onSelectCourseToRegister('Trọn bộ combo 4 khóa học AI MNK - Class')}
            type="button"
            className="px-6 py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-lg hover:shadow-amber-400/25 active:scale-95 transition-all whitespace-nowrap flex items-center gap-2"
          >
            <span>ĐĂNG KÝ TRỌN BỘ COMBO</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </button>
        </div>

      </div>
    </section>
  );
};
