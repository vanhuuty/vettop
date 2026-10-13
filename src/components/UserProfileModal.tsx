import React from 'react';
import { 
  X, 
  MapPin, 
  PawPrint, 
  MessageCircle, 
  UserPlus, 
  Check, 
  ShieldCheck, 
  Heart, 
  Building2, 
  Stethoscope, 
  Phone, 
  Award, 
  Lock 
} from 'lucide-react';
import { User, Pet } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  currentUser: User | null;
  userPets?: Pet[];
  onSendFriendRequest: (userId: string) => void;
  onOpenChatWith: (user: User) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  currentUser,
  userPets = [],
  onSendFriendRequest,
  onOpenChatWith,
}) => {
  if (!isOpen || !user) return null;

  // Listen for Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isSelf = currentUser ? user.id === currentUser.id : false;
  const isFriend = Boolean(user.isFriend);
  const isVet = user.userType === 'vet';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover banner */}
        <div className={`h-28 relative shrink-0 ${
          isVet 
            ? 'bg-gradient-to-r from-indigo-700 via-blue-700 to-teal-600'
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500'
        }`}>
          {/* Prominent, high-contrast Close Button in top right */}
          <button
            onClick={onClose}
            aria-label="Đóng hồ sơ"
            title="Đóng (Esc)"
            className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile info section */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar and Main Action */}
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md bg-white"
              />
              {isVet && (
                <span className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-sm ring-2 ring-white" title="Bác sĩ thú y chính quy">
                  🩺
                </span>
              )}
            </div>

            {!isSelf && (
              <div className="flex items-center gap-2">
                {/* Chat Action - Enforces friendship */}
                <button
                  onClick={() => {
                    onOpenChatWith(user);
                    onClose();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isFriend
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={isFriend ? 'Nhắn tin trò chuyện' : 'Cần kết bạn trước khi nhắn tin'}
                >
                  {isFriend ? (
                    <MessageCircle className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4 text-amber-500" />
                  )}
                  <span>{isFriend ? 'Nhắn tin' : 'Nhắn tin (Khóa)'}</span>
                </button>

                {/* Friend Button */}
                {isFriend ? (
                  <button
                    onClick={() => onSendFriendRequest(user.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-colors group"
                  >
                    <Check className="w-4 h-4 group-hover:hidden" />
                    <span className="group-hover:hidden">Bạn bè</span>
                    <span className="hidden group-hover:inline">Hủy kết bạn</span>
                  </button>
                ) : user.friendRequestSent ? (
                  <button
                    onClick={() => onSendFriendRequest(user.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    Đã gửi lời mời
                  </button>
                ) : (
                  <button
                    onClick={() => onSendFriendRequest(user.id)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Kết bạn</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Name & Role */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                {user.name}
              </h3>
              {isVet ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Bác sĩ thú y</span>
                </span>
              ) : user.userType === 'petshop' ? (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>🛍️</span>
                  <span>Cửa hàng Pet Shop</span>
                </span>
              ) : user.userType === 'spa' ? (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>✂️</span>
                  <span>Spa & Pet Hotel</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Chủ nuôi thú cưng
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-blue-600">
              {user.role || (isVet ? 'Bác sĩ thú y' : user.userType === 'petshop' ? 'Cửa hàng Pet Shop' : 'Thành viên VetTop')}
            </p>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {user.bio || 'Yêu động vật và mong muốn xây dựng một cộng đồng thú cưng văn minh.'}
            </p>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.location || 'Việt Nam'}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>{user.mutualFriends || 0} bạn chung</span>
            </div>
          </div>

          {/* DYNAMIC SECTION FOR VET OR PET SHOP OR SPA */}
          {(user.clinicName || user.clinicAddress) && (
            <div className={`p-3.5 rounded-xl border space-y-2 mb-4 ${
              isVet ? 'bg-indigo-50/80 border-indigo-200/80' :
              user.userType === 'petshop' ? 'bg-amber-50/80 border-amber-200/80' :
              'bg-rose-50/80 border-rose-200/80'
            }`}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                {isVet && <Building2 className="w-4 h-4 text-indigo-600" />}
                {user.userType === 'petshop' && <span className="text-sm">🛍️</span>}
                {user.userType === 'spa' && <span className="text-sm">✂️</span>}
                <span>
                  {isVet ? 'Thông tin phòng khám phụ trách:' :
                   user.userType === 'petshop' ? 'Thông tin Cửa hàng Pet Shop:' :
                   'Thông tin cơ sở Spa & Hotel:'}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-700 pl-1">
                <p className="font-bold text-slate-900 text-sm">
                  {user.clinicName || user.businessName}
                </p>
                {user.clinicAddress && (
                  <p className="flex items-start gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{user.clinicAddress}</span>
                  </p>
                )}
                {user.phone && (
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Hotline: <span className="font-semibold text-slate-800">{user.phone}</span></span>
                  </p>
                )}
                {user.email && (
                  <p className="text-[11px] text-blue-700">
                    Email nhận lịch: <span className="font-semibold">{user.email}</span>
                  </p>
                )}
                {/* Service badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {isVet && (
                    <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded">
                      🩺 Khám chữa bệnh
                    </span>
                  )}
                  {user.hasPetShop && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                      🛍️ Kèm Pet Shop
                    </span>
                  )}
                  {user.hasSpa && (
                    <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded">
                      ✂️ Kèm Spa Grooming
                    </span>
                  )}
                  {user.hasPetHotel && (
                    <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded">
                      🏨 Kèm Pet Hotel
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PET PASSPORTS LIST FOR OWNER (OR VET'S OWN PETS) */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
              <PawPrint className="w-4 h-4 text-blue-600" />
              <span>Hồ sơ thú cưng đang nuôi ({userPets.length || user.petsCount || 1})</span>
            </h4>

            {userPets.length > 0 ? (
              <div className="space-y-2.5">
                {userPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <img
                      src={pet.avatar}
                      alt={pet.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-900">
                          {pet.name} ({pet.breed})
                        </h5>
                        <span className="text-[11px] text-slate-500">
                          {pet.age} · {pet.gender === 'male' ? 'Đực' : 'Cái'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] mt-1">
                        <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.2 rounded-md font-semibold">
                          {pet.vaccinated ? '✓ Đã tiêm vắc-xin' : 'Chưa tiêm'}
                        </span>
                        <span className="text-blue-700 bg-blue-100/80 px-2 py-0.2 rounded-md font-semibold">
                          {pet.neutered ? '✓ Đã triệt sản' : 'Chưa triệt sản'}
                        </span>
                      </div>
                      {pet.notes && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">
                          "{pet.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                Thành viên nuôi {user.petsCount || 1} thú cưng nhưng chưa chia sẻ chi tiết.
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer with prominent Close button */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-500 truncate mr-2">
            {isVet ? '🩺 Hồ sơ Bác sĩ thú y trên VetTop' : '🐾 Hồ sơ thành viên VetTop'}
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-98"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
