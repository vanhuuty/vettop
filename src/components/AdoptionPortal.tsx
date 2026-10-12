import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Plus, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { AdoptionDetails, User, AdoptionApplication } from '../types';

interface AdoptionPortalProps {
  adoptionPets: AdoptionDetails[];
  currentUser: User | null;
  applications: AdoptionApplication[];
  onOpenApplyModal: (pet: AdoptionDetails) => void;
  onOpenCreateAdoption: () => void;
  onOpenChatWith: (ownerName: string, ownerId: string) => void;
}

export const AdoptionPortal: React.FC<AdoptionPortalProps> = ({
  adoptionPets,
  currentUser,
  applications,
  onOpenApplyModal,
  onOpenCreateAdoption,
  onOpenChatWith,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-applications'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<'all' | 'dog' | 'cat' | 'other'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [filterVaccinated, setFilterVaccinated] = useState(false);
  const [filterNeutered, setFilterNeutered] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);

  // Filter logic
  const filteredPets = adoptionPets.filter((pet) => {
    if (selectedSpecies !== 'all' && pet.species !== selectedSpecies) return false;
    if (selectedCity !== 'all' && !pet.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (filterVaccinated && !pet.vaccinated) return false;
    if (filterNeutered && !pet.neutered) return false;
    if (filterUrgent && !pet.urgent) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        pet.petName.toLowerCase().includes(q) ||
        pet.breed.toLowerCase().includes(q) ||
        pet.city.toLowerCase().includes(q) ||
        pet.story.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Hero Banner for Adoption */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Trạm Nhận Nuôi & Cứu Trợ Thú Cưng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Tìm kiếm người nhận nuôi & <br /> Trao gửi mái ấm yêu thương
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-md mb-4">
            Mỗi bé thú cưng đều xứng đáng có một gia đình tử tế. Kết nối trực tiếp giữa người cứu trợ, trạm tạm trú và những người yêu thú cưng có trách nhiệm.
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenCreateAdoption}
              className="px-4 py-2.5 bg-white text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin tìm chủ cho thú cưng</span>
            </button>
            <button
              onClick={() => setActiveTab('my-applications')}
              className="px-4 py-2.5 bg-rose-700/60 hover:bg-rose-700 text-white text-xs font-bold rounded-xl backdrop-blur-xs transition-colors"
            >
              <span>Đơn nhận nuôi của tôi ({applications.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Tìm kiếm vs Đơn của tôi */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('browse')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'browse'
              ? 'text-rose-600 border-b-2 border-rose-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Danh sách thú cưng cần nhận nuôi ({filteredPets.length})
        </button>
        <button
          onClick={() => setActiveTab('my-applications')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'my-applications'
              ? 'text-rose-600 border-b-2 border-rose-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Đơn xin nhận nuôi đã gửi ({applications.length})
        </button>
      </div>

      {activeTab === 'browse' ? (
        <>
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên thú cưng, giống loài, thành phố..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl outline-hidden focus:border-rose-400 transition-all"
              />
            </div>

            {/* Filter pills & selects */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Species pills */}
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setSelectedSpecies('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedSpecies === 'all'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedSpecies('cat')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedSpecies === 'cat'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  🐱 Mèo cưng
                </button>
                <button
                  onClick={() => setSelectedSpecies('dog')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedSpecies === 'dog'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  🐶 Chó cưng
                </button>
              </div>

              {/* City selector & checkboxes */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-slate-100 text-slate-700 font-semibold rounded-lg px-2.5 py-1.5 border-none outline-hidden cursor-pointer"
                >
                  <option value="all">Tất cả địa điểm</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Huế">Thừa Thiên Huế</option>
                </select>

                <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterVaccinated}
                    onChange={(e) => setFilterVaccinated(e.target.checked)}
                    className="text-rose-600 rounded-sm"
                  />
                  <span>Đã tiêm phòng</span>
                </label>

                <label className="flex items-center gap-1.5 text-rose-600 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterUrgent}
                    onChange={(e) => setFilterUrgent(e.target.checked)}
                    className="text-rose-600 rounded-sm"
                  />
                  <span>Cứu trợ khẩn cấp</span>
                </label>
              </div>
            </div>
          </div>

          {/* Adoption Pets Grid */}
          {filteredPets.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-slate-200/80">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                🐾
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Không tìm thấy thú cưng phù hợp với bộ lọc
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy thử nới lỏng các tiêu chí lọc địa điểm hoặc loài thú cưng để xem nhiều bé hơn.
              </p>
              <button
                onClick={() => {
                  setSelectedSpecies('all');
                  setSelectedCity('all');
                  setFilterVaccinated(false);
                  setFilterNeutered(false);
                  setFilterUrgent(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPets.map((pet, idx) => (
                <div
                  key={`${pet.petName}-${idx}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col"
                >
                  {/* Photo with badges */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden group">
                    <img
                      src={pet.photoUrl}
                      alt={pet.petName}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {pet.urgent && (
                        <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                          Khẩn cấp
                        </span>
                      )}
                      <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {pet.city}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs drop-shadow-md">
                      <span className="font-bold bg-slate-900/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {pet.breed}
                      </span>
                      <span className="font-bold bg-emerald-700/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {pet.adoptionFee || '0đ (Miễn phí)'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-extrabold text-slate-900">
                          Bé {pet.petName}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500">
                          {pet.age} · {pet.gender === 'male' ? 'Đực' : 'Cái'}
                        </span>
                      </div>

                      {/* Health & Status Highlights */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-2.5">
                        <span className={`px-2 py-0.5 rounded-md font-medium ${
                          pet.vaccinated ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {pet.vaccinated ? '✓ Đã tiêm vắc-xin' : 'Chưa tiêm phòng'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md font-medium ${
                          pet.neutered ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {pet.neutered ? '✓ Đã triệt sản' : 'Chưa triệt sản'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {pet.story}
                      </p>
                    </div>

                    {/* Owner & Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500 min-w-0">
                        <p className="font-bold text-slate-800 truncate">
                          Người bảo trợ: {pet.ownerName}
                        </p>
                        <p className="text-slate-400 truncate">
                          ĐT: {pet.contactPhone}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onOpenChatWith(pet.ownerName, pet.ownerId)}
                          aria-label="Nhắn tin"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                          title="Nhắn tin trao đổi"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenApplyModal(pet)}
                          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <HeartHandshake className="w-4 h-4" />
                          <span>Nhận nuôi</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* My Applications Tab */
        <div className="space-y-3">
          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-slate-200/80">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                📋
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Bạn chưa gửi đơn nhận nuôi nào
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Khi bạn thích một bé thú cưng và nhấn "Gửi yêu cầu nhận nuôi", tiến độ xét duyệt sẽ hiển thị tại đây.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors"
              >
                Khám phá thú cưng cần nhận nuôi
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Đang chờ phản hồi
                      </span>
                      <span className="text-xs text-slate-400">{app.createdAt}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Đơn nhận nuôi bé: <span className="text-rose-600">{app.petName}</span>
                    </h4>
                    <p className="text-xs text-slate-600">
                      Người đăng ký: {app.applicantName} · ĐT: {app.applicantPhone} · {app.applicantCity}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      "{app.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => alert(`Đã sao chép mã đơn #${app.id}`)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Mã: #{app.id}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
