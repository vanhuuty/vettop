import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Bookmark, 
  Search, 
  Building2, 
  ShoppingBag, 
  Scissors, 
  Hotel,
  ShieldCheck,
  Calendar,
  Mail,
  Stethoscope,
  Sparkles,
  Tag
} from 'lucide-react';
import { ToplistPlace } from '../types';

interface ToplistViewProps {
  places: ToplistPlace[];
  onToggleSavePlace: (placeId: string) => void;
  onOpenClinicDetails: (place: ToplistPlace) => void;
  onOpenBooking?: (place: ToplistPlace) => void;
}

export const ToplistView: React.FC<ToplistViewProps> = ({
  places,
  onToggleSavePlace,
  onOpenClinicDetails,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinic' | 'petshop' | 'spa' | 'hotel'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất cả dịch vụ', icon: Trophy, count: places.length },
    { id: 'clinic', label: 'Phòng khám thú y', icon: Building2, count: places.filter(p => p.category === 'clinic').length },
    { id: 'petshop', label: 'Petshop phụ kiện', icon: ShoppingBag, count: places.filter(p => p.category === 'petshop' || p.hasPetShop).length },
    { id: 'spa', label: 'Spa & Grooming', icon: Scissors, count: places.filter(p => p.category === 'spa' || p.hasSpa).length },
    { id: 'hotel', label: 'Pet Hotel khách sạn thú cưng', icon: Hotel, count: places.filter(p => p.category === 'hotel' || p.hasPetHotel).length },
  ];

  const filteredPlaces = places.filter((p) => {
    if (activeCategory !== 'all') {
      const match =
        p.category === activeCategory ||
        (activeCategory === 'petshop' && p.hasPetShop) ||
        (activeCategory === 'spa' && p.hasSpa) ||
        (activeCategory === 'hotel' && p.hasPetHotel);
      if (!match) return false;
    }
    if (selectedCity !== 'all' && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) || 
        p.address.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q) ||
        (p.doctorName && p.doctorName.toLowerCase().includes(q))
      );
    }
    return true;
  }).sort((a, b) => {
    if (a.isRealRegistered && !b.isRealRegistered) return -1;
    if (!a.isRealRegistered && b.isRealRegistered) return 1;
    return 0;
  });

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
          <Building2 className="w-64 h-64" />
        </div>
        <div className="max-w-xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4" />
            <span>Toplist Đánh Giá Thú Cưng Độc Lập</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Địa điểm uy tín & <br /> Dịch vụ thú cưng được cộng đồng bình chọn
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-md">
            Đánh giá khách quan các Phòng khám Thú Y, Petshop dinh dưỡng, Spa làm đẹp & Khách sạn thú cưng 5 sao. Hỗ trợ đặt lịch hẹn trực tuyến gửi email tức thời đến bác sĩ phụ trách.
          </p>
        </div>
      </div>

      {/* Filter Category & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3.5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên cơ sở, bác sĩ, petshop, quận, địa chỉ..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-amber-400 transition-all"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full sm:w-auto text-xs font-bold bg-slate-100 text-slate-700 rounded-xl px-3 py-2 border-none outline-hidden cursor-pointer shrink-0"
          >
            <option value="all">Tất cả tỉnh thành</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Huế">Huế</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image banner with Clinic Logo Overlay */}
              <div className="relative h-44 bg-slate-100 overflow-hidden group">
                {place.imageUrl ? (
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
                    VetTop Place
                  </div>
                )}
                
                {/* City Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-800 shadow-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{place.city}</span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => onToggleSavePlace(place.id)}
                  aria-label="Lưu địa điểm"
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-amber-600 transition-colors shadow-xs"
                >
                  <Bookmark className={`w-4 h-4 ${place.isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>

                {/* Clinic Official Logo Badge Overlay */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/20 text-white shadow-md">
                  {place.logoUrl ? (
                    <img 
                      src={place.logoUrl} 
                      alt="Logo" 
                      className="w-7 h-7 rounded-lg object-cover bg-white shrink-0" 
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      VT
                    </div>
                  )}
                  <div className="leading-tight">
                    <span className="text-[10px] text-slate-300 block uppercase font-bold tracking-wider">
                      {place.category === 'clinic' ? 'Phòng khám thú y' : 
                       place.category === 'petshop' ? 'Petshop dinh dưỡng' : 
                       place.category === 'spa' ? 'Spa Grooming' : 'Pet Hotel lưu chuồng'}
                    </span>
                    <span className="text-xs font-bold text-white truncate max-w-[170px] block">
                      {place.doctorName || 'Cơ sở chính thức'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        {place.name}
                      </h3>
                      {place.isRealRegistered && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                          ✓ Đã xác minh
                        </span>
                      )}
                    </div>
                    {/* Multi-service chips */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {place.category === 'clinic' && (
                        <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded">
                          🩺 Thú y
                        </span>
                      )}
                      {(place.category === 'petshop' || place.hasPetShop) && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                          🛍️ Kèm Pet Shop
                        </span>
                      )}
                      {(place.category === 'spa' || place.hasSpa) && (
                        <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded">
                          ✂️ Kèm Spa
                        </span>
                      )}
                      {(place.category === 'hotel' || place.hasPetHotel) && (
                        <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded">
                          🏨 Kèm Hotel
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-extrabold text-xs shrink-0 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{place.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{place.address}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">{place.phone}</span>
                  </p>
                  {place.priceRange && (
                    <p className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      {place.priceRange}
                    </p>
                  )}
                </div>

                {/* Email Doctor Badge */}
                {place.email && (
                  <p className="text-[11px] text-blue-700 bg-blue-50/80 px-2 py-1 rounded-lg flex items-center gap-1.5 font-medium border border-blue-100">
                    <Mail className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="truncate">Email nhận lịch: <b>{place.email}</b></span>
                  </p>
                )}

                {/* Services Tags */}
                {place.services && place.services.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {place.services.slice(0, 3).map((service, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {place.services.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded-md">
                        +{place.services.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-4 pb-4 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">
                {place.reviewsCount} đánh giá thực tế
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenClinicDetails(place)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => {
                    if (onOpenBooking) onOpenBooking(place);
                    else onOpenClinicDetails(place);
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 active:scale-98"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Đặt lịch khám</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
