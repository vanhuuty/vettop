import React, { useState } from 'react';
import { 
  Search, 
  Home, 
  Trophy, 
  MapPin, 
  Users, 
  Users2,
  HeartHandshake, 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  BookOpen, 
  PlusCircle, 
  LogOut, 
  UserCheck, 
  PawPrint,
  LogIn,
  UserPlus,
  Stethoscope 
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadNotifications: number;
  unreadMessages: number;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onOpenCreatePost: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeNavTab,
  setActiveNavTab,
  searchQuery,
  setSearchQuery,
  unreadNotifications,
  unreadMessages,
  onOpenNotifications,
  onOpenMessages,
  onOpenProfile,
  onOpenAuth,
  onOpenCreatePost,
  onLogout,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-[1520px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveNavTab('feed')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-98"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:shadow-md transition-all">
              <PawPrint className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                  VetTop
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm">VN</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-0.5">
                Cộng đồng & Nhận nuôi thú cưng
              </p>
            </div>
          </button>
        </div>

        {/* Center-Left: Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm phòng khám, bác sĩ, bài viết, thú cưng nhận nuôi..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-full outline-hidden transition-all placeholder:text-slate-400 focus:shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Center: Main Navigation Icons / Tabs */}
        <nav className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setActiveNavTab('feed')}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeNavTab === 'feed'
                ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span>Trang chủ</span>
            {activeNavTab === 'feed' && (
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveNavTab('adoption')}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeNavTab === 'adoption'
                ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <HeartHandshake className="w-5 h-5 mb-0.5" />
            <span className="relative">
              Nhận nuôi
              <span className="ml-1 inline-block w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </span>
            {activeNavTab === 'adoption' && (
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveNavTab('experience')}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeNavTab === 'experience'
                ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span>Kinh nghiệm</span>
            {activeNavTab === 'experience' && (
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveNavTab('toplist')}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeNavTab === 'toplist'
                ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Trophy className="w-5 h-5 mb-0.5" />
            <span>Toplist</span>
            {activeNavTab === 'toplist' && (
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveNavTab('friends')}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeNavTab === 'friends'
                ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span>Bạn bè</span>
            {activeNavTab === 'friends' && (
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveNavTab('groups')}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeNavTab === 'groups'
                ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Users2 className="w-5 h-5 mb-0.5" />
            <span>Hội nhóm</span>
            {activeNavTab === 'groups' && (
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Right: Actions, Notifications, Messages & User Menu */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Post Button */}
          <button
            onClick={onOpenCreatePost}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Đăng bài</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Thông báo"
            className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Messages Button */}
          <button
            onClick={onOpenMessages}
            aria-label="Tin nhắn"
            className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadMessages}
              </span>
            )}
          </button>

          {/* LOGGED IN VS LOGGED OUT STATE */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-slate-100 transition-colors border border-slate-200/60"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  {currentUser.userType === 'vet' && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white ring-1 ring-white" title="Bác sĩ thú y">
                      🩺
                    </span>
                  )}
                  {currentUser.userType === 'petshop' && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] text-white ring-1 ring-white" title="Cửa hàng Pet Shop">
                      🛍️
                    </span>
                  )}
                  {currentUser.userType === 'spa' && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 rounded-full flex items-center justify-center text-[8px] text-white ring-1 ring-white" title="Spa & Grooming">
                      ✂️
                    </span>
                  )}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 max-w-[130px] truncate leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold leading-tight max-w-[130px] truncate">
                    {currentUser.clinicName || (currentUser.userType === 'vet' ? 'Bác sĩ thú y' : currentUser.userType === 'petshop' ? 'Cửa hàng Pet Shop' : currentUser.userType === 'spa' ? 'Spa Grooming' : 'Chủ nuôi')}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Dropdown Menu */}
              {showUserDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setShowUserDropdown(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {currentUser.clinicName || currentUser.role || 'Thành viên cộng đồng'}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={onOpenProfile}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span>Trang cá nhân & {currentUser.userType === 'vet' ? 'Phòng khám' : 'Thú cưng'}</span>
                    </button>

                    <button
                      onClick={() => setActiveNavTab('adoption')}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <HeartHandshake className="w-4 h-4 text-rose-600" />
                      <span>Quản lý tin nhận nuôi của tôi</span>
                    </button>

                    <button
                      onClick={onOpenAuth}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Đổi tài khoản / Đăng ký mới</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out / Guest state: Show Login & Register buttons */
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>Đăng nhập</span>
              </button>
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Đăng ký</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
