import React from 'react';
import { 
  Image as ImageIcon, 
  MapPin, 
  Star, 
  HeartHandshake, 
  MessageCircleQuestion, 
  Plus, 
  Sparkles,
  ChevronDown,
  Building2,
  Calendar,
  ShoppingBag,
  Scissors,
  Hotel,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { User, ToplistPlace } from '../types';
import heroBannerImg from '../assets/images/vettop_hero_banner_1791795554306.jpg';

interface FeedHeaderProps {
  currentUser: User | null;
  onOpenCreatePost: (initialType?: 'general' | 'adoption' | 'experience' | 'review' | 'qa') => void;
  activeFilterType: string;
  setActiveFilterType: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  places?: ToplistPlace[];
  onOpenClinicDetails?: (place: ToplistPlace) => void;
  onOpenBooking?: (place: ToplistPlace) => void;
  onOpenRegisterBusiness?: () => void;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  currentUser,
  onOpenCreatePost,
  activeFilterType,
  setActiveFilterType,
  sortBy,
  setSortBy,
  places = [],
  onOpenClinicDetails,
  onOpenBooking,
  onOpenRegisterBusiness,
}) => {
  // Get highlighted places (prioritizing real registered places first, then Hòa Vang, etc.)
  const displayedPlaces = places
    .slice()
    .sort((a, b) => {
      if (a.isRealRegistered && !b.isRealRegistered) return -1;
      if (!a.isRealRegistered && b.isRealRegistered) return 1;
      if (a.name.includes('Hòa Vang') && !b.name.includes('Hòa Vang')) return -1;
      return 0;
    })
    .slice(0, 6);

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
            <span>Mạng xã hội Thú Y & Cứu trợ thú cưng</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            Chia sẻ yêu thương <br />
            <span className="text-amber-200">Kết nối cộng đồng</span>
          </h2>

          <p className="text-xs sm:text-sm text-blue-50 mt-1.5 line-clamp-2 max-w-md">
            Đánh giá phòng khám thú y · Đặt lịch khám trực tuyến · Cửa hàng Pet Shop · Nhận nuôi thú cưng!
          </p>
        </div>
      </div>

      {/* 2. REAL VERIFIED BUSINESSES HIGHLIGHT ON HOMEPAGE (Phòng khám & Pet Shop thực tế) */}
      {displayedPlaces.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Cơ sở Thú Y & Pet Shop hoạt động trên hệ thống</span>
              </h3>
            </div>
            {onOpenRegisterBusiness && (
              <button
                onClick={onOpenRegisterBusiness}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>+ Đăng ký phòng khám / Pet Shop</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Horizontal scrollable cards */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
            {displayedPlaces.map((place) => (
              <div
                key={place.id}
                className="w-64 shrink-0 bg-slate-50/80 hover:bg-slate-50 border border-slate-200/70 hover:border-blue-300 rounded-xl p-3 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-start gap-2.5 mb-2">
                    {place.logoUrl ? (
                      <img
                        src={place.logoUrl}
                        alt={place.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {place.category === 'petshop' ? '🛍️' : '🩺'}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h4 
                          onClick={() => onOpenClinicDetails && onOpenClinicDetails(place)}
                          className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 cursor-pointer"
                        >
                          {place.name}
                        </h4>
                        {place.isRealRegistered && (
                          <span title="Đã xác minh" className="shrink-0 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{place.city}</span>
                      </p>
                    </div>
                  </div>

                  {/* Badges for Services (Pet Shop, Spa, Pet Hotel, Clinic) */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {place.category === 'clinic' && (
                      <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-md">
                        🩺 Thú y
                      </span>
                    )}
                    {(place.category === 'petshop' || place.hasPetShop) && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                        <ShoppingBag className="w-2.5 h-2.5" />
                        <span>Pet Shop</span>
                      </span>
                    )}
                    {(place.category === 'spa' || place.hasSpa) && (
                      <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                        <Scissors className="w-2.5 h-2.5" />
                        <span>Spa</span>
                      </span>
                    )}
                    {(place.category === 'hotel' || place.hasPetHotel) && (
                      <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                        <Hotel className="w-2.5 h-2.5" />
                        <span>Hotel</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => onOpenClinicDetails && onOpenClinicDetails(place)}
                    className="flex-1 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 transition-colors"
                  >
                    Xem cơ sở
                  </button>
                  {place.category === 'clinic' && onOpenBooking && (
                    <button
                      onClick={() => onOpenBooking(place)}
                      className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Đặt lịch</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Post Creation Input Capsule matching screenshot */}
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
            {currentUser 
              ? (currentUser.userType === 'vet'
                  ? `${currentUser.name} ơi, bạn muốn chia sẻ kiến thức y khoa hoặc thông báo gì?`
                  : currentUser.userType === 'petshop'
                  ? `${currentUser.name} ơi, cửa hàng có sản phẩm mới hoặc ưu đãi nào muốn đăng?`
                  : 'Bạn đang nghĩ gì về thú cưng của mình?')
              : 'Đăng nhập hoặc đăng ký để chia sẻ cùng cộng đồng...'}
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

      {/* 4. Filter Tabs & Sort Row matching screenshot */}
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
