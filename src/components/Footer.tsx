import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { CLASS_INFO } from '../data/courses';

interface FooterProps {
  onOpenAppsScriptModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppsScriptModal }) => {
  return (
    <footer className="bg-[#03060e] border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-7 rounded-lg bg-gradient-to-tr from-blue-700 to-amber-500 flex items-center justify-center text-xs font-black text-white">
                MNK
              </span>
              <span className="text-base font-black text-white tracking-tight font-heading">
                MNK - CLASS · AI MASTERCLASS
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Chương trình đào tạo thực chiến 100% miễn phí được dẫn dắt bởi <strong>Chuyên Gia AI Ngô Tuyết</strong>. Giúp học viên làm chủ Website Vibe Code, ChatGPT, Video AI đa kênh và Giáo trình số.
            </p>
            <div className="text-slate-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Chương trình phi lợi nhuận vì cộng đồng AI Việt Nam</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Chương Trình Đào Tạo
            </div>
            <ul className="space-y-1.5">
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Thiết Kế Website Vibe Code</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Skill ChatGPT Toàn Diện</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Sản Xuất Video Xây Kênh AI</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Giáo Trình Số Cho Giáo Viên</a></li>
            </ul>
          </div>

          {/* Community & Setup */}
          <div className="space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Cộng Đồng & Hỗ Trợ
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://zalo.me/g/pccjfp974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-semibold"
                >
                  <span>Nhóm Zalo VIP Lớp Học</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAppsScriptModal}
                  type="button"
                  className="text-slate-300 hover:text-amber-400 transition-colors text-left"
                >
                  Mã Google Apps Script & Hướng dẫn
                </button>
              </li>
              <li className="text-slate-400">
                Hình thức học: Online Zoom Meeting
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © 2026 MNK - CLASS. Bản quyền nội dung thuộc về <strong>Chuyên Gia AI Ngô Tuyết</strong>.
          </div>
          <div className="flex items-center gap-1">
            <span>Đồng hành cùng cộng đồng công nghệ & giáo dục số</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 mx-1" />
            <span>Việt Nam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
