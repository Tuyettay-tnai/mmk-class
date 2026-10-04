import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, AlertCircle, Settings, ShieldCheck, Mail, Phone, User, BookOpen, Briefcase } from 'lucide-react';
import { RegistrationFormData, SubmissionResult } from '../types';
import { COURSE_MODULES, CLASS_INFO } from '../data/courses';

interface RegistrationFormProps {
  initialCourse?: string;
  appsScriptUrl: string;
  onOpenAppsScriptModal: () => void;
  onSuccess: (result: SubmissionResult) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialCourse = 'Trọn bộ combo 4 khóa học AI MNK - Class',
  appsScriptUrl,
  onOpenAppsScriptModal,
  onSuccess
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    selectedCourse: initialCourse,
    occupation: 'Chủ kinh doanh / Doanh nghiệp',
    expectations: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update selected course if prop changes
  React.useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({ ...prev, selectedCourse: initialCourse }));
    }
  }, [initialCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ để nhận vé và link Zoom.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại (Zalo) để nhận mã xác nhận.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const ticketCode = 'VIP-MNK-' + Math.floor(1000 + Math.random() * 9000);

    try {
      // If user configured a custom Google Apps Script Web App URL, make the actual call
      if (appsScriptUrl && appsScriptUrl.startsWith('http')) {
        try {
          // Google Apps Script accepts text/plain as simple CORS without OPTIONS preflight check
          await fetch(appsScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
              ...formData,
              ticketCode,
              timestamp: new Date().toISOString()
            })
          });
        } catch (fetchErr) {
          console.warn('Apps Script direct submission note:', fetchErr);
        }
      } else {
        // Fallback simulation mode for testing before the user deploys their own Apps Script
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Trigger celebratory popup
      onSuccess({
        success: true,
        ticketCode: ticketCode,
        message: 'Đăng ký thành công! Hãy kiểm tra Email và vào nhóm Zalo để nhận vé VIP & link Zoom.',
        studentName: formData.fullName,
        zaloGroupUrl: CLASS_INFO.zaloGroupUrl,
        timestamp: new Date().toLocaleString('vi-VN')
      });

    } catch (err: any) {
      setErrorMsg(err?.message || 'Có lỗi xảy ra trong quá trình kết nối. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="register" className="py-16 md:py-24 bg-[#040813] relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full">
              Đăng Ký Nhận Vé Học Miễn Phí
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Giữ Chỗ Tham Gia Lớp Học 
            <span className="text-gold-gradient font-heading ml-2">MNK - CLASS</span>
          </h2>

          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Điền thông tin chính xác bên dưới để hệ thống cấp mã vé VIP, gửi Email xác nhận và lên lịch tự động gửi link Zoom trước 30 phút.
          </p>
        </div>

        {/* Integration Status Bar */}
        <div className="mb-6 p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${appsScriptUrl ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>
              {appsScriptUrl 
                ? 'Đã kết nối Webhook Google Sheets & Tự Động Gửi Mail' 
                : 'Chế độ Demo (Chưa nhập Webhook Apps Script riêng)'}
            </span>
          </div>

          <button
            onClick={onOpenAppsScriptModal}
            type="button"
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 underline decoration-dotted"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{appsScriptUrl ? 'Cấu hình lại' : 'Cài đặt Google Sheets'}</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0c1836] via-[#091228] to-[#050b1a] border border-blue-500/30 shadow-2xl">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name & Phone in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  Họ và tên của bạn <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-slate-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  Số điện thoại (Zalo nhận tài liệu) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ví dụ: 0912345678"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-slate-500 text-sm transition-all"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                Email nhận vé & đường link vào Zoom <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ví dụ: nguyenvana@gmail.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-slate-500 text-sm transition-all"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Hệ thống sẽ gửi email xác nhận và thông báo trước 30 phút buổi học tới địa chỉ này.
              </span>
            </div>

            {/* Course Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Khóa học bạn muốn tham gia <span className="text-rose-400">*</span>
              </label>
              <select
                name="selectedCourse"
                value={formData.selectedCourse}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white text-sm transition-all"
              >
                <option value="Trọn bộ combo 4 khóa học AI MNK - Class">
                  🔥 Trọn bộ combo 4 khóa học AI MNK - Class (Khuyên dùng)
                </option>
                {COURSE_MODULES.map(course => (
                  <option key={course.id} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                Lĩnh vực / Nghề nghiệp hiện tại của bạn
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white text-sm transition-all"
              >
                <option value="Chủ kinh doanh / Doanh nghiệp">Chủ kinh doanh / Doanh nghiệp / Khởi nghiệp</option>
                <option value="Giáo viên / Giảng viên / Đào tạo">Giáo viên / Giảng viên các cấp</option>
                <option value="Nhân viên văn phòng / Quản lý">Nhân viên văn phòng / Quản lý doanh nghiệp</option>
                <option value="Freelancer / Content Creator / MMO">Freelancer / Sáng tạo nội dung / MMO / Affiliate</option>
                <option value="Học sinh / Sinh viên">Học sinh / Sinh viên</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Expectations / Questions */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Mục tiêu hoặc câu hỏi bạn muốn được Chuyên gia Ngô Tuyết giải đáp trực tiếp (Không bắt buộc)
              </label>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                rows={2}
                placeholder="Ví dụ: Tôi muốn tự làm landing page bán mỹ phẩm; Tôi là giáo viên muốn tạo bài giảng slide tương tác..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white placeholder-slate-500 text-sm transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl hover:shadow-amber-400/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base md:text-lg disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>Đang kết nối & khởi tạo vé VIP...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-900" />
                    <span>HOÀN TẤT ĐĂNG KÝ VÉ MIỄN PHÍ</span>
                    <Send className="w-4 h-4 text-slate-900 ml-1" />
                  </>
                )}
              </button>
            </div>

            {/* Reassurance */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Bảo mật thông tin 100%
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                Nhận vé qua Email & Nhóm Zalo tức thì
              </span>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
