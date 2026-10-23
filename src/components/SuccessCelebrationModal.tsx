import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ExternalLink, Mail, Bell, Copy, Check, Sparkles, MessageCircle, AlertTriangle } from 'lucide-react';
import { SubmissionResult } from '../types';
import { CLASS_INFO } from '../data/courses';

interface SuccessCelebrationModalProps {
  isOpen: boolean;
  result: SubmissionResult | null;
  onClose: () => void;
}

export const SuccessCelebrationModal: React.FC<SuccessCelebrationModalProps> = ({
  isOpen,
  result,
  onClose
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);

        return () => clearTimeout(timer);
      } catch (err) {
        // Safe fallback if canvas not ready
      }
    }
  }, [isOpen]);

  if (!isOpen || !result) return null;

  const zaloUrl = result.zaloGroupUrl || CLASS_INFO.zaloGroupUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(zaloUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#0e1a38] via-[#091329] to-[#040916] border-2 border-amber-400/80 shadow-[0_0_60px_rgba(245,158,11,0.3)] overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
          title="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Header */}
        <div className="relative bg-gradient-to-r from-blue-900 via-sky-700 to-blue-900 pt-8 pb-7 px-6 text-center border-b border-sky-400/40">
          
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg mb-3 animate-bounce">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest mb-2">
            MMK - CLASS VIP TICKET
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            CHÚC MỪNG BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG!
          </h3>

          <p className="text-sm text-sky-100 mt-1 max-w-lg mx-auto">
            Học viên: <strong className="text-amber-300 font-bold">{result.studentName || 'Bạn'}</strong> đã được giữ vé học miễn phí cùng Chuyên Gia AI Ngô Tuyết!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Ticket Information Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-amber-400/40 shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mã Vé VIP Của Bạn:
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-amber-400 tracking-wider">
                  {result.ticketCode || 'VIP-MMK-ONLINE'}
                </span>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-500/30 text-xs text-sky-300">
                Lịch Học: <strong className="text-white">{CLASS_INFO.scheduleDisplay}</strong>
              </div>
            </div>

            <div className="pt-3 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Phòng học trực tuyến Zoom Meeting bản quyền tốc độ cao</span>
            </div>
          </div>

          {/* 3 CRUCIAL NEXT STEPS */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              3 Bước Quan Trọng Cần Làm Ngay:
            </h4>

            {/* STEP 1: JOIN ZALO GROUP (The most important action) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/90 to-sky-950/80 border-2 border-sky-400/80 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow">
                  1
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Tham gia Nhóm Zalo Kín Lớp Học</span>
                    <span className="px-2 py-0.2 rounded text-[10px] bg-red-600 text-white font-semibold uppercase">
                      Bắt Buộc
                    </span>
                  </h5>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    Đây là nơi Chuyên Gia Ngô Tuyết gửi <strong>Link phòng Zoom bí mật</strong>, mật khẩu và toàn bộ tài liệu học tập trước mỗi buổi học.
                  </p>

                  {/* BIG PULSING ZALO BUTTON */}
                  <div className="mt-3">
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(2,132,199,0.5)] flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-95 text-center group"
                    >
                      <MessageCircle className="w-5 h-5 text-white animate-pulse" />
                      <span>BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO NGAY</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[280px]">Link: {zaloUrl}</span>
                    <button
                      onClick={handleCopyLink}
                      type="button"
                      className="text-sky-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedLink ? 'Đã sao chép' : 'Sao chép link'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: OPEN EMAIL */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  Mở Email để nhận thư xác nhận vé
                </h5>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Hệ thống vừa gửi email chứa vé VIP đến địa chỉ bạn vừa điền. Vui lòng kiểm tra Hộp thư đến (hoặc thư mục Quảng cáo / Spam).
                </p>
              </div>
            </div>

            {/* STEP 3: 30-MINUTE REMINDER */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-emerald-400" />
                  Email tự động nhắc trước giờ học 30 phút
                </h5>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Trước khi Zoom mở 30 phút, hệ thống sẽ tự động gửi email nhắc nhở kèm link vào phòng học trực tiếp để bạn không bị bỏ lỡ.
                </p>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Lưu ý: Số lượng chỗ trong phòng Zoom có giới hạn, hãy vào sớm 15 phút.
            </p>

            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Đóng và quay lại trang chủ
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
