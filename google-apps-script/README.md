# HƯỚNG DẪN CÀI ĐẶT GOOGLE APPS SCRIPT CHO HỆ THỐNG MNK - CLASS
**Chuyên Gia AI Ngô Tuyết**

Tài liệu này hướng dẫn chi tiết cách tạo Google Sheets, dán mã Apps Script, triển khai Web App và kết nối với Landing Page để:
1. Tự động lưu thông tin học viên vào Google Sheets.
2. Tự động gửi Email xác nhận HTML siêu đẹp kèm link Zalo & Zoom.
3. Tự động lên lịch hẹn gửi Email nhắc vào Zoom trước 30 phút buổi học.

---

## 4 BƯỚC THỰC HIỆN CỰC KỲ ĐƠN GIẢN (CHỈ MẤT 3 PHÚT)

### BƯỚC 1: TẠO TRANG TÍNH GOOGLE (GOOGLE SHEETS)
1. Truy cập [sheets.google.com](https://sheets.google.com) và tạo một **Trang tính mới trống (Blank Spreadsheet)**.
2. Đặt tên file là: `Danh Sách Học Viên MNK - CLASS - Ngô Tuyết`.

### BƯỚC 2: MỞ BỘ SOẠN THẢO APPS SCRIPT
1. Trên thanh menu trên cùng của Google Sheets, chọn **Tiện ích mở rộng (Extensions)** > **Apps Script**.
2. Một tab mới sẽ mở ra với trình soạn thảo mã Apps Script.
3. Đổi tên dự án từ "Dự án không có tiêu đề" thành: `MNK_Class_Backend`.

### BƯỚC 3: DÁN TOÀN BỘ MÃ NGUỒN `Code.gs`
1. Xóa hết code mặc định `function myFunction() { ... }` trong file `Mã.gs` (hoặc `Code.gs`).
2. Mở file `google-apps-script/Code.gs` (đã chuẩn bị sẵn trong thư mục này hoặc bấm nút **Sao Chép Mã** trên popup Landing Page).
3. Dán toàn bộ nội dung mã vào trình soạn thảo.
4. *(Tùy chọn)* Điều chỉnh thông tin buổi học trong mục `CONFIG` ở đầu file:
   - `NEXT_CLASS_TIME`: Thời gian bắt đầu buổi học (Định dạng: `YYYY-MM-DDTHH:mm:ss+07:00`, ví dụ: `2026-10-15T19:30:00+07:00`).
   - `CLASS_TIME_DISPLAY`: Thời gian hiển thị (ví dụ `19:30 - 21:30 | Thứ Năm tuần này`).
   - `ZOOM_ID`, `ZOOM_PASS`, `ZOOM_URL`: Thông tin phòng Zoom của bạn.
   - `ZALO_GROUP_URL`: Link nhóm Zalo kín (mặc định đã là `https://zalo.me/g/pccjfp974`).
5. Bấm icon **Lưu (Save / Biểu tượng đĩa mềm)** hoặc nhấn tổ hợp phím `Ctrl + S` (hoặc `Cmd + S` trên Mac).

### BƯỚC 4: TRIỂN KHAI DƯỚI DẠNG ỨNG DỤNG WEB (DEPLOY AS WEB APP)
1. Ở góc trên bên phải, bấm vào nút màu xanh **Triển khai (Deploy)** > Chọn **Tùy chọn triển khai mới (New deployment)**.
2. Bấm vào biểu tượng **Bánh răng cài đặt (Select type)** bên cạnh chữ "Chọn loại" > Chọn **Ứng dụng web (Web app)**.
3. Điền các mục như sau:
   - **Mô tả (Description):** `Webhook Đăng Ký MNK - CLASS`
   - **Thực thi dưới dạng (Execute as):** Chọn **Tôi (Địa chỉ email của bạn)**
   - **Ai có quyền truy cập (Who has access):** Chọn **Bất kỳ ai (Anyone)** *(RẤT QUAN TRỌNG: Phải chọn "Bất kỳ ai" để trang web landing page có thể gửi dữ liệu sang Google Sheets mà không bị chặn quyền).*
4. Bấm nút **Triển khai (Deploy)**.
5. Google sẽ yêu cầu cấp quyền truy cập:
   - Bấm **Ủy quyền truy cập (Authorize access)**.
   - Chọn tài khoản Google của bạn.
   - Nếu hiện cảnh báo *"Google chưa xác minh ứng dụng này"*, bấm vào **Nâng cao (Advanced)** ở góc dưới > Bấm tiếp vào **Đi tới MNK_Class_Backend (không an toàn)**.
   - Cuộn xuống dưới và bấm **Cho phép (Allow)**.
6. Sau khi triển khai xong, Google sẽ cung cấp một đường dẫn **URL của ứng dụng web (Web app URL)** (Có dạng: `https://script.google.com/macros/s/AKfycbx.../exec`).
7. Bấm **Sao chép (Copy)** đường dẫn URL này.

---

## BƯỚC 5: DÁN URL VÀO LANDING PAGE
1. Quay lại trang Landing Page.
2. Bấm vào nút **"⚙️ Cài Đặt Google Sheets"** (nằm ở thanh thông báo hoặc góc trang).
3. Dán đường dẫn Web App URL vừa sao chép vào ô **"URL Google Apps Script Webhook"**.
4. Bấm **"Lưu & Kiểm Tra Kết Nối"**.
5. Thử đăng ký một lượt trên form — ngay lập tức bạn sẽ thấy:
   - Dòng dữ liệu mới xuất hiện tự động trên Google Sheets.
   - Khách hàng nhận được Email xác nhận HTML tuyệt đẹp trong hộp thư đến.
   - Popup chúc mừng hiện lên với nút dẫn vào Zalo `https://zalo.me/g/pccjfp974`.
   - Lịch hẹn tự động gửi email nhắc 30 phút trước buổi học được khởi tạo.
