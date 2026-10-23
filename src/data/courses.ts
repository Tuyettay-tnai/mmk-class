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
    highlights: ['Không cần biết code', 'Lên web sau 15 phút', 'Tiết kiệm hàng chục triệu'],
    showcaseProducts: [
      {
        id: 'p-web-landing',
        title: 'Landing Page Bán Hàng & Giới Thiệu Chuyên Nghiệp',
        subtitle: 'Tạo website chuẩn UI/UX dark mode sang trọng, responsive 100% trên điện thoại',
        tag: 'Landing Page AI',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      },
      {
        id: 'p-web-app',
        title: 'Hệ Thống Thu Thập Data Tự Động Kết Nối Google Sheets',
        subtitle: 'Website tích hợp webhook thu thập khách hàng và tự động gửi email xác nhận tức thì',
        tag: 'Web Full-Stack Vibe Code',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      }
    ]
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
    highlights: ['Ý tưởng', 'Viết bài', 'Hình ảnh', 'Video', 'Phân tích', 'Tự động hóa'],
    showcaseProducts: [
      {
        id: 'p-chatgpt-bot',
        title: 'Trợ Lý Custom GPTs Bán Hàng & Chăm Sóc Khách Hàng',
        subtitle: 'Huấn luyện AI thông minh trả lời khách hàng 24/7 theo phong cách thương hiệu riêng',
        tag: 'Custom GPT Trợ Lý',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      },
      {
        id: 'p-chatgpt-creative',
        title: 'Kho Kịch Bản & Ấn Phẩm Quảng Cáo Đa Nền Tảng',
        subtitle: 'Sản xuất hàng trăm bài viết quảng cáo, email marketing và hình ảnh thương mại độc quyền',
        tag: 'Creative & Copywriting',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      }
    ]
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
    highlights: ['TikTok', 'YouTube Shorts', 'Facebook Reels', 'CapCut AI'],
    showcaseProducts: [
      {
        id: 'p-video-short',
        title: 'Video Ngắn Triệu View Với MC Ảo AI Tiếng Việt',
        subtitle: 'Nhân vật AI thuyết trình lôi cuốn, đồng bộ khẩu hình tự nhiên, thu hút hàng trăm nghìn tương tác',
        tag: 'Video Viral TikTok/Reels',
        videoUrl: 'https://www.youtube.com/watch?v=BASylcv8npQ',
        youtubeId: 'BASylcv8npQ',
        imageUrl: 'https://img.youtube.com/vi/BASylcv8npQ/hqdefault.jpg',
        aspectRatio: 'video'
      },
      {
        id: 'p-video-review',
        title: 'Quy Trình Dựng Video CapCut & Giọng Đọc AI Tự Động',
        subtitle: 'Biến ý tưởng thành video thành phẩm chỉ trong vài phút, tự động thêm phụ đề & âm thanh kịch tính',
        tag: 'CapCut AI Automation',
        imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      }
    ]
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
    highlights: ['Bài giảng số', 'Tài nguyên AI', 'Bộ đề thi', 'Đánh giá tự động'],
    showcaseProducts: [
      {
        id: 'p-edu-slide',
        title: 'Bộ Slide Bài Giảng Điện Tử Tương Tác 3D Trực Quan',
        subtitle: 'Tự động tạo bài giảng sinh động kèm tranh vẽ minh họa và sơ đồ tư duy bằng AI trong 5 phút',
        tag: 'Slide Bài Giảng 4.0',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      },
      {
        id: 'p-edu-exam',
        title: 'Ngân Hàng Đề Thi & Ma Trận Kiểm Tra Phân Hóa Đa Cấp Độ',
        subtitle: 'Sinh đề thi trắc nghiệm, phiếu bài tập và đáp án giải chi tiết tự động theo chuẩn chương trình',
        tag: 'Học Liệu & Đề Thi Số',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'video'
      }
    ]
  }
];

export const CLASS_INFO = {
  title: 'MMK - CLASS: LÀM CHỦ AI ĐỘT PHÁ',
  instructor: 'Chuyên Gia AI Ngô Tuyết',
  scheduleDisplay: '19:30 - 21:30 | 3 Buổi Thực Chiến Trực Tuyến',
  format: 'Học Trực Tuyến Qua Zoom (Bản Quyền Chất Lượng Cao)',
  tuition: '100% MIỄN PHÍ (Suất Tài Trợ MMK - CLASS)',
  zaloGroupUrl: 'https://zalo.me/g/pccjfp974',
  totalFreeSeats: 100,
  claimedSeats: 82,
  nextClassDate: '2026-10-15T19:30:00+07:00'
};
