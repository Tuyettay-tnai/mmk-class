import React, { useState, useEffect } from 'react';
import { COURSE_MODULES } from '../data/courses';
import { ShowcaseProduct } from '../types';
import { 
  Code, 
  Bot, 
  Video, 
  BookOpen, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  X, 
  Edit3, 
  Image as ImageIcon,
  ExternalLink,
  Layers,
  Play
} from 'lucide-react';

interface CourseModulesSectionProps {
  onSelectCourseToRegister: (courseTitle: string) => void;
}

const STORAGE_CUSTOM_IMAGES = 'mmk_custom_product_images';

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i);
  return match ? match[1] : null;
}

export const CourseModulesSection: React.FC<CourseModulesSectionProps> = ({ onSelectCourseToRegister }) => {
  // Store custom image URLs overriding defaults (keyed by product id)
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  
  // Lightbox view state
  const [previewProduct, setPreviewProduct] = useState<ShowcaseProduct | null>(null);

  // Edit image link modal state
  const [editingProduct, setEditingProduct] = useState<ShowcaseProduct | null>(null);
  const [editInputUrl, setEditInputUrl] = useState('');

  // Load custom images from localStorage
  useEffect(() => {
    try {
      // Support checking both legacy key and current key
      const saved = localStorage.getItem(STORAGE_CUSTOM_IMAGES) || localStorage.getItem('mnk_custom_product_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear obsolete broken unsplash link for p-video-short so YouTube video shows
        if (parsed['p-video-short'] && (parsed['p-video-short'].includes('unsplash.com') || parsed['p-video-short'].includes('photo-1536240478700'))) {
          delete parsed['p-video-short'];
          localStorage.setItem(STORAGE_CUSTOM_IMAGES, JSON.stringify(parsed));
        }
        setCustomImages(parsed);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const handleSaveCustomImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const trimmed = editInputUrl.trim();
    const updated = { ...customImages };
    if (trimmed) {
      updated[editingProduct.id] = trimmed;
    } else {
      delete updated[editingProduct.id];
    }

    setCustomImages(updated);
    try {
      localStorage.setItem(STORAGE_CUSTOM_IMAGES, JSON.stringify(updated));
    } catch (err) {
      // Ignore
    }
    setEditingProduct(null);
  };

  const openEditModal = (product: ShowcaseProduct) => {
    setEditingProduct(product);
    setEditInputUrl(customImages[product.id] || product.imageUrl);
  };

  const getProductYouTubeId = (product: ShowcaseProduct): string | null => {
    const custom = customImages[product.id];
    if (custom) {
      const customYt = extractYouTubeId(custom);
      if (customYt) return customYt;
    }
    if (product.youtubeId) return product.youtubeId;
    if (product.videoUrl) return extractYouTubeId(product.videoUrl);
    return extractYouTubeId(product.imageUrl);
  };

  const getProductImage = (product: ShowcaseProduct) => {
    const custom = customImages[product.id];
    if (custom) {
      const customYt = extractYouTubeId(custom);
      if (customYt) {
        return `https://img.youtube.com/vi/${customYt}/hqdefault.jpg`;
      }
      return custom;
    }
    if (product.imageUrl) return product.imageUrl;
    if (product.youtubeId) return `https://img.youtube.com/vi/${product.youtubeId}/hqdefault.jpg`;
    return '';
  };

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
            <span className="text-gold-gradient font-heading ml-2">MMK - CLASS</span>
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

                {/* PRODUCT SHOWCASE FRAMES (Khung chèn ảnh sản phẩm tạo ra từ khóa học) */}
                {course.showcaseProducts && course.showcaseProducts.length > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#070e20] border border-blue-900/40 shadow-inner">
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Sản phẩm thực tế tạo ra sau khóa học:</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-800/80">
                        {course.showcaseProducts.length} Khung mẫu
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {course.showcaseProducts.map((product) => {
                        const ytId = getProductYouTubeId(product);
                        const currentImg = getProductImage(product);
                        return (
                          <div 
                            key={product.id}
                            className="group/prod flex flex-col rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 transition-all duration-300"
                          >
                            {/* Showcase Frame: Video iframe if YouTube, otherwise Image */}
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                              {ytId ? (
                                <iframe
                                  src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                                  title={product.title}
                                  className="w-full h-full border-0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  loading="lazy"
                                />
                              ) : (
                                <>
                                  <img
                                    src={currentImg}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  {/* Dark gradient shadow */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
                                </>
                              )}

                              {/* Tag badge */}
                              <div className="absolute top-2 left-2 z-10 pointer-events-none">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-500/40 shadow-sm flex items-center gap-1">
                                  {ytId && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                                  {product.tag}
                                </span>
                              </div>

                              {/* Hover Action Overlay for images */}
                              {!ytId && (
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/prod:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewProduct(product)}
                                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-md transition-transform hover:scale-110 cursor-pointer"
                                    title="Xem ảnh phóng to"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => openEditModal(product)}
                                    className="p-2 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700 shadow-md transition-transform hover:scale-110 cursor-pointer"
                                    title="Chèn / Đổi link ảnh giới thiệu"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Caption info */}
                            <div className="p-3 flex flex-col justify-between flex-1">
                              <div>
                                <h4 className="text-xs font-bold text-white group-hover/prod:text-amber-300 transition-colors line-clamp-1">
                                  {product.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                  {product.subtitle}
                                </p>
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] gap-2 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => setPreviewProduct(product)}
                                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>{ytId ? 'Phóng to video' : 'Phóng to'}</span>
                                </button>
                                {ytId && (
                                  <a
                                    href={`https://www.youtube.com/watch?v=${ytId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    <span>Mở YouTube</span>
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => openEditModal(product)}
                                  className="text-slate-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>{ytId ? 'Đổi video' : 'Đổi link ảnh'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

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
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded-lg border border-slate-700 hover:border-amber-300 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Chọn Khóa Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Combo Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-amber-950/70 border-2 border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30">
              Đặc Quyền Hội Viên MMK - CLASS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Đăng Ký Nhận Vé Trọn Bộ Combo 4 Khóa Học AI
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Nhận toàn bộ tài liệu, slide giáo trình, kho prompt bí truyền và quyền tham dự đầy đủ 3 buổi Zoom trực tiếp cùng Chuyên Gia AI Ngô Tuyết.
            </p>
          </div>

          <button
            onClick={() => onSelectCourseToRegister('Trọn bộ combo 4 khóa học AI MMK - CLASS')}
            type="button"
            className="px-6 py-3.5 text-sm sm:text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-xl hover:shadow-amber-400/25 active:scale-95 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
            Nhận Vé Trọn Bộ 4 Khóa
          </button>
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl w-full rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {previewProduct.tag}
                </span>
                <h3 className="text-base font-bold text-white">
                  {previewProduct.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video max-h-[75vh] w-full bg-black flex items-center justify-center overflow-hidden">
              {getProductYouTubeId(previewProduct) ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${getProductYouTubeId(previewProduct)}?autoplay=1&rel=0`}
                  title={previewProduct.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img
                  src={getProductImage(previewProduct)}
                  alt={previewProduct.title}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 gap-3">
              <p className="text-slate-300">
                {previewProduct.subtitle}
              </p>
              <button
                type="button"
                onClick={() => {
                  const p = previewProduct;
                  setPreviewProduct(null);
                  openEditModal(p);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold flex items-center gap-1.5 shrink-0 ml-4 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Đổi video / link này</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image or Video URL Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-lg w-full rounded-2xl bg-[#091228] border border-blue-500/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Chèn / Đổi Video Hoặc Ảnh Sản Phẩm
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 text-xs text-slate-300">
              <p className="font-semibold text-white mb-1">
                {editingProduct.title}
              </p>
              <p className="text-slate-400">
                Dán đường dẫn video YouTube (ví dụ <code className="text-amber-300 font-mono">https://www.youtube.com/watch?v=...</code>) hoặc link ảnh trực tiếp (ImgBB, Unsplash, CDN) để cập nhật cho khung này.
              </p>
            </div>

            <form onSubmit={handleSaveCustomImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Đường dẫn Video YouTube hoặc Ảnh (URL):
                </label>
                <input
                  type="url"
                  value={editInputUrl}
                  onChange={(e) => setEditInputUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... hoặc https://i.ibb.co/..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {editInputUrl.trim() && (
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Xem trước nội dung:</span>
                  <div className="aspect-video w-full rounded overflow-hidden bg-black flex items-center justify-center">
                    {extractYouTubeId(editInputUrl.trim()) ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(editInputUrl.trim())}?rel=0`}
                        title="Xem trước video"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <img 
                        src={editInputUrl.trim()} 
                        alt="Xem trước" 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).alt = 'Không thể tải ảnh từ liên kết này. Vui lòng kiểm tra lại URL trực tiếp.';
                        }}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Reset to default
                    setEditInputUrl(editingProduct.videoUrl || editingProduct.imageUrl);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Khôi phục mặc định
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Lưu & Áp Dụng Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
