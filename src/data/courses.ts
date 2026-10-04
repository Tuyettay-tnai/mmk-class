import { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'vibe-code',
    title: 'Đào Tạo Thiết Kế Website Vibe Code',
    shortTitle: 'Thiết Kế Website Vibe Code',
    category: 'VIBE CODING & WEB AI',
    tagline: 'Lập trình website đỉnh cao chỉ bằng câu lệnh tự nhiên (Prompt)',
    description: 'Biến mọi ý tưởng kinh doanh thành Landing Page, Website bán hàng, Portfolio chuyên nghiệp trong 15-30 phút mà không cần biết viết code truyền thống.',
    skills: [
      'Tạo Landing Page bán hàng chuyển đổi cao bằng AI',
      'Xây dựng Portfolio & Website doanh nghiệp chuẩn SEO',
      'Tích hợp Form thu thập khách hàng & Google Sheets tự động',
      'Tối ưu giao diện Responsive mượt mà trên Mobile & Desktop',
      'Đưa website lên Internet miễn phí chỉ với 1 cú click'
    ],
    audience: 'Chủ kinh doanh, Freelancer, Marketer muốn tự làm web không phụ thuộc dev',
    iconType: 'code',
    badgeColor: 'from-blue-600 to-cyan-500',
    highlights: ['Không cần biết code', 'Lên web sau 15 phút', 'Tiết kiệm hàng chục triệu']
  },
  {
    id: 'chatgpt-skills',
    title: 'Đào Tạo Skill ChatGPT Toàn Diện',
    shortTitle: 'Skill Siêu Cấp ChatGPT',
    category: 'AI PROMPTING & AUTOMATION',
    tagline: 'Làm chủ 6 năng lực vàng biến ChatGPT thành trợ lý vạn năng',
    description: 'Khai phá 100% sức mạnh của ChatGPT phiên bản mới nhất, giúp bạn tăng năng suất làm việc gấp 10 lần và tự động hóa các tác vụ phức tạp.',
    skills: [
      'Ý tưởng: Brainstorm concept kinh doanh & chiến dịch đột phá',
      'Viết nội dung: Soạn email, bài viết quảng cáo, kịch bản thuyết phục',
      'Tạo hình ảnh: Sáng tạo ảnh marketing, banner và mockup chân thực',
      'Tạo video: Viết prompt tạo kịch bản phân cảnh chi tiết cho AI video',
      'Phân tích: Xử lý dữ liệu, báo cáo thị trường và insight khách hàng',
      'Tự động hóa: Xây dựng Custom GPTs & kết nối luồng công việc tự động'
    ],
    audience: 'Dân văn phòng, Quản lý, Content Creator, Người khởi nghiệp',
    iconType: 'chatgpt',
    badgeColor: 'from-emerald-600 to-teal-500',
    highlights: ['Ý tưởng', 'Viết bài', 'Hình ảnh', 'Video', 'Phân tích', 'Tự động hóa']
  },
  {
    id: 'video-channels',
    title: 'Đào Tạo Sản Xuất Video Xây Kênh AI',
    shortTitle: 'Sản Xuất Video & Xây Kênh AI',
    category: 'VIRAL VIDEO & MULTI-PLATFORM',
    tagline: 'Sở hữu cỗ máy tạo video ngắn triệu view trên TikTok, Reels & YouTube',
    description: 'Quy trình sản xuất hàng trăm video triệu view mỗi tháng hoàn toàn tự động bằng công cụ AI từ kịch bản, giọng đọc đến hình ảnh và dựng phim.',
    skills: [
      'Viết kịch bản video giữ chân người xem 3 giây đầu tiên',
      'Tạo MC ảo AI nói tiếng Việt truyền cảm, khẩu hình chuẩn xác',
      'Dựng video thần tốc trên CapCut kết hợp hiệu ứng âm thanh AI',
      'Chiến lược xây kênh đa nền tảng: TikTok, YouTube Shorts, Facebook Reels',
      'Công thức chuyển đổi traffic từ video thành đơn hàng thực tế'
    ],
    platforms: ['TikTok', 'YouTube', 'Facebook', 'CapCut'],
    audience: 'Người làm tiếp thị liên kết (Affiliate), Bán hàng online, Tiktoker, Youtuber',
    iconType: 'video',
    badgeColor: 'from-rose-600 to-amber-500',
    highlights: ['TikTok', 'YouTube Shorts', 'Facebook Reels', 'CapCut AI']
  },
  {
    id: 'digital-curriculum',
    title: 'Đào Tạo Xây Dựng Giáo Trình Số Cho Giáo Viên',
    shortTitle: 'Giáo Trình Số Chuẩn AI Cho Giáo Viên',
    category: 'EDUTECH & SMART TEACHING',
    tagline: 'Giải phóng áp lực soạn bài, kiến tạo giờ giảng số lôi cuốn học sinh',
    description: 'Bộ giải pháp ứng dụng AI toàn diện dành riêng cho giáo viên mầm non, phổ thông và giảng viên đại học để đổi mới phương pháp giảng dạy 4.0.',
    skills: [
      'Bài giảng: Tự động tạo slide bài giảng tương tác, sinh động',
      'Tài nguyên: Khai thác kho học liệu số, tranh minh họa và mô phỏng AI',
      'Bài tập: Thiết kế bài tập phân hóa theo năng lực học sinh trong 1 phút',
      'Kiểm tra: Sinh ngân hàng câu hỏi trắc nghiệm & ma trận đề thi tự động',
      'Chứng nhận: Hệ thống đánh giá học tập & cấp chứng chỉ số chuyên nghiệp'
    ],
    audience: 'Giáo viên các cấp, Giảng viên, Đào tạo nội bộ doanh nghiệp, Gia sư',
    iconType: 'book',
    badgeColor: 'from-indigo-600 to-sky-500',
    highlights: ['Bài giảng số', 'Tài nguyên AI', 'Bộ đề thi', 'Đánh giá tự động']
  }
];

export const CLASS_INFO = {
  title: 'MNK - CLASS: LÀM CHỦ AI ĐỘT PHÁ',
  instructor: 'Chuyên Gia AI Ngô Tuyết',
  scheduleDisplay: '19:30 - 21:30 | 3 Buổi Thực Chiến Trực Tuyến',
  format: 'Học Trực Tuyến Qua Zoom (Bản Quyền Chất Lượng Cao)',
  tuition: '100% MIỄN PHÍ (Suất Tài Trợ MNK - CLASS)',
  zaloGroupUrl: 'https://zalo.me/g/pccjfp974',
  totalFreeSeats: 100,
  claimedSeats: 82,
  nextClassDate: '2026-10-15T19:30:00+07:00'
};
