import React, { useState } from 'react';
import { 
  Star, 
  Bookmark, 
  UserPlus, 
  Check, 
  ChevronRight, 
  Sparkles, 
  Users, 
  MessageCircle, 
  HeartHandshake 
} from 'lucide-react';
import { ToplistPlace, GuideArticle, User } from '../types';

interface RightSidebarProps {
  toplistPlaces: ToplistPlace[];
  guideArticles: GuideArticle[];
  suggestedFriends: User[];
  onToggleSavePlace: (placeId: string) => void;
  onSendFriendRequest: (userId: string) => void;
  onOpenArticle: (article: GuideArticle) => void;
  onOpenUserModal: (user: User) => void;
  onOpenChatWith: (user: User) => void;
  onViewAllToplist: () => void;
  onViewAllArticles: () => void;
  onViewAllFriends: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  toplistPlaces,
  guideArticles,
  suggestedFriends,
  onToggleSavePlace,
  onSendFriendRequest,
  onOpenArticle,
  onOpenUserModal,
  onOpenChatWith,
  onViewAllToplist,
  onViewAllArticles,
  onViewAllFriends,
}) => {
  const [toplistTab, setToplistTab] = useState<'clinic' | 'petshop' | 'spa' | 'hotel'>('clinic');

  const filteredPlaces = toplistPlaces
    .filter((p) => {
      if (toplistTab === 'clinic') return p.category === 'clinic';
      if (toplistTab === 'petshop') return p.category === 'petshop' || p.hasPetShop;
      if (toplistTab === 'spa') return p.category === 'spa' || p.hasSpa;
      if (toplistTab === 'hotel') return p.category === 'hotel' || p.hasPetHotel;
      return p.category === toplistTab;
    })
    .sort((a, b) => {
      if (a.isRealRegistered && !b.isRealRegistered) return -1;
      if (!a.isRealRegistered && b.isRealRegistered) return 1;
      return 0;
    })
    .slice(0, 5);

  return (
    <aside className="w-80 shrink-0 hidden xl:block space-y-4">
      {/* 1. Toplist Nổi Bật */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Toplist nổi bật</h3>
          <button
            onClick={onViewAllToplist}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-3.5 overflow-x-auto text-[11px] font-semibold">
          <button
            onClick={() => setToplistTab('clinic')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              toplistTab === 'clinic'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phòng khám
          </button>
          <button
            onClick={() => setToplistTab('petshop')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              toplistTab === 'petshop'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Petshop
          </button>
          <button
            onClick={() => setToplistTab('spa')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              toplistTab === 'spa'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Spa
          </button>
          <button
            onClick={() => setToplistTab('hotel')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              toplistTab === 'hotel'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pet Hotel
          </button>
        </div>

        {/* Toplist Places List */}
        <div className="space-y-3">
          {filteredPlaces.map((place, index) => {
            const rank = index + 1;
            const rankBadges = ['🥇', '🥈', '🥉', '4', '5'];
            return (
              <div
                key={place.id}
                className="flex items-center gap-2.5 group hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
              >
                {/* Rank indicator */}
                <div className="w-6 text-center text-xs font-extrabold text-slate-500 shrink-0">
                  {rank <= 3 ? (
                    <span className="text-base">{rankBadges[index]}</span>
                  ) : (
                    <span>{rank}</span>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  {place.imageUrl ? (
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                      VT
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{place.rating.toFixed(1)}</span>
                    </span>
                    <span className="text-slate-400">({place.reviewsCount})</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {place.city}
                  </p>
                </div>

                {/* Bookmark action */}
                <button
                  onClick={() => onToggleSavePlace(place.id)}
                  aria-label="Lưu địa điểm"
                  className={`p-1.5 rounded-lg transition-colors ${
                    place.isSaved
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${place.isSaved ? 'fill-blue-600' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Bài viết xu hướng (Trending experience guides) */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Bài viết xu hướng</h3>
          <button
            onClick={onViewAllArticles}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {guideArticles.slice(0, 3).map((article, index) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="flex items-start gap-3 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <div className="w-5 text-center text-xs font-extrabold text-slate-400 pt-0.5 shrink-0">
                {index + 1}
              </div>

              <div className="w-12 h-12 rounded-lg bg-amber-50 shrink-0 overflow-hidden flex items-center justify-center text-amber-600">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">
                  {article.views} lượt xem · {article.readTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Gợi ý kết bạn (Friend Suggestions matching screenshot) */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Gợi ý kết bạn</h3>
          <button
            onClick={onViewAllFriends}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {suggestedFriends.slice(0, 3).map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-2 p-1 rounded-xl hover:bg-slate-50 transition-colors">
              <div 
                onClick={() => onOpenUserModal(user)}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate hover:text-blue-600 transition-colors">
                    {user.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user.role || (user.petsCount ? `Có ${user.petsCount} thú cưng` : 'Yêu thú cưng')}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user.mutualFriends ? `${user.mutualFriends} bạn chung` : user.location}
                  </p>
                </div>
              </div>

              <div>
                {user.isFriend ? (
                  <button
                    onClick={() => onOpenChatWith(user)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Nhắn tin</span>
                  </button>
                ) : user.friendRequestSent ? (
                  <button
                    onClick={() => onSendFriendRequest(user.id)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Đã gửi</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSendFriendRequest(user.id)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Kết bạn</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Featured Club Group */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-blue-50/60 border border-blue-100/80 mt-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  Pet Lover Club
                </h4>
                <p className="text-[10px] text-slate-500">
                  Nhóm cộng đồng · 25K thành viên
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Đã tham gia nhóm Pet Lover Club thành công! Bạn có thể xem các thảo luận trong nhóm.')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors"
            >
              Tham gia
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
