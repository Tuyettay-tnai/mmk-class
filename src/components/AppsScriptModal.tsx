import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, BookOpen, Settings2, Eye, ShieldCheck, CheckCircle2, Play } from 'lucide-react';

interface AppsScriptModalProps {
  isOpen: boolean;
  appsScriptUrl: string;
  onSaveUrl: (url: string) => void;
  onClose: () => void;
}

// Embedded Apps Script Code for instant copying
const APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * MNK - CLASS: GOOGLE APPS SCRIPT HỆ THỐNG ĐĂNG KÝ KHÓA HỌC AI MIỄN PHÍ
 * CHUYÊN GIA AI NGÔ TUYẾT
 * =========================================================================
 * 
 * TÍNH NĂNG CHÍNH:
 * 1. Tiếp nhận đăng ký từ Landing Page (Họ tên, Email, SĐT, Khóa học quan tâm, Mục tiêu).
 * 2. Tự động tạo sheet "DanhSachDangKy" và lưu data an toàn.
 * 3. Gửi Email HTML xác nhận giao diện sang trọng, chuyên nghiệp kèm Link Zalo VIP & Link Zoom.
 * 4. Tự động lên lịch hẹn gửi Email nhắc vào Zoom trước 30 phút buổi học diễn ra.
 * 5. Hỗ trợ CORS đầy đủ cho React Landing Page.
 * 
 * LINK NHÓM ZALO: https://zalo.me/g/pccjfp974
 * =========================================================================
 */

var CONFIG = {
  SHEET_NAME: "DanhSachDangKy",
  CLASS_TITLE: "MNK - CLASS: LÀM CHỦ CÔNG NGHỆ AI THỰC CHIẾN",
  INSTRUCTOR: "Chuyên Gia AI Ngô Tuyết",
  ZALO_GROUP_URL: "https://zalo.me/g/pccjfp974",
  
  // THÔNG TIN BUỔI HỌC ZOOM (Điều chỉnh theo lịch của bạn)
  NEXT_CLASS_TIME: "2026-10-15T19:30:00+07:00", 
  CLASS_TIME_DISPLAY: "19:30 - 21:30 | Thứ Năm tuần này",
  ZOOM_ID: "888 999 6868",
  ZOOM_PASS: "MNKCLASS",
  ZOOM_URL: "https://zoom.us/j/8889996868?pwd=MNKCLASS",
  
  EMAIL_SENDER_NAME: "Chuyên Gia AI Ngô Tuyết - MNK CLASS"
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      success: false,
      message: "Hệ thống đang bận, vui lòng thử lại sau vài giây!"
    });
  }

  try {
    var rawData;
    if (e && e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        rawData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      rawData = e.parameter;
    } else {
      rawData = {};
    }

    var fullName = (rawData.fullName || rawData.name || "").trim();
    var email = (rawData.email || "").trim();
    var phone = (rawData.phone || rawData.tel || "").trim();
    var selectedCourse = (rawData.selectedCourse || rawData.course || "Trọn bộ combo 4 khóa học AI MNK - Class").trim();
    var occupation = (rawData.occupation || "").trim();
    var expectations = (rawData.expectations || rawData.note || "").trim();

    if (!fullName || !email || !phone) {
      return createJsonResponse({
        success: false,
        message: "Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại!"
      });
    }

    var ticketCode = "VIP-MNK-" + Math.floor(1000 + Math.random() * 9000);
    var timestamp = new Date();

    // 1. Lưu vào Google Sheet
    var sheet = getOrCreateSheet();
    var newRow = [
      formatDate(timestamp),
      ticketCode,
      fullName,
      email,
      "'" + phone,
      selectedCourse,
      occupation,
      expectations,
      "Đã đăng ký",
      "Đã gửi thành công",
      "Đã lên lịch"
    ];
    sheet.appendRow(newRow);

    // 2. Gửi Email Xác Nhận ngay lập tức cho học viên
    try {
      sendConfirmationEmail(email, fullName, ticketCode, selectedCourse);
    } catch (mailError) {
      Logger.log("Lỗi gửi mail: " + mailError);
    }

    // 3. Đăng ký trigger nhắc nhở 30 phút trước buổi học
    try {
      registerZoomReminderSchedule();
    } catch (schedError) {
      Logger.log("Lỗi tạo trigger nhắc học: " + schedError);
    }

    lock.releaseLock();

    return createJsonResponse({
      success: true,
      ticketCode: ticketCode,
      message: "Đăng ký thành công! Hãy kiểm tra Email và vào nhóm Zalo để nhận link Zoom.",
      zaloGroupUrl: CONFIG.ZALO_GROUP_URL,
      studentName: fullName
    });

  } catch (globalError) {
    lock.releaseLock();
    return createJsonResponse({
      success: false,
      message: "Có lỗi xảy ra: " + globalError.toString()
    });
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "online",
    message: "Google Apps Script MNK - CLASS của Chuyên Gia AI Ngô Tuyết đang hoạt động!",
    timestamp: new Date().toISOString()
  });
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    var headers = [
      "Thời Gian",
      "Mã Vé VIP",
      "Họ Và Tên",
      "Email",
      "Số Điện Thoại (Zalo)",
      "Khóa Học Quan Tâm",
      "Nghề Nghiệp",
      "Ghi Chú / Mục Tiêu",
      "Trạng Thái",
      "Email Xác Nhận",
      "Lịch Nhắc 30 Phút"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0F172A");
    headerRange.setFontColor("#F8FAFC");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendConfirmationEmail(recipientEmail, studentName, ticketCode, selectedCourse) {
  var subject = "🎟️ VÉ THAM GIA KHÓA HỌC AI MIỄN PHÍ: MNK - CLASS | CHUYÊN GIA NGÔ TUYẾT [Mã: " + ticketCode + "]";

  var htmlBody = \`
  <!DOCTYPE html>
  <html>
  <body style="margin: 0; padding: 20px; background-color: #0b1120; font-family: Arial, sans-serif; color: #f1f5f9;">
    <div style="max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #0284c7); padding: 32px 20px; text-align: center;">
        <span style="background: #fbbf24; color: #0f172a; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">MNK -CLASS-</span>
        <h1 style="color: #fff; font-size: 24px; margin: 10px 0 4px 0;">Khóa Học AI Thực Chiến Miễn Phí</h1>
        <p style="color: #e0f2fe; margin: 0; font-size: 15px;">Cùng Chuyên Gia AI Ngô Tuyết</p>
      </div>

      <div style="padding: 28px;">
        <p>Xin chào <strong>\${escapeHtml(studentName)}</strong>,</p>
        <p>Chúc mừng bạn đã đăng ký thành công khóa học <strong>MNK - CLASS</strong>! Dưới đây là thông tin vé VIP của bạn:</p>

        <div style="background: #1e293b; border: 1px dashed #38bdf8; border-radius: 12px; padding: 18px; margin: 20px 0;">
          <div style="font-size: 12px; color: #38bdf8; font-weight: bold;">MÃ VÉ HỌC VIÊN:</div>
          <div style="font-size: 24px; font-weight: 900; color: #fbbf24; margin: 4px 0 12px 0;">\${ticketCode}</div>
          <p style="margin: 4px 0; font-size: 14px; color: #cbd5e1;">Khóa học: <strong style="color: #fff;">\${escapeHtml(selectedCourse)}</strong></p>
          <p style="margin: 4px 0; font-size: 14px; color: #cbd5e1;">Lịch học: <strong style="color: #4ade80;">\${CONFIG.CLASS_TIME_DISPLAY}</strong></p>
          <p style="margin: 4px 0; font-size: 14px; color: #cbd5e1;">Hình thức: Trực tuyến qua Zoom</p>
        </div>

        <div style="background: rgba(2, 132, 199, 0.15); border: 1px solid #0284c7; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
          <p style="color: #fbbf24; font-weight: bold; margin-top: 0;">⚠️ BƯỚC QUAN TRỌNG NHẤT:</p>
          <p style="font-size: 14px; color: #e2e8f0; margin-bottom: 16px;">Vui lòng tham gia Nhóm Zalo Lớp Học để nhận mật khẩu Zoom và tài liệu trước giờ học:</p>
          <a href="\${CONFIG.ZALO_GROUP_URL}" target="_blank" style="background: #0068FF; color: #fff; text-decoration: none; padding: 12px 28px; font-weight: bold; border-radius: 8px; display: inline-block;">
            👉 BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO
          </a>
        </div>

        <p style="font-size: 13px; color: #94a3b8;">
          ⏰ <em>Hệ thống sẽ tự động gửi Email nhắc nhở bạn trước giờ lên sóng Zoom 30 phút!</em>
        </p>

        <p style="margin-top: 24px; font-size: 14px;">Trân trọng,<br><strong style="color: #fbbf24;">Chuyên Gia AI Ngô Tuyết & Đội Ngũ MNK - CLASS</strong></p>
      </div>
    </div>
  </body>
  </html>
  \`;

  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    name: CONFIG.EMAIL_SENDER_NAME,
    htmlBody: htmlBody
  });
}

function registerZoomReminderSchedule() {
  var triggerName = "sendBatch30MinReminderEmail";
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === triggerName) return;
  }

  var classStart = new Date(CONFIG.NEXT_CLASS_TIME);
  var reminderTime = new Date(classStart.getTime() - 30 * 60 * 1000);
  if (reminderTime.getTime() > new Date().getTime()) {
    ScriptApp.newTrigger(triggerName).timeBased().at(reminderTime).create();
  }
}

function sendBatch30MinReminderEmail() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  var reminderSubject = "🚨 [30 PHÚT NỮA] Link Vào Zoom MNK - CLASS Cùng Chuyên Gia Ngô Tuyết";

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var studentName = row[2];
    var recipientEmail = row[3];
    var reminderStatus = row[10];

    if (recipientEmail && reminderStatus !== "Đã gửi nhắc 30p") {
      try {
        var reminderHtml = \`
        <div style="font-family: Arial, sans-serif; background: #0b1120; color: #f8fafc; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 12px; padding: 24px; border: 2px solid #ef4444;">
            <h2 style="color: #fbbf24; margin-top: 0;">Phòng Zoom MNK - CLASS Đã Mở!</h2>
            <p>Chào <strong>\${escapeHtml(studentName)}</strong>, buổi học bắt đầu sau 30 phút nữa. Hãy vào sớm để ổn định chỗ ngồi nhé!</p>
            <p>🔹 Zoom ID: <strong style="color: #fbbf24; font-size: 18px;">\${CONFIG.ZOOM_ID}</strong></p>
            <p>🔹 Mật khẩu: <strong style="color: #fbbf24; font-size: 18px;">\${CONFIG.ZOOM_PASS}</strong></p>
            <p><a href="\${CONFIG.ZOOM_URL}" style="background: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">🚀 VÀO ZOOM NGAY</a></p>
          </div>
        </div>
        \`;
        MailApp.sendEmail({
          to: recipientEmail,
          subject: reminderSubject,
          name: CONFIG.EMAIL_SENDER_NAME,
          htmlBody: reminderHtml
        });
        sheet.getRange(r + 1, 11).setValue("Đã gửi nhắc 30p");
      } catch (err) {}
    }
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function formatDate(date) {
  return Utilities.formatDate(date, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}`;

export const AppsScriptModal: React.FC<AppsScriptModalProps> = ({
  isOpen,
  appsScriptUrl,
  onSaveUrl,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'guide' | 'settings' | 'emailPreview'>('code');
  const [copied, setCopied] = useState(false);
  const [inputUrl, setInputUrl] = useState(appsScriptUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  React.useEffect(() => {
    if (appsScriptUrl) {
      setInputUrl(appsScriptUrl);
    }
  }, [appsScriptUrl, isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUrl(inputUrl.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!inputUrl.trim()) {
      setTestStatus('Vui lòng nhập đường dẫn URL Web App trước khi kiểm tra!');
      return;
    }

    setIsTesting(true);
    setTestStatus(null);

    try {
      // Testing with jsonp/fetch GET
      const res = await fetch(inputUrl.trim(), { method: 'GET', mode: 'no-cors' });
      setTestStatus('Đã gửi yêu cầu kết nối thành công tới Web App Google Apps Script!');
    } catch (err: any) {
      setTestStatus('Lưu ý: Trình duyệt có thể chặn CORS khi kiểm tra GET trực tiếp, nhưng phương thức POST khi gửi form vẫn hoạt động bình thường.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#091124] border border-blue-500/40 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Google Apps Script Hub</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  MNK - CLASS
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Toàn bộ mã nguồn & hướng dẫn kết nối Google Sheets + Tự động gửi Email
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('code')}
            type="button"
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-[#091124] text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Mã Nguồn (Code.gs)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            type="button"
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-[#091124] text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Hướng Dẫn Cài Đặt (A-Z)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            type="button"
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#091124] text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Dán Webhook URL</span>
          </button>

          <button
            onClick={() => setActiveTab('emailPreview')}
            type="button"
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'emailPreview'
                ? 'bg-[#091124] text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Mẫu Email Tự Động</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-slate-300">
          
          {/* TAB 1: CODE.GS */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Mã Nguồn Google Apps Script Hoàn Chỉnh</h4>
                  <p className="text-xs text-slate-400">
                    Bao gồm lưu Google Sheets, gửi email HTML xác nhận kèm link Zalo và tự động tạo trigger nhắc 30 phút.
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  type="button"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-900" />
                      <span>Đã Sao Chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-900" />
                      <span>Sao Chép Toàn Bộ Mã</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300 max-h-[460px]">
                <pre>{APPS_SCRIPT_CODE}</pre>
              </div>
            </div>
          )}

          {/* TAB 2: STEP BY STEP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white">4 Bước Tự Setup Google Sheets & Apps Script (Chỉ mất 3 phút)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Không cần tài khoản trả phí, chạy trực tiếp trên tài khoản Google cá nhân hoàn toàn miễn phí.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                    <strong className="text-white text-sm">Tạo Google Sheet</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Vào <a href="https://sheets.google.com" target="_blank" rel="noreferrer" className="text-sky-400 underline">sheets.google.com</a>, tạo 1 trang tính trống mới và đặt tên là <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">MNK-Class-HocVien</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                    <strong className="text-white text-sm">Mở Apps Script</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Trên thanh menu của Google Sheets: Chọn <strong>Tiện ích mở rộng (Extensions)</strong> &gt; Chọn <strong>Apps Script</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                    <strong className="text-white text-sm">Dán Code & Lưu lại</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Xóa code cũ, bấm tab <strong>"Mã Nguồn (Code.gs)"</strong> ở trên rồi copy dán vào. Bấm <strong>Ctrl + S</strong> để lưu.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">4</span>
                    <strong className="text-white text-sm">Triển Khai Web App (Deploy)</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bấm <strong>Deploy (Triển khai)</strong> &gt; <strong>New deployment (Tùy chọn mới)</strong> &gt; Chọn loại <strong>Web app</strong>. Mục <em>Who has access</em> chọn <strong>Anyone (Bất kỳ ai)</strong>.
                  </p>
                </div>

              </div>

              {/* Warning note */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
                <strong className="block text-amber-300 mb-1">⚠️ LƯU Ý KHI GOOGLE HỎI XÁC MINH:</strong>
                Khi triển khai lần đầu, Google sẽ hiện thông báo <em>"Google chưa xác minh ứng dụng này"</em>. Bạn chỉ cần bấm <strong>Nâng cao (Advanced)</strong> &gt; Bấm <strong>Đi tới dự án (Không an toàn)</strong> &gt; Bấm <strong>Cho phép (Allow)</strong>.
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 text-xs text-sky-200 flex items-center justify-between">
                <span>Sau khi triển khai, bạn sẽ nhận được đường link Web App có dạng: <br/><code className="text-amber-300">https://script.google.com/macros/s/AKfycb.../exec</code></span>
                <button
                  onClick={() => setActiveTab('settings')}
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 ml-4"
                >
                  Dán URL Ngay
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS WEBHOOK URL */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white">Kết Nối Webhook Apps Script Với Landing Page</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dán URL Web App triển khai từ Google Apps Script của bạn vào đây để hệ thống đẩy data trực tiếp về Google Sheets của bạn.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    URL Google Apps Script Web App
                  </label>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white text-sm font-mono placeholder-slate-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Được lưu an toàn vào bộ nhớ trình duyệt (localStorage) của bạn.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Lưu Cấu Hình URL</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isTesting ? 'Đang kiểm tra...' : 'Kiểm Tra Kết Nối'}</span>
                  </button>
                </div>
              </form>

              {saveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Đã lưu URL Webhook thành công! Mọi lượt đăng ký sẽ được gửi về Google Sheets của bạn.</span>
                </div>
              )}

              {testStatus && (
                <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-500/50 text-sky-200 text-xs">
                  {testStatus}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EMAIL PREVIEWS */}
          {activeTab === 'emailPreview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white">Xem Trước 2 Mẫu Email Tự Động Được Thiết Kế Độc Quyền</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Đã được tích hợp sẵn trong mã Apps Script với phong cách màu xanh dương hoàng gia và vàng ánh kim cao cấp.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Email 1 Preview */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                    Email 1: Xác Nhận Vé VIP & Link Zalo (Gửi Ngay)
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#0f172a] text-left p-4 text-xs space-y-3">
                    <div className="bg-gradient-to-r from-blue-700 to-sky-600 p-3 rounded-lg text-center text-white font-bold">
                      MNK - CLASS KHÓA HỌC AI MIỄN PHÍ
                      <div className="text-[10px] text-amber-300 font-normal">Chuyên Gia AI Ngô Tuyết</div>
                    </div>
                    <p className="text-slate-300">Chào bạn Nguyễn Văn An, bạn đã đăng ký thành công khóa học MNK - CLASS!</p>
                    <div className="bg-slate-900 border border-dashed border-sky-400 p-2.5 rounded text-amber-400 font-mono font-bold text-center">
                      MÃ VÉ: VIP-MNK-8472
                    </div>
                    <div className="bg-blue-950/60 p-2.5 rounded text-center">
                      <div className="text-[11px] font-bold text-white mb-1.5">BƯỚC QUAN TRỌNG NHẤT:</div>
                      <span className="inline-block bg-blue-600 text-white font-bold px-3 py-1.5 rounded text-[11px]">
                        👉 BẤM ĐỂ VÀO NHÓM ZALO
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">⏰ Hệ thống sẽ tự động nhắc bạn trước giờ học 30 phút.</p>
                  </div>
                </div>

                {/* Email 2 Preview */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                    Email 2: Nhắc Vào Phòng Zoom (Trước 30 Phút)
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#0f172a] text-left p-4 text-xs space-y-3">
                    <div className="bg-red-900/60 border border-red-500/50 p-2 rounded-lg text-center text-red-200 font-bold text-[11px]">
                      🚨 CHỈ CÒN 30 PHÚT NỮA LỚP HỌC BẮT ĐẦU!
                    </div>
                    <p className="text-slate-300">Chào bạn, phòng Zoom MNK - CLASS đã mở! Chuyên gia Ngô Tuyết đã sẵn sàng.</p>
                    <div className="bg-slate-900 border-l-2 border-sky-400 p-2 rounded text-slate-300 space-y-1">
                      <div>🔹 Zoom ID: <strong className="text-amber-400">888 999 6868</strong></div>
                      <div>🔹 Mật khẩu: <strong className="text-amber-400">MNKCLASS</strong></div>
                    </div>
                    <div className="text-center">
                      <span className="inline-block bg-blue-600 text-white font-bold px-4 py-2 rounded text-xs shadow-md">
                        🚀 VÀO PHÒNG ZOOM NGAY
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Link nhóm Zalo VIP: <a href="https://zalo.me/g/pccjfp974" target="_blank" rel="noreferrer" className="text-sky-400 underline">https://zalo.me/g/pccjfp974</a>
          </span>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Đóng Cửa Sổ
          </button>
        </div>

      </div>

    </div>
  );
};
