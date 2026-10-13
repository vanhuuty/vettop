import React from 'react';
import { 
  Home, 
  Compass, 
  Trophy, 
  Building2, 
  ShoppingBag, 
  Scissors, 
  Hotel, 
  Stethoscope, 
  Users2, 
  Calendar, 
  PlaySquare, 
  Bookmark, 
  Plus, 
  HeartHandshake,
  BookOpen,
  Sparkles,
  MapPin,
  Phone,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Pet, User } from '../types';

interface LeftSidebarProps {
  currentUser: User | null;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  activeFilterType: string;
  setActiveFilterType: (type: string) => void;
  pets: Pet[];
  onOpenAddPet: () => void;
  onSelectPet: (pet: Pet) => void;
  onOpenCreatePost: () => void;
  onOpenAuth: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentUser,
  activeNavTab,
  setActiveNavTab,
  activeFilterType,
  setActiveFilterType,
  pets,
  onOpenAddPet,
  onSelectPet,
  onOpenCreatePost,
  onOpenAuth,
}) => {
  const isVet = currentUser?.userType === 'vet';

  const navItems = [
    {
      id: 'feed',
      label: 'Bảng tin',
      icon: Home,
      action: () => {
        setActiveNavTab('feed');
        setActiveFilterType('all');
      },
      active: activeNavTab === 'feed' && activeFilterType === 'all',
    },
    {
      id: 'adoption',
      label: 'Nhận nuôi thú cưng',
      icon: HeartHandshake,
      badge: 'Mới',
      badgeColor: 'bg-rose-500 text-white',
      action: () => {
        setActiveNavTab('adoption');
      },
      active: activeNavTab === 'adoption',
    },
    {
      id: 'experience',
      label: 'Chia sẻ kinh nghiệm',
      icon: BookOpen,
      action: () => {
        setActiveNavTab('experience');
      },
      active: activeNavTab === 'experience',
    },
    {
      id: 'explore',
      label: 'Khám phá',
      icon: Compass,
      action: () => {
        setActiveNavTab('feed');
        setActiveFilterType('experience');
      },
      active: activeNavTab === 'feed' && activeFilterType === 'experience',
    },
    {
      id: 'toplist',
      label: 'Toplist đánh giá',
      icon: Trophy,
      action: () => {
        setActiveNavTab('toplist');
      },
      active: activeNavTab === 'toplist',
    },
    {
      id: 'clinic',
      label: 'Phòng khám thú y',
      icon: Building2,
      action: () => {
        setActiveNavTab('toplist');
      },
      active: false,
    },
    {
      id: 'petshop',
      label: 'Petshop',
      icon: ShoppingBag,
      action: () => {
        setActiveNavTab('toplist');
      },
      active: false,
    },
    {
      id: 'spa',
      label: 'Spa & Grooming',
      icon: Scissors,
      action: () => {
        setActiveNavTab('toplist');
      },
      active: false,
    },
    {
      id: 'hotel',
      label: 'Pet Hotel',
      icon: Hotel,
      action: () => {
        setActiveNavTab('toplist');
      },
      active: false,
    },
    {
      id: 'vet',
      label: 'Bác sĩ thú y',
      icon: Stethoscope,
      action: () => {
        setActiveNavTab('friends');
      },
      active: false,
    },
    {
      id: 'groups',
      label: 'Nhóm cộng đồng',
      icon: Users2,
      badge: 'Hot',
      badgeColor: 'bg-indigo-500 text-white',
      action: () => {
        setActiveNavTab('groups');
      },
      active: activeNavTab === 'groups',
    },
    {
      id: 'saved',
      label: 'Bài viết đã lưu',
      icon: Bookmark,
      action: () => {
        setActiveNavTab('feed');
        setActiveFilterType('saved');
      },
      active: activeNavTab === 'feed' && activeFilterType === 'saved',
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block space-y-4">
      {/* Primary Navigation Menu */}
      <div className="bg-white rounded-2xl p-2.5 shadow-xs border border-slate-200/80">
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${item.active ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button */}
        <div className="pt-2 px-1">
          <button
            onClick={currentUser ? onOpenCreatePost : onOpenAuth}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Viết bài / Đăng tin</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC SECTION FOR VETERINARIAN VS PET SHOP VS SPA VS PET OWNER */}
      {currentUser?.userType === 'vet' ? (
        /* Veterinarian Clinic Card */
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Phòng khám phụ trách</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
              Bác sĩ Thú Y
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-2">
            <div className="flex items-center gap-2.5">
              {currentUser?.clinicLogo ? (
                <img 
                  src={currentUser.clinicLogo} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-xl object-cover border border-indigo-200 bg-white shrink-0 shadow-xs" 
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">
                  {currentUser?.clinicName || 'Phòng khám thú y'}
                </p>
                {currentUser?.email && (
                  <p className="text-[10px] text-indigo-700 truncate font-semibold">
                    Email nhận lịch: {currentUser.email}
                  </p>
                )}
              </div>
            </div>

            {currentUser?.clinicAddress && (
              <p className="text-[11px] text-slate-600 flex items-start gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{currentUser.clinicAddress}</span>
              </p>
            )}
            
            {/* Service badges */}
            <div className="flex flex-wrap gap-1 pt-1 border-t border-indigo-100/80">
              <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded">
                🩺 Thú y
              </span>
              {currentUser?.hasPetShop && (
                <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                  🛍️ Kèm Pet Shop
                </span>
              )}
              {currentUser?.hasSpa && (
                <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded">
                  ✂️ Kèm Spa
                </span>
              )}
              {currentUser?.hasPetHotel && (
                <span className="text-[9px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">
                  🏨 Kèm Hotel
                </span>
              )}
            </div>

            {currentUser?.specialty && (
              <p className="text-[10px] text-indigo-700 font-semibold pt-0.5">
                Chuyên môn: {currentUser.specialty}
              </p>
            )}
          </div>
        </div>
      ) : currentUser?.userType === 'petshop' ? (
        /* Pet Shop Card */
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Cửa hàng Pet Shop</span>
            </h3>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-full">
              Chủ Shop
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs space-y-2">
            <div className="flex items-center gap-2.5">
              {currentUser?.clinicLogo ? (
                <img 
                  src={currentUser.clinicLogo} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-xl object-cover border border-amber-200 bg-white shrink-0 shadow-xs" 
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">
                  {currentUser?.clinicName || currentUser?.businessName || 'Cửa hàng Pet Shop'}
                </p>
                {currentUser?.phone && (
                  <p className="text-[10px] text-amber-800 truncate font-semibold">
                    Hotline: {currentUser.phone}
                  </p>
                )}
              </div>
            </div>

            {currentUser?.clinicAddress && (
              <p className="text-[11px] text-slate-600 flex items-start gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{currentUser.clinicAddress}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-1 pt-1 border-t border-amber-100">
              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                🛍️ Pet Shop
              </span>
              {currentUser?.hasSpa && (
                <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded">
                  ✂️ Dịch vụ Spa
                </span>
              )}
              {currentUser?.hasPetHotel && (
                <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded">
                  🏨 Trông giữ Hotel
                </span>
              )}
            </div>
          </div>
        </div>
      ) : currentUser?.userType === 'spa' ? (
        /* Spa Card */
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-rose-600" />
              <span>Cơ sở Spa & Pet Hotel</span>
            </h3>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded-full">
              Quản lý
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-xs space-y-2">
            <p className="font-bold text-slate-900 truncate">
              {currentUser?.clinicName || currentUser?.businessName || 'Cơ sở Spa Thú Cưng'}
            </p>
            {currentUser?.clinicAddress && (
              <p className="text-[11px] text-slate-600 flex items-start gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{currentUser.clinicAddress}</span>
              </p>
            )}
          </div>
        </div>
      ) : currentUser ? (
        /* Pet Owner: Thú cưng của tôi */
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Thú cưng của tôi</span>
              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded-full font-bold">
                {pets.length}
              </span>
            </h3>
            <button
              onClick={onOpenAddPet}
              aria-label="Thêm thú cưng"
              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => onSelectPet(pet)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
              >
                <img
                  src={pet.avatar}
                  alt={pet.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                    {pet.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {pet.breed}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {pet.age} · {pet.gender === 'male' ? 'Đực' : 'Cái'}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={onOpenAddPet}
              className="w-full py-2 px-3 border border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm thú cưng mới</span>
            </button>
          </div>
        </div>
      ) : (
        /* Guest prompt */
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 text-center space-y-2.5">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-lg">
            🐾
          </div>
          <h4 className="text-xs font-bold text-slate-900">
            Bạn chưa đăng nhập
          </h4>
          <p className="text-[11px] text-slate-500 leading-tight">
            Đăng nhập hoặc đăng ký tài khoản Chủ nuôi / Bác sĩ thú y để tham gia trọn vẹn.
          </p>
          <button
            onClick={onOpenAuth}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập / Đăng ký</span>
          </button>
        </div>
      )}

      {/* Promotional / Volunteer Card matching screenshot */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 p-4 border border-rose-200/60 shadow-xs">
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full inline-block mb-1.5">
            Cộng đồng cứu trợ
          </span>
          <h4 className="text-sm font-extrabold text-slate-900 leading-snug mb-1">
            Vì một thế giới tốt đẹp hơn cho thú cưng
          </h4>
          <p className="text-[11px] text-slate-600 mb-3">
            Chung tay bảo trợ, tiêm phòng và tìm mái ấm yêu thương cho các bé cơ nhỡ.
          </p>
          <button
            onClick={() => setActiveNavTab('adoption')}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Tham gia ngay</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
