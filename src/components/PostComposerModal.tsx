import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  HeartHandshake, 
  Star, 
  BookOpen, 
  MessageCircleQuestion, 
  MapPin, 
  Phone, 
  Check, 
  Upload,
  AlertCircle,
  Building2,
  Users2
} from 'lucide-react';
import { User, Post, AdoptionDetails, ClinicReview } from '../types';
import adoptionCatImg from '../assets/images/pet_adoption_cat_1791795567564.jpg';
import adoptionDogImg from '../assets/images/pet_adoption_dog_1791795580053.jpg';
import clinicImg from '../assets/images/veterinary_clinic_1791795590931.jpg';

interface PostComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  initialType?: 'general' | 'adoption' | 'experience' | 'review' | 'qa';
  initialGroupName?: string;
  onAddPost: (postData: Partial<Post>) => void;
}

export const PostComposerModal: React.FC<PostComposerModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialType = 'general',
  initialGroupName = '',
  onAddPost,
}) => {
  if (!isOpen) return null;

  const [postType, setPostType] = useState<'general' | 'adoption' | 'experience' | 'review' | 'qa'>(initialType);
  const [content, setContent] = useState('');
  const [location, setLocation] = useState(currentUser?.location || 'Đà Nẵng');
  const [groupName, setGroupName] = useState(initialGroupName);
  
  // Image attachments (supports multiple uploads)
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState('');

  // Adoption specific fields
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cat' | 'other'>('cat');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [city, setCity] = useState(currentUser?.location || 'TP. Hồ Chí Minh');
  const [vaccinated, setVaccinated] = useState(true);
  const [neutered, setNeutered] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [contactPhone, setContactPhone] = useState('0909 888 777');
  const [adoptionFee, setAdoptionFee] = useState('0đ (Miễn phí)');

  // Clinic Review specific fields
  const [clinicName, setClinicName] = useState(currentUser?.clinicName || 'Phòng khám thú y Hòa Vang');
  const [rating, setRating] = useState(5);
  const [clinicAddress, setClinicAddress] = useState(currentUser?.clinicAddress || '154 Cách Mạng Tháng 8, Q. Cẩm Lệ, Đà Nẵng');
  const [clinicLogo, setClinicLogo] = useState<string>(currentUser?.clinicLogo || clinicImg);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setAttachedImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddUrlImage = () => {
    if (customUrl.trim()) {
      setAttachedImages((prev) => [...prev, customUrl.trim()]);
      setCustomUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && postType !== 'adoption') return;

    let adoptionData: AdoptionDetails | undefined = undefined;
    if (postType === 'adoption') {
      const defaultImg = species === 'cat' ? adoptionCatImg : adoptionDogImg;
      adoptionData = {
        petName: petName.trim() || 'Bé Cưng',
        species,
        breed: breed.trim() || (species === 'cat' ? 'Mèo ta / Mèo lai' : 'Chó cỏ / Cún lai'),
        age: age.trim() || '3 tháng tuổi',
        gender,
        city,
        vaccinated,
        neutered,
        urgent,
        contactPhone,
        adoptionFee,
        story: content.trim(),
        healthStatus: vaccinated ? 'Đã tiêm phòng đầy đủ' : 'Chưa tiêm phòng',
        adoptionStatus: 'available',
        ownerId: currentUser?.id || 'guest',
        ownerName: currentUser?.name || 'Ẩn danh',
        photoUrl: attachedImages[0] || defaultImg,
      };
    }

    let clinicReviewData: ClinicReview | undefined = undefined;
    if (postType === 'review') {
      clinicReviewData = {
        clinicName,
        rating,
        reviewsCount: 1,
        city: location,
        category: 'Phòng khám thú y',
        address: clinicAddress,
        clinicLogo: clinicLogo,
      };
    }

    const finalImages: string[] = [...attachedImages];
    if (finalImages.length === 0 && postType === 'adoption') {
      finalImages.push(species === 'cat' ? adoptionCatImg : adoptionDogImg);
    }

    onAddPost({
      content: content.trim() || `[TÌM CHỦ NHẬN NUÔI] Tìm mái ấm yêu thương cho bé ${petName}`,
      type: postType,
      location,
      groupName: groupName.trim() || undefined,
      images: finalImages.length > 0 ? finalImages : undefined,
      adoption: adoptionData,
      clinicReview: clinicReviewData,
    });

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900">
              {postType === 'adoption'
                ? 'Đăng tin tìm chủ nhận nuôi thú cưng'
                : postType === 'experience'
                ? 'Chia sẻ kinh nghiệm chăm sóc thú cưng'
                : postType === 'review'
                ? 'Đánh giá phòng khám & dịch vụ thú y'
                : 'Tạo bài viết mới'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Post Type Selector Pills */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Chọn hình thức bài viết
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'general', label: 'Bảng tin chung', icon: ImageIcon },
                { id: 'adoption', label: 'Tìm chủ nhận nuôi', icon: HeartHandshake },
                { id: 'experience', label: 'Chia sẻ kinh nghiệm', icon: BookOpen },
                { id: 'review', label: 'Đánh giá phòng khám', icon: Star },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = postType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPostType(item.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-center text-[11px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location & Optional Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Khu vực / Tỉnh thành:
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Đà Nẵng, Hà Nội, TP.HCM..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Nhóm cộng đồng (Không bắt buộc):
              </label>
              <div className="relative">
                <Users2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Hội Yêu Mèo VN, CLB Corgi..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Adoption Specific Form */}
          {postType === 'adoption' && (
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200/80 space-y-3">
              <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-rose-600" />
                <span>Hồ sơ thú cưng cần tìm chủ yêu thương:</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Tên bé *</label>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Bé Bông, Bánh Mì..."
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Loài</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as any)}
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  >
                    <option value="cat">Mèo cưng</option>
                    <option value="dog">Chó cưng</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Giống</label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="ALN, Corgi, Mèo ta..."
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Độ tuổi</label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="4 tháng, 1 tuổi..."
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Giới tính</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  >
                    <option value="female">Cái (Female)</option>
                    <option value="male">Đực (Male)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">SĐT liên hệ</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phí nhận nuôi</label>
                  <input
                    type="text"
                    value={adoptionFee}
                    onChange={(e) => setAdoptionFee(e.target.value)}
                    placeholder="0đ (Miễn phí)"
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vaccinated}
                    onChange={(e) => setVaccinated(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-0"
                  />
                  <span>Đã tiêm vắc-xin</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={neutered}
                    onChange={(e) => setNeutered(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-0"
                  />
                  <span>Đã triệt sản</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-rose-700 font-bold">
                  <input
                    type="checkbox"
                    checked={urgent}
                    onChange={(e) => setUrgent(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-0"
                  />
                  <span>Cứu hộ khẩn cấp</span>
                </label>
              </div>
            </div>
          )}

          {/* Clinic Review Specific Form */}
          {postType === 'review' && (
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Thông tin phòng khám / dịch vụ thú y được đánh giá:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Tên phòng khám / Petshop:</label>
                  <input
                    type="text"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Đánh giá sao:</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 sao - Rất hài lòng)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 sao - Tốt)</option>
                    <option value={3}>⭐⭐⭐ (3 sao - Trung bình)</option>
                    <option value={2}>⭐⭐ (2 sao - Chưa tốt)</option>
                    <option value={1}>⭐ (1 sao - Kém)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Địa chỉ cơ sở:</label>
                <input
                  type="text"
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                />
              </div>

              {/* Logo phòng khám đính kèm */}
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-200/80">
                <div className="flex items-center gap-2">
                  <img src={clinicLogo} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                  <span className="text-[11px] text-slate-700 font-semibold">Logo cơ sở đính kèm</span>
                </div>
                <button
                  type="button"
                  onClick={() => setClinicLogo(clinicLogo === clinicImg ? 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=150&auto=format&fit=crop&q=80' : clinicImg)}
                  className="text-[10px] text-blue-600 font-bold hover:underline"
                >
                  Đổi mẫu logo
                </button>
              </div>
            </div>
          )}

          {/* Content Textarea */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Nội dung bài viết:
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'adoption'
                  ? 'Mô tả tính cách của bé, thói quen ăn uống, hoàn cảnh cứu hộ và yêu cầu đối với người nhận nuôi...'
                  : postType === 'experience'
                  ? 'Chia sẻ chi tiết kinh nghiệm chăm sóc, chế độ ăn, cách xử lý bệnh, đồ dùng nên mua...'
                  : postType === 'review'
                  ? 'Chia sẻ chi tiết trải nghiệm khám chữa bệnh, tay nghề bác sĩ, vệ sinh phòng khám và chi phí...'
                  : 'Chia sẻ hình ảnh hoặc câu chuyện của bé thú cưng hôm nay...'
              }
              className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-blue-400 transition-all resize-none"
            />
          </div>

          {/* Image & Logo Upload Area */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>Hình ảnh bài viết & Logo ({attachedImages.length})</span>
              </span>

              {/* Upload Button */}
              <label className="cursor-pointer px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh lên</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Uploaded Images Thumbnails */}
            {attachedImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 h-20 bg-slate-100">
                    <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Presets for Demo */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold shrink-0">Chọn nhanh mẫu:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
                <button
                  type="button"
                  onClick={() => setAttachedImages((prev) => [...prev, adoptionCatImg])}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium whitespace-nowrap"
                >
                  + Mèo con
                </button>
                <button
                  type="button"
                  onClick={() => setAttachedImages((prev) => [...prev, adoptionDogImg])}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium whitespace-nowrap"
                >
                  + Corgi
                </button>
                <button
                  type="button"
                  onClick={() => setAttachedImages((prev) => [...prev, clinicImg])}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium whitespace-nowrap"
                >
                  + Phòng khám
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-98"
            >
              Đăng bài ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
