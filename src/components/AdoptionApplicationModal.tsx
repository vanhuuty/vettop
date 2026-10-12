import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User as UserIcon,
  Home as HomeIcon,
  Heart
} from 'lucide-react';
import { AdoptionDetails, User } from '../types';

interface AdoptionApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  adoptionPet: AdoptionDetails | null;
  currentUser: User | null;
  onSubmitApplication: (applicationData: {
    petName: string;
    applicantName: string;
    applicantPhone: string;
    applicantEmail: string;
    applicantCity: string;
    experienceYears: string;
    housingType: string;
    message: string;
  }) => void;
}

export const AdoptionApplicationModal: React.FC<AdoptionApplicationModalProps> = ({
  isOpen,
  onClose,
  adoptionPet,
  currentUser,
  onSubmitApplication,
}) => {
  if (!isOpen || !adoptionPet) return null;

  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantPhone, setApplicantPhone] = useState('0912 345 678');
  const [applicantEmail, setApplicantEmail] = useState('minh.nguyen@vettop.vn');
  const [applicantCity, setApplicantCity] = useState(currentUser?.location || 'Đà Nẵng');
  const [experienceYears, setExperienceYears] = useState('Đã nuôi thú cưng trên 2 năm');
  const [housingType, setHousingType] = useState('Chung cư khép kín an toàn (có lưới ban công)');
  const [message, setMessage] = useState(
    `Chào ${adoptionPet.ownerName}, mình rất yêu mến bé ${adoptionPet.petName} và có không gian sống thoải mái. Mình cam kết chăm sóc bé chu đáo, tiêm phòng định kỳ và cập nhật hình ảnh thường xuyên.`
  );
  const [committed, setCommitted] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!committed) return;

    onSubmitApplication({
      petName: adoptionPet.petName,
      applicantName,
      applicantPhone,
      applicantEmail,
      applicantCity,
      experienceYears,
      housingType,
      message,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Đơn xin nhận nuôi thú cưng
              </h3>
              <p className="text-[11px] text-slate-500">
                Gửi yêu cầu tới người bảo trợ: {adoptionPet.ownerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Gửi đơn nhận nuôi thành công!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Thông tin của bạn đã được chuyển tới <span className="font-bold text-slate-900">{adoptionPet.ownerName}</span>. Người bảo trợ sẽ sớm liên hệ lại với bạn qua số điện thoại hoặc tin nhắn trên VetTop.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Pet Quick Summary Card */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <img
                src={adoptionPet.photoUrl}
                alt={adoptionPet.petName}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-rose-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Bé {adoptionPet.petName}
                  </h4>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.2 rounded-sm">
                    {adoptionPet.gender === 'male' ? 'Đực' : 'Cái'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {adoptionPet.breed} · {adoptionPet.age}
                </p>
                <p className="text-[11px] text-slate-400">
                  Khu vực: {adoptionPet.city}
                </p>
              </div>
            </div>

            {/* Applicant details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Họ và tên của bạn:
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Số điện thoại Zalo / Gọi:
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Email liên hệ:
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Tỉnh / Thành phố hiện tại:
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantCity}
                    onChange={(e) => setApplicantCity(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Kinh nghiệm chăm sóc thú cưng:
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden"
                >
                  <option value="Chưa từng nuôi nhưng đã tìm hiểu kỹ">Chưa từng nuôi nhưng đã tìm hiểu kỹ</option>
                  <option value="Đã từng nuôi trước đây">Đã từng nuôi trước đây</option>
                  <option value="Đang nuôi thú cưng hiện tại">Đang nuôi thú cưng hiện tại</option>
                  <option value="Đã nuôi thú cưng trên 2 năm">Đã nuôi thú cưng trên 2 năm kinh nghiệm</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Điều kiện chỗ ở / Không gian sinh hoạt:
                </label>
                <input
                  type="text"
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value)}
                  placeholder="Nhà phố có sân, chung cư có rào chắn..."
                  className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Lời nhắn gửi người bảo trợ & Cam kết:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-rose-400 resize-none"
                />
              </div>

              {/* Adoption Pledge */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={committed}
                  onChange={(e) => setCommitted(e.target.checked)}
                  className="mt-0.5 text-rose-600 rounded-sm"
                />
                <span className="text-[11px] text-amber-900 leading-snug">
                  Tôi cam kết nhận nuôi vì tình yêu thương, không vì mục đích thương mại, không thả rông, tiêm phòng định kỳ và chịu trách nhiệm chăm sóc bé suốt đời.
                </span>
              </label>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={!committed}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-500/20 flex items-center gap-1.5 transition-all"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Gửi đơn nhận nuôi</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
