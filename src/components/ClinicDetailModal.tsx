import React from 'react';
import { X, Star, MapPin, Phone, Clock, ShieldCheck, Heart, Calendar, Mail, Stethoscope, Building2 } from 'lucide-react';
import { ClinicReview, ToplistPlace } from '../types';

interface ClinicDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicReview | null;
  onOpenBooking?: (clinic: ClinicReview) => void;
}

export const ClinicDetailModal: React.FC<ClinicDetailModalProps> = ({
  isOpen,
  onClose,
  clinic,
  onOpenBooking,
}) => {
  if (!isOpen || !clinic) return null;

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

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Clinic Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-blue-50/70">
          <div className="flex items-center gap-3">
            {clinic.clinicLogo ? (
              <img 
                src={clinic.clinicLogo} 
                alt={clinic.clinicName} 
                className="w-11 h-11 rounded-xl object-cover border border-blue-200 bg-white shadow-xs" 
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{clinic.clinicName}</h3>
              <p className="text-[11px] text-slate-500">{clinic.category} · {clinic.city}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Rating */}
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
            <span className="flex items-center gap-1 font-bold text-amber-600 text-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{clinic.rating} / 5.0</span>
            </span>
            <span className="text-[11px] text-amber-800">
              ({clinic.reviewsCount} đánh giá đã xác minh trên VetTop)
            </span>
          </div>

          {/* Email badge for doctor/clinic */}
          {clinic.email && (
            <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center gap-2 text-xs text-blue-900">
              <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <div className="text-[11px]">
                <span className="text-slate-600 font-semibold">Email nhận đặt lịch bác sĩ: </span>
                <span className="font-bold text-blue-700">{clinic.email}</span>
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{clinic.address || '154 Cách Mạng Tháng 8, Q. Cẩm Lệ, Đà Nẵng'}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Hotline tiếp nhận: {clinic.phone || '0236 3889 999'}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Giờ mở cửa: 07:30 - 21:00 hàng ngày (Cấp cứu trực ban xuyên đêm)</span>
            </p>
            {clinic.doctorName && (
              <p className="flex items-center gap-2 text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                <Stethoscope className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Bác sĩ phụ trách: {clinic.doctorName}</span>
              </p>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
            <h5 className="font-bold text-slate-800">Dịch vụ nổi bật tại cơ sở:</h5>
            <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
              <li>Khám và điều trị nội khoa, truyền dịch, thở oxy</li>
              <li>Phẫu thuật triệt sản, mổ đẻ, kết hợp xương thẩm mỹ</li>
              <li>Tiêm phòng vắc-xin 4 bệnh mèo, 7 bệnh chó, ngừa dại nhập khẩu</li>
              <li>Xét nghiệm máu, siêu âm màu 4D, chụp X-quang kỹ thuật số</li>
              <li>Spa tắm sấy, cắt tỉa lông tạo kiểu nghệ thuật</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                alert(`Đã lưu ${clinic.clinicName} vào danh sách yêu thích!`);
              }}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              Lưu cơ sở này
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-200/70 hover:bg-slate-300/80 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Đóng
              </button>
              
              <button
                onClick={() => {
                  onClose();
                  if (onOpenBooking) onOpenBooking(clinic);
                }}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Đặt lịch khám</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
