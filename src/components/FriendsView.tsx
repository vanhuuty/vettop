import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Search, 
  MapPin, 
  MessageCircle, 
  PawPrint, 
  Sparkles, 
  Heart,
  Check,
  X
} from 'lucide-react';
import { User } from '../types';

interface FriendsViewProps {
  users: User[];
  currentUser: User;
  onSendFriendRequest: (userId: string) => void;
  onOpenUserModal: (user: User) => void;
  onOpenChatWith: (user: User) => void;
}

export const FriendsView: React.FC<FriendsViewProps> = ({
  users,
  currentUser,
  onSendFriendRequest,
  onOpenUserModal,
  onOpenChatWith,
}) => {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'friends' | 'requests'>('suggestions');
  const [searchQuery, setSearchQuery] = useState('');

  const myFriends = users.filter((u) => u.isFriend && u.id !== currentUser.id);
  const suggestions = users.filter((u) => !u.isFriend && u.id !== currentUser.id);

  const displayedList = activeTab === 'friends' 
    ? myFriends 
    : suggestions;

  const filteredList = displayedList.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.location && u.location.toLowerCase().includes(q)) ||
      (u.role && u.role.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Mạng xã hội người nuôi thú cưng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Kết bạn bốn phương & <br /> Giao lưu những người cùng đam mê
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md">
            Tìm kiếm bạn dắt cún đi dạo cùng khu phố, giao lưu trao đổi giống mèo, học hỏi kinh nghiệm từ các bác sĩ thú y và chủ nuôi tận tâm.
          </p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'suggestions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Gợi ý kết bạn ({suggestions.length})
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'friends'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Bạn bè của tôi ({myFriends.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bạn bè theo tên, vị trí, vai trò..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl outline-hidden focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Users Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredList.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header profile banner */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  onClick={() => onOpenUserModal(user)}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 
                      onClick={() => onOpenUserModal(user)}
                      className="text-sm font-bold text-slate-900 truncate cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      {user.name}
                    </h4>
                    {user.userType === 'vet' && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md shrink-0">
                        Bác sĩ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 font-semibold truncate">
                    {user.clinicName || user.role || 'Thành viên'}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{user.clinicAddress || user.location || 'Việt Nam'}</span>
                  </p>
                </div>
              </div>

              {/* Bio & Pet Stats */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                {user.bio || 'Yêu thích chó mèo và động vật. Rất vui được làm quen với mọi người!'}
              </p>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-[11px] text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <PawPrint className="w-3.5 h-3.5 text-blue-600" />
                  <span>{user.userType === 'vet' ? 'Phòng khám thú y' : `${user.petsCount || 1} thú cưng`}</span>
                </span>
                <span>{user.mutualFriends || 5} bạn chung</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onOpenChatWith(user)}
                className={`p-2 rounded-xl transition-colors flex items-center gap-1 ${
                  user.isFriend 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                title={user.isFriend ? 'Nhắn tin trực tuyến' : 'Cần kết bạn trước khi nhắn tin'}
              >
                <MessageCircle className="w-4 h-4" />
                {!user.isFriend && <span className="text-[10px] text-amber-600 font-bold">🔒</span>}
              </button>

              {user.isFriend ? (
                <button
                  onClick={() => onSendFriendRequest(user.id)}
                  className="flex-1 py-2 bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors group"
                >
                  <Check className="w-3.5 h-3.5 group-hover:hidden" />
                  <span className="group-hover:hidden">Bạn bè</span>
                  <span className="hidden group-hover:inline">Hủy kết bạn</span>
                </button>
              ) : user.friendRequestSent ? (
                <button
                  onClick={() => onSendFriendRequest(user.id)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã gửi lời mời</span>
                </button>
              ) : (
                <button
                  onClick={() => onSendFriendRequest(user.id)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Kết bạn</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
