import React from 'react';
import { 
  Image as ImageIcon, 
  MapPin, 
  Star, 
  HeartHandshake, 
  MessageCircleQuestion, 
  Plus, 
  Sparkles,
  ChevronDown 
} from 'lucide-react';
import { User } from '../types';
import heroBannerImg from '../assets/images/vettop_hero_banner_1791795554306.jpg';

interface FeedHeaderProps {
  currentUser: User | null;
  onOpenCreatePost: (initialType?: 'general' | 'adoption' | 'experience' | 'review' | 'qa') => void;
  activeFilterType: string;
  setActiveFilterType: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  currentUser,
  onOpenCreatePost,
  activeFilterType,
  setActiveFilterType,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="space-y-4 mb-4">
      {/* 1. Hero Banner matching screenshot */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 min-h-[160px] sm:min-h-[190px] flex items-center">
        {/* Background Image with soft opacity and vignette */}
        <img
          src={heroBannerImg}
          alt="VetTop Community Banner"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-800/40 to-transparent" />

        {/* Content Overlay */}
        <div className="relative z-10 px-6 sm:px-8 py-5 text-white max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Mạng xã hội & Cứu trợ thú cưng</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            Chia sẻ yêu thương <br />
            <span className="text-amber-200">Kết nối cộng đồng</span>
          </h2>

          <p className="text-xs sm:text-sm text-blue-50 mt-1.5 line-clamp-2 max-w-md">
            Đánh giá phòng khám · Kinh nghiệm nuôi thú · Tìm kiếm người nhận nuôi · Cùng nhau chăm sóc thú cưng tốt hơn!
          </p>
        </div>
      </div>

      {/* 2. Post Creation Input Capsule matching screenshot */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80">
        <div className="flex items-center gap-3 mb-3">
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
              VT
            </div>
          )}
          <button
            onClick={() => onOpenCreatePost('general')}
            className="flex-1 text-left px-4 py-2.5 bg-slate-100 hover:bg-slate-200/70 text-slate-500 hover:text-slate-700 text-xs sm:text-sm rounded-full transition-all"
          >
            {currentUser ? 'Bạn đang nghĩ gì về thú cưng của mình?' : 'Đăng nhập hoặc đăng ký để chia sẻ cùng cộng đồng...'}
          </button>
        </div>

        {/* Action icons bar */}
        <div className="flex flex-wrap items-center justify-between gap-1 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <button
              onClick={() => onOpenCreatePost('general')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-emerald-500" />
              <span>Ảnh/Video</span>
            </button>

            <button
              onClick={() => onOpenCreatePost('review')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>Đánh giá dịch vụ</span>
            </button>

            <button
              onClick={() => onOpenCreatePost('adoption')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Đăng tin nhận nuôi</span>
            </button>

            <button
              onClick={() => onOpenCreatePost('qa')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <MessageCircleQuestion className="w-4 h-4 text-purple-500" />
              <span>Hỏi đáp thú y</span>
            </button>
          </div>

          <button
            onClick={() => onOpenCreatePost('general')}
            className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
          >
            Đăng
          </button>
        </div>
      </div>

      {/* 3. Filter Tabs & Sort Row matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'adoption', label: 'Nhận nuôi thú cưng' },
            { id: 'experience', label: 'Chia sẻ kinh nghiệm' },
            { id: 'review', label: 'Đánh giá phòng khám' },
            { id: 'qa', label: 'Hỏi đáp & Thảo luận' },
            { id: 'saved', label: 'Đã lưu' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeFilterType === tab.id
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-xs text-slate-400">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1 outline-hidden cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="popular">Phổ biến nhất</option>
            <option value="comments">Nhiều bình luận</option>
          </select>
        </div>
      </div>
    </div>
  );
};
