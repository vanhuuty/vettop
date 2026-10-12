import React, { useState } from 'react';
import { 
  Users2, 
  Search, 
  Check, 
  Plus, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Heart, 
  Eye, 
  ArrowRight,
  TrendingUp,
  Share2
} from 'lucide-react';
import { CommunityGroup, User } from '../types';

interface GroupsViewProps {
  groups: CommunityGroup[];
  currentUser: User | null;
  onToggleJoinGroup: (groupId: string) => void;
  onOpenCreatePostInGroup: (groupName: string) => void;
  onFilterPostsByGroup: (groupName: string) => void;
}

export const GroupsView: React.FC<GroupsViewProps> = ({
  groups,
  currentUser,
  onToggleJoinGroup,
  onOpenCreatePostInGroup,
  onFilterPostsByGroup,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'joined'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupModal, setSelectedGroupModal] = useState<CommunityGroup | null>(null);

  const filteredGroups = groups.filter((g) => {
    if (activeTab === 'joined' && !g.isJoined) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) || 
        g.category.toLowerCase().includes(q) || 
        g.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="max-w-xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <Users2 className="w-4 h-4" />
            <span>Cộng Đồng Thú Cưng Việt Nam</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Gia nhập các Hội Nhóm <br /> Cùng đam mê chăm sóc Boss & Sen
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md">
            Giao lưu với hơn 100,000 chủ nuôi thú cưng, trạm cứu trợ và bác sĩ thú y. Chia sẻ kinh nghiệm, hỏi đáp bệnh lý và tổ chức offline gặp gỡ giao lưu.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhóm theo tên, giống thú cưng, chủ đề..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả nhóm ({groups.length})
            </button>
            <button
              onClick={() => setActiveTab('joined')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'joined'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Nhóm đã tham gia ({groups.filter(g => g.isJoined).length})
            </button>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cover & Avatar Header */}
              <div className="relative h-28 bg-slate-200 overflow-hidden">
                <img
                  src={group.coverImage}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-800 shadow-xs">
                  {group.category}
                </div>
              </div>

              {/* Group Body */}
              <div className="p-4 pt-0 relative space-y-3">
                <div className="flex items-end justify-between -mt-7 mb-2">
                  <div className="relative">
                    <img
                      src={group.avatar}
                      alt={group.name}
                      className="w-14 h-14 rounded-2xl object-cover border-3 border-white shadow-md bg-white"
                    />
                  </div>
                  <button
                    onClick={() => onToggleJoinGroup(group.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      group.isJoined
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                    }`}
                  >
                    {group.isJoined ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã tham gia</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tham gia nhóm</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Users2 className="w-3.5 h-3.5 text-blue-600" />
                      {(group.membersCount / 1000).toFixed(1)}k thành viên
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {group.postsCountDaily} bài viết/ngày
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {group.description}
                </p>

                <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1 border border-slate-100">
                  <span className="font-semibold text-slate-700 block">Quản trị viên: {group.adminName}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedGroupModal(group)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1"
              >
                Quy định nhóm
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onFilterPostsByGroup(group.name)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Xem bài viết
                </button>
                <button
                  onClick={() => onOpenCreatePostInGroup(group.name)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Đăng bài</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rules Modal */}
      {selectedGroupModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedGroupModal(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Nội quy nhóm: {selectedGroupModal.name}
              </h4>
              <button 
                onClick={() => setSelectedGroupModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              {selectedGroupModal.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedGroupModal(null)}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-colors"
            >
              Tôi đã hiểu & đồng ý
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
