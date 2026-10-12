import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Eye, 
  Clock, 
  User as UserIcon, 
  Plus, 
  Share2, 
  Bookmark, 
  MessageSquare,
  HelpCircle,
  ThumbsUp,
  X
} from 'lucide-react';
import { GuideArticle, User } from '../types';

interface ExperienceHubProps {
  articles: GuideArticle[];
  currentUser: User | null;
  onOpenCreateExperience: () => void;
  onSelectArticle: (article: GuideArticle) => void;
}

export const ExperienceHub: React.FC<ExperienceHubProps> = ({
  articles,
  currentUser,
  onOpenCreateExperience,
  onSelectArticle,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<GuideArticle | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả cẩm nang' },
    { id: 'stress', label: 'Tâm lý & Stress' },
    { id: 'kitten', label: 'Chăm sóc con nhỏ' },
    { id: 'nutrition', label: 'Dinh dưỡng & Bữa ăn' },
    { id: 'training', label: 'Huấn luyện & Nhận nuôi' },
  ];

  const filteredArticles = articles.filter((art) => {
    if (activeCategory !== 'all' && art.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Thư viện Cẩm nang & Kinh nghiệm thú cưng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Kinh nghiệm thực chiến & <br /> Kiến thức thú y chuẩn xác
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mb-4">
            Được tổng hợp từ các bác sĩ thú y giàu kinh nghiệm, chuyên gia dinh dưỡng và cộng đồng người nuôi thú cưng lâu năm tại Việt Nam.
          </p>
          <button
            onClick={onOpenCreateExperience}
            className="px-4 py-2.5 bg-white text-emerald-700 hover:bg-emerald-50 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Chia sẻ kinh nghiệm của bạn</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết kinh nghiệm (ví dụ: stress, mèo con, thức ăn hạt...)"
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-emerald-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setReadingArticle(article)}
            className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {article.categoryLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime} đọc</span>
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-[11px]">{article.author}</p>
                  <p className="text-[10px] text-slate-400">{article.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{article.views}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {readingArticle && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setReadingArticle(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/50">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {readingArticle.categoryLabel}
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {readingArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-800">Tác giả: {readingArticle.author} ({readingArticle.authorRole})</span>
                <span aria-hidden="true">·</span>
                <span>{readingArticle.views} lượt xem</span>
                <span aria-hidden="true">·</span>
                <span>{readingArticle.readTime} đọc</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                💡 <span className="font-bold">Tóm tắt cốt lõi:</span> {readingArticle.summary}
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Nội dung chi tiết & Hướng dẫn:
                </h4>
                {readingArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert('Cảm ơn bạn đã thích bài viết!')}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Hữu ích (248)</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Đã sao chép liên kết bài viết!');
                    }}
                    className="px-3 py-1.5 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>

                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-1.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
