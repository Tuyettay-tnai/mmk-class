/**
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

// CẤU HÌNH THÔNG TIN KHÓA HỌC (BẠN CÓ THỂ ĐIỀU CHỈNH KHI CẦN)
var CONFIG = {
  SHEET_NAME: "DanhSachDangKy",
  CLASS_TITLE: "MNK - CLASS: LÀM CHỦ CÔNG NGHỆ AI THỰC CHIẾN",
  INSTRUCTOR: "Chuyên Gia AI Ngô Tuyết",
  ZALO_GROUP_URL: "https://zalo.me/g/pccjfp974",
  
  // THÔNG TIN BUỔI HỌC ZOOM
  // Định dạng ngày giờ: YYYY-MM-DDTHH:mm:ss (Ví dụ: 2026-10-15T19:30:00+07:00)
  NEXT_CLASS_TIME: "2026-10-15T19:30:00+07:00", 
  CLASS_TIME_DISPLAY: "19:30 - 21:30 | Thứ Năm tuần này",
  ZOOM_ID: "888 999 6868",
  ZOOM_PASS: "MNKCLASS",
  ZOOM_URL: "https://zoom.us/j/8889996868?pwd=MNKCLASS",
  
  // TÊN NGƯỜI GỬI EMAIL HIỂN THỊ
  EMAIL_SENDER_NAME: "Chuyên Gia AI Ngô Tuyết - MNK CLASS"
};

/**
 * Xử lý khi có lượt đăng ký gửi tới (POST request)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Đợi tối đa 10 giây để tránh xung đột khi nhiều người đăng ký cùng lúc
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      success: false,
      message: "Hệ thống đang quá tải, vui lòng thử lại sau vài giây!"
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

    // Trích xuất dữ liệu
    var fullName = (rawData.fullName || rawData.name || "").trim();
    var email = (rawData.email || "").trim();
    var phone = (rawData.phone || rawData.tel || "").trim();
    var selectedCourse = (rawData.selectedCourse || rawData.course || "Trọn bộ combo 4 khóa học AI MNK - Class").trim();
    var occupation = (rawData.occupation || "").trim();
    var expectations = (rawData.expectations || rawData.note || "").trim();

    // Kiểm tra dữ liệu bắt buộc
    if (!fullName || !email || !phone) {
      return createJsonResponse({
        success: false,
        message: "Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại!"
      });
    }

    // Tạo mã vé học viên ngẫu nhiên (Ví dụ: VIP-MNK-8472)
    var ticketCode = "VIP-MNK-" + Math.floor(1000 + Math.random() * 9000);
    var timestamp = new Date();

    // 1. Lưu vào Google Sheet
    var sheet = getOrCreateSheet();
    var newRow = [
      formatDate(timestamp),
      ticketCode,
      fullName,
      email,
      "'" + phone, // Thêm dấu ' để không mất số 0 đầu số điện thoại
      selectedCourse,
      occupation,
      expectations,
      "Đã đăng ký",
      "Chờ gửi",   // Trạng thái email xác nhận
      "Đã lên lịch" // Trạng thái nhắc 30 phút
    ];
    sheet.appendRow(newRow);
    var rowNumber = sheet.getLastRow();

    // 2. Gửi Email Xác Nhận ngay lập tức cho học viên
    var emailSentStatus = "Thành công";
    try {
      sendConfirmationEmail(email, fullName, ticketCode, selectedCourse);
      sheet.getRange(rowNumber, 10).setValue("Đã gửi thành công");
    } catch (mailError) {
      emailSentStatus = "Lỗi: " + mailError.toString();
      sheet.getRange(rowNumber, 10).setValue(emailSentStatus);
    }

    // 3. Đăng ký lịch nhắc nhở 30 phút trước buổi học
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

/**
 * Xử lý GET request để kiểm tra tình trạng Web App hoạt động
 */
function doGet(e) {
  return createJsonResponse({
    status: "online",
    message: "Google Apps Script MNK - CLASS của Chuyên Gia AI Ngô Tuyết đang hoạt động bình thường!",
    timestamp: new Date().toISOString()
  });
}

/**
 * Tìm hoặc tự động tạo Sheet lưu trữ có định dạng chuẩn đẹp
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    // Tạo hàng tiêu đề
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

    // Định dạng tiêu đề chuyên nghiệp
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0F172A");
    headerRange.setFontColor("#F8FAFC");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    
    // Tự động căn chỉnh độ rộng cột
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 160);
    }
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(3, 180);
    sheet.setColumnWidth(4, 220);
    sheet.setColumnWidth(6, 250);
  }
  return sheet;
}

/**
 * Gửi email xác nhận HTML đẹp mắt
 */
function sendConfirmationEmail(recipientEmail, studentName, ticketCode, selectedCourse) {
  var subject = "🎟️ VÉ THAM GIA KHÓA HỌC AI MIỄN PHÍ: MNK - CLASS | CHUYÊN GIA NGÔ TUYẾT [Mã: " + ticketCode + "]";

  var htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #0b1120; padding: 25px 10px;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #0f172a; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <!-- HEADER BANNER -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 50%, #0369a1 100%); padding: 36px 20px; border-bottom: 2px solid #38bdf8;">
                <div style="display: inline-block; background: #fbbf24; color: #0f172a; font-weight: 900; font-size: 13px; letter-spacing: 2px; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; margin-bottom: 12px;">
                  MNK -CLASS-
                </div>
                <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                  Khóa Học AI Thực Chiến Miễn Phí
                </h1>
                <p style="color: #e0f2fe; font-size: 16px; margin: 0; font-weight: 600;">
                  Cùng Chuyên Gia AI Ngô Tuyết
                </p>
              </td>
            </tr>

            <!-- CONTENT BODY -->
            <tr>
              <td style="padding: 32px 28px;">
                <p style="font-size: 16px; color: #f8fafc; line-height: 1.6; margin-top: 0;">
                  Xin chào <strong>${escapeHtml(studentName)}</strong>,
                </p>
                <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
                  Chúc mừng bạn đã đăng ký thành công khóa học đặc biệt <strong>MNK - CLASS</strong>! Đây là chương trình huấn luyện AI thực chiến 100% miễn phí giúp bạn làm chủ 4 trụ cột công nghệ AI hàng đầu hiện nay.
                </p>

                <!-- TICKET CARD -->
                <div style="background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%); border: 1px dashed #38bdf8; border-radius: 12px; padding: 20px; margin: 24px 0;">
                  <div style="font-size: 12px; text-transform: uppercase; color: #38bdf8; letter-spacing: 1px; font-weight: 700;">
                    Thông Tin Vé Học Viên
                  </div>
                  <div style="font-size: 24px; font-weight: 900; color: #fbbf24; margin: 6px 0 14px 0; letter-spacing: 1px;">
                    ${ticketCode}
                  </div>
                  
                  <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; color: #e2e8f0;">
                    <tr>
                      <td width="35%" style="color: #94a3b8;">Học viên:</td>
                      <td style="font-weight: 600; color: #ffffff;">${escapeHtml(studentName)}</td>
                    </tr>
                    <tr>
                      <td style="color: #94a3b8;">Khóa học chọn:</td>
                      <td style="color: #38bdf8; font-weight: 600;">${escapeHtml(selectedCourse)}</td>
                    </tr>
                    <tr>
                      <td style="color: #94a3b8;">Lịch khai giảng:</td>
                      <td style="font-weight: 600; color: #4ade80;">${CONFIG.CLASS_TIME_DISPLAY}</td>
                    </tr>
                    <tr>
                      <td style="color: #94a3b8;">Hình thức:</td>
                      <td>Học trực tuyến qua Zoom Meeting</td>
                    </tr>
                  </table>
                </div>

                <!-- 4 MODULES SUMMARY -->
                <div style="margin: 24px 0;">
                  <h3 style="color: #ffffff; font-size: 16px; margin-bottom: 12px; border-left: 3px solid #fbbf24; padding-left: 10px;">
                    4 Nội Dung Đột Phá Bạn Sẽ Được Đào Tạo:
                  </h3>
                  <ul style="color: #cbd5e1; font-size: 14px; line-height: 1.7; padding-left: 20px; margin: 0;">
                    <li><strong>Thiết Kế Website Vibe Code:</strong> Tự làm website chuyên nghiệp bằng Prompt AI chỉ trong 15 phút.</li>
                    <li><strong>Skill ChatGPT Toàn Diện:</strong> Ý tưởng, Viết bài, Tạo ảnh/video, Phân tích & Tự động hóa công việc.</li>
                    <li><strong>Sản Xuất Video Xây Kênh AI:</strong> Làm video viral TikTok, YouTube, Facebook, CapCut tự động.</li>
                    <li><strong>Xây Dựng Giáo Trình Số (Cho Giáo Viên):</strong> Soạn bài giảng số, tài nguyên học liệu, đề thi thông minh.</li>
                  </ul>
                </div>

                <!-- CRITICAL STEP: JOIN ZALO GROUP -->
                <div style="background: rgba(2, 132, 199, 0.15); border: 1px solid #0284c7; border-radius: 12px; padding: 22px; text-align: center; margin: 28px 0;">
                  <p style="color: #fbbf24; font-weight: 800; font-size: 15px; margin: 0 0 8px 0; text-transform: uppercase;">
                    ⚠️ BƯỚC QUAN TRỌNG NHẤT ĐỂ NHẬN LINK PHÒNG ZOOM:
                  </p>
                  <p style="color: #e2e8f0; font-size: 14px; margin: 0 0 16px 0; line-height: 1.5;">
                    Vui lòng tham gia ngay <strong>Nhóm Zalo VIP Lớp Học</strong> để Chuyên gia Ngô Tuyết gửi tài liệu thực hành và mật khẩu Zoom trước giờ lên sóng:
                  </p>
                  <a href="${CONFIG.ZALO_GROUP_URL}" target="_blank" style="display: inline-block; background: #0068FF; background: linear-gradient(135deg, #0084ff 0%, #0052cc 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 16px; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 104, 255, 0.4); text-transform: uppercase;">
                    👉 BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO
                  </a>
                  <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
                    Link Zalo: <a href="${CONFIG.ZALO_GROUP_URL}" style="color: #38bdf8;">${CONFIG.ZALO_GROUP_URL}</a>
                  </p>
                </div>

                <!-- ZOOM INFO BOX -->
                <div style="background: #111827; border-radius: 8px; padding: 16px; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                  <strong style="color: #f1f5f9;">⏰ Hệ thống sẽ tự động gửi Email & Thông báo nhắc bạn trước giờ học 30 phút!</strong><br>
                  Hãy chuẩn bị sẵn máy tính và cài đặt phần mềm Zoom để có trải nghiệm học tập và thực hành tốt nhất cùng Chuyên Gia Ngô Tuyết.
                </div>

                <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1e293b; color: #cbd5e1; font-size: 14px;">
                  Trân trọng,<br>
                  <strong style="color: #fbbf24; font-size: 15px;">Chuyên Gia AI Ngô Tuyết & Đội ngũ MNK - CLASS</strong>
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center" style="background: #090d16; padding: 20px; font-size: 12px; color: #64748b;">
                Khóa học phi lợi nhuận vì cộng đồng AI Việt Nam • Hotline/Zalo hỗ trợ học viên: 0988.xxx.xxx<br>
                © 2026 MNK - CLASS - Chuyên Gia AI Ngô Tuyết. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    name: CONFIG.EMAIL_SENDER_NAME,
    htmlBody: htmlBody
  });
}

/**
 * Lên lịch kích hoạt trigger tự động nhắc trước 30 phút buổi học
 */
function registerZoomReminderSchedule() {
  var triggerName = "sendBatch30MinReminderEmail";
  
  // Kiểm tra xem đã có trigger cho buổi học này chưa
  var triggers = ScriptApp.getProjectTriggers();
  var alreadyExists = false;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === triggerName) {
      alreadyExists = true;
      break;
    }
  }

  if (!alreadyExists) {
    // Thời điểm bắt đầu lớp học
    var classStart = new Date(CONFIG.NEXT_CLASS_TIME);
    // Thời điểm nhắc: 30 phút trước buổi học
    var reminderTime = new Date(classStart.getTime() - 30 * 60 * 1000);
    var now = new Date();

    // Nếu thời điểm nhắc vẫn ở tương lai thì đặt trigger
    if (reminderTime.getTime() > now.getTime()) {
      ScriptApp.newTrigger(triggerName)
        .timeBased()
        .at(reminderTime)
        .create();
    }
  }
}

/**
 * Hàm gửi email nhắc nhở vào Zoom trước 30 phút (Được gọi tự động bởi Trigger)
 */
function sendBatch30MinReminderEmail() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return; // Chưa có học viên nào

  var reminderSubject = "🚨 [30 PHÚT NỮA BẮT ĐẦU] Link Vào Phòng Zoom MNK - CLASS Cùng Chuyên Gia Ngô Tuyết";

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var studentName = row[2];
    var recipientEmail = row[3];
    var ticketCode = row[1];
    var reminderStatus = row[10];

    // Chỉ gửi cho học viên chưa nhận email nhắc nhở
    if (recipientEmail && reminderStatus !== "Đã gửi nhắc 30p") {
      try {
        var reminderHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 25px;">
          <div style="max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 12px; padding: 28px; border: 2px solid #ef4444;">
            <div style="background: #ef4444; color: #fff; font-weight: bold; padding: 6px 14px; border-radius: 20px; display: inline-block; font-size: 13px; margin-bottom: 12px;">
              CHỈ CÒN 30 PHÚT NỮA BẮT ĐẦU
            </div>
            <h2 style="color: #fbbf24; margin: 0 0 10px 0;">Phòng Zoom MNK - CLASS Đã Mở!</h2>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
              Chào <strong>${escapeHtml(studentName)}</strong>,<br>
              Chuyên gia AI Ngô Tuyết đã sẵn sàng trong phòng Zoom. Lớp học sẽ chính thức bắt đầu sau 30 phút nữa. Hãy vào sớm 10-15 phút để ổn định đường truyền và chỗ ngồi nhé!
            </p>

            <div style="background: #1e293b; border-radius: 8px; padding: 18px; margin: 20px 0; border-left: 4px solid #38bdf8;">
              <h3 style="color: #38bdf8; margin: 0 0 8px 0; font-size: 16px;">THÔNG TIN PHÒNG HỌC ZOOM:</h3>
              <p style="margin: 4px 0; font-size: 15px; color: #ffffff;">🔹 <strong>Zoom ID:</strong> <span style="font-size: 18px; color: #fbbf24; font-weight: bold;">${CONFIG.ZOOM_ID}</span></p>
              <p style="margin: 4px 0; font-size: 15px; color: #ffffff;">🔹 <strong>Mật khẩu:</strong> <span style="font-size: 18px; color: #fbbf24; font-weight: bold;">${CONFIG.ZOOM_PASS}</span></p>
              <p style="margin: 4px 0; font-size: 14px; color: #94a3b8;">🔹 Mã vé của bạn: <strong>${ticketCode}</strong></p>
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="${CONFIG.ZOOM_URL}" target="_blank" style="background: #2563eb; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block;">
                🚀 BẤM ĐỂ VÀO PHÒNG ZOOM NGAY
              </a>
            </div>

            <p style="font-size: 13px; color: #94a3b8; text-align: center;">
              Nếu gặp khó khăn khi vào Zoom, hãy nhắn ngay trong nhóm Zalo: <br>
              <a href="${CONFIG.ZALO_GROUP_URL}" style="color: #38bdf8;">${CONFIG.ZALO_GROUP_URL}</a>
            </p>
          </div>
        </body>
        </html>
        `;

        MailApp.sendEmail({
          to: recipientEmail,
          subject: reminderSubject,
          name: CONFIG.EMAIL_SENDER_NAME,
          htmlBody: reminderHtml
        });

        // Cập nhật trạng thái trong sheet
        sheet.getRange(r + 1, 11).setValue("Đã gửi nhắc 30p");
      } catch (err) {
        sheet.getRange(r + 1, 11).setValue("Lỗi gửi nhắc: " + err.toString());
      }
    }
  }
}

/**
 * Trả về JSON có Header CORS để Landing Page nhận phản hồi
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Định dạng thời gian Việt Nam
 */
function formatDate(date) {
  return Utilities.formatDate(date, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
}

/**
 * Chống XSS an toàn
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
