import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Stethoscope, 
  Building2, 
  Send, 
  ShieldCheck, 
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { ToplistPlace, User, AppointmentBooking } from '../types';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ToplistPlace | null;
  allClinics: ToplistPlace[];
  currentUser: User | null;
  onBookingSuccess: (booking: AppointmentBooking) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  clinic,
  allClinics,
  currentUser,
  onBookingSuccess,
}) => {
  if (!isOpen) return null;

  // Selected clinic state
  const availableClinics = allClinics.filter((p) => p.category === 'clinic' || p.category === 'spa' || p.category === 'hotel');
  const [selectedClinicId, setSelectedClinicId] = useState<string>(clinic ? clinic.id : (availableClinics[0]?.id || 'place-1'));
  const currentSelectedClinic = allClinics.find((p) => p.id === selectedClinicId) || clinic || availableClinics[0];

  // Form Fields
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'khachhang@gmail.com');
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat' | 'other'>('cat');
  const [petAgeWeight, setPetAgeWeight] = useState('');
  
  // Date & Time
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [appointmentDate, setAppointmentDate] = useState(tomorrowStr);
  const [appointmentTime, setAppointmentTime] = useState('09:30');
  const [serviceType, setServiceType] = useState('Khám tổng quát & Tư vấn sức khỏe');
  const [doctorPreference, setDoctorPreference] = useState(currentSelectedClinic?.doctorName || 'Bác sĩ trưởng cơ sở');
  const [symptoms, setSymptoms] = useState('');

  // Email sent confirmation step
  const [createdBooking, setCreatedBooking] = useState<AppointmentBooking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (clinic) {
      setSelectedClinicId(clinic.id);
      if (clinic.doctorName) setDoctorPreference(clinic.doctorName);
    }
  }, [clinic]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSubmitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !petName.trim()) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và tên bé thú cưng!');
      return;
    }

    setIsSubmitting(true);

    // Doctor's registered email
    const docEmail = currentSelectedClinic?.email || `${currentSelectedClinic?.id}@vettop.vn`;

    const newBooking: AppointmentBooking = {
      id: `VET-BOOK-${Math.floor(100000 + Math.random() * 900000)}`,
      clinicId: currentSelectedClinic?.id || 'clinic-default',
      clinicName: currentSelectedClinic?.name || 'Phòng khám thú y',
      clinicLogo: currentSelectedClinic?.logoUrl || currentSelectedClinic?.imageUrl,
      doctorName: doctorPreference,
      doctorEmail: docEmail,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      petName: petName.trim(),
      petSpecies: petSpecies === 'dog' ? 'Chó' : petSpecies === 'cat' ? 'Mèo' : 'Thú cưng khác',
      serviceType,
      appointmentDate,
      appointmentTime,
      symptoms: symptoms.trim() || 'Khám kiểm tra định kỳ',
      status: 'confirmed',
      createdAt: new Date().toLocaleString('vi-VN'),
    };

    // Simulate instant secure email sending to doctor's registered email
    setTimeout(() => {
      setIsSubmitting(false);
      setCreatedBooking(newBooking);
      onBookingSuccess(newBooking);
    }, 700);
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '14:00', '14:30', '15:00', '15:30', '16:30', '17:30', '18:30', '19:30'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* If booking is finished, show Email Sent Confirmation View */}
        {createdBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Đặt Lịch Khám Thành Công!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Hệ thống VetTop đã tự động chuyển tiếp hồ sơ và gửi email thông báo trực tiếp đến hộp thư của Bác sĩ / Phòng khám.
              </p>
            </div>

            {/* Email Dispatch Simulated Card */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-lg space-y-4 border border-slate-800 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block">Email gửi tới Bác sĩ tiếp nhận</span>
                    <span className="text-[11px] text-slate-400">Trạng thái: <span className="text-emerald-400 font-semibold">Đã gửi thành công (Delivered)</span></span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SMTP 250 OK
                </span>
              </div>

              {/* Email Headers */}
              <div className="bg-slate-950/60 rounded-xl p-3.5 space-y-1.5 font-mono text-[11px] border border-slate-800/80">
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 w-16 shrink-0">Từ:</span>
                  <span className="text-slate-300">VetTop System &lt;datlich@vettop.vn&gt;</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 w-16 shrink-0 font-bold text-amber-400">Gửi đến:</span>
                  <span className="text-amber-300 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded">
                    {createdBooking.doctorEmail}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 w-16 shrink-0">CC:</span>
                  <span className="text-slate-400">{createdBooking.customerEmail} (Chủ nuôi)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 w-16 shrink-0">Tiêu đề:</span>
                  <span className="text-white font-semibold">
                    [VetTop Booking] Lịch khám mới #{createdBooking.id} - Khách {createdBooking.customerName} (Bé {createdBooking.petName})
                  </span>
                </div>
              </div>

              {/* Email Content Preview */}
              <div className="bg-white text-slate-800 rounded-xl p-4 space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    {createdBooking.clinicLogo && (
                      <img 
                        src={createdBooking.clinicLogo} 
                        alt="Logo" 
                        className="w-8 h-8 rounded-lg object-cover border border-slate-200" 
                      />
                    )}
                    <div>
                      <p className="font-bold text-xs text-slate-900">{createdBooking.clinicName}</p>
                      <p className="text-[10px] text-slate-500">Phụ trách: {createdBooking.doctorName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Mã: {createdBooking.id}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">KHÁCH HÀNG</span>
                    <span className="font-bold text-slate-800">{createdBooking.customerName}</span>
                    <span className="text-[11px] text-slate-600 block">{createdBooking.customerPhone}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">THÚ CƯNG</span>
                    <span className="font-bold text-slate-800">{createdBooking.petName}</span>
                    <span className="text-[11px] text-slate-600 block">{createdBooking.petSpecies}</span>
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-lg space-y-1 text-xs">
                  <div className="flex items-center justify-between text-amber-900 font-bold">
                    <span>Thời gian hẹn:</span>
                    <span>{createdBooking.appointmentTime} - Ngày {createdBooking.appointmentDate}</span>
                  </div>
                  <div className="text-[11px] text-amber-800">
                    <span className="font-semibold">Dịch vụ:</span> {createdBooking.serviceType}
                  </div>
                  {createdBooking.symptoms && (
                    <div className="text-[11px] text-slate-600 pt-0.5 border-t border-amber-200/50">
                      <span className="font-semibold text-slate-700">Triệu chứng/Ghi chú:</span> {createdBooking.symptoms}
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 text-center italic">
                  * Bác sĩ hoặc nhân viên phòng khám sẽ liên hệ qua điện thoại trước 30 phút để xác nhận đón tiếp bé.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(createdBooking.id);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Đã sao chép mã' : 'Sao chép mã hẹn'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          </div>
        ) : (
          /* Form Step */
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Đặt Lịch Khám & Chăm Sóc Thú Cưng
                  </h3>
                  <p className="text-[11px] text-blue-100">
                    Gửi thông báo lịch khám trực tiếp về email bác sĩ phụ trách
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Clinic Banner & Registered Email Highlight */}
              <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-100 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {currentSelectedClinic?.logoUrl || currentSelectedClinic?.imageUrl ? (
                      <img 
                        src={currentSelectedClinic.logoUrl || currentSelectedClinic.imageUrl} 
                        alt="Logo phòng khám" 
                        className="w-12 h-12 rounded-xl object-cover border border-blue-200 shrink-0 bg-white shadow-xs" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {currentSelectedClinic?.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{currentSelectedClinic?.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Clinic Select dropdown if user wants to change clinic */}
                  <div className="w-full sm:w-auto shrink-0">
                    <select
                      value={selectedClinicId}
                      onChange={(e) => setSelectedClinicId(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-700 outline-hidden focus:border-blue-500 shadow-xs cursor-pointer"
                    >
                      {availableClinics.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.city})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email Highlight Alert */}
                <div className="bg-white/90 rounded-xl p-2.5 border border-blue-200/80 flex items-center gap-2.5 text-xs text-blue-900">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 text-[11px]">
                    <span className="font-semibold text-slate-700">Email bác sĩ nhận lịch: </span>
                    <span className="font-bold text-blue-700 underline">
                      {currentSelectedClinic?.email || `${currentSelectedClinic?.id}@vettop.vn`}
                    </span>
                    <span className="text-slate-500 block sm:inline sm:ml-1">
                      (Bác sĩ phụ trách: {currentSelectedClinic?.doctorName || 'BS. Chuyên khoa'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 1: Customer Information */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. Thông tin người đặt hẹn</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Họ và tên chủ nuôi *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Số điện thoại liên hệ *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Ví dụ: 0905 123 456"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Email nhận xác nhận *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pet Information */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Thông tin bé thú cưng
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Tên của bé *
                    </label>
                    <input
                      type="text"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="Ví dụ: Miu Miu, Corgi Bobby"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Loài thú cưng
                    </label>
                    <select
                      value={petSpecies}
                      onChange={(e) => setPetSpecies(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    >
                      <option value="cat">Mèo cưng</option>
                      <option value="dog">Chó cưng</option>
                      <option value="other">Thú cưng khác (Hamster, Thỏ...)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Tuổi / Cân nặng ước tính
                    </label>
                    <input
                      type="text"
                      value={petAgeWeight}
                      onChange={(e) => setPetAgeWeight(e.target.value)}
                      placeholder="Ví dụ: 1 tuổi · 4.5kg"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Appointment Date & Time & Service */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Thời gian hẹn & Dịch vụ mong muốn
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Ngày hẹn khám *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Khung giờ hẹn *</span>
                    </label>
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Loại dịch vụ yêu cầu
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    >
                      <option value="Khám tổng quát & Tư vấn sức khỏe">Khám tổng quát & Tư vấn sức khỏe</option>
                      <option value="Tiêm phòng vắc-xin định kỳ">Tiêm phòng vắc-xin định kỳ</option>
                      <option value="Cấp cứu nội trú 24/7">Cấp cứu nội trú 24/7</option>
                      <option value="Phẫu thuật triệt sản an toàn">Phẫu thuật triệt sản an toàn</option>
                      <option value="Khám da liễu, viêm tai, rụng lông">Khám da liễu, viêm tai, rụng lông</option>
                      <option value="Xét nghiệm máu & Siêu âm 4D">Xét nghiệm máu & Siêu âm 4D</option>
                      <option value="Spa tắm sấy, cắt tỉa lông tạo kiểu">Spa tắm sấy, cắt tỉa lông tạo kiểu</option>
                      <option value="Pet Hotel - Đặt phòng lưu trú">Pet Hotel - Đặt phòng lưu trú</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Bác sĩ / Chuyên viên mong muốn
                    </label>
                    <input
                      type="text"
                      value={doctorPreference}
                      onChange={(e) => setDoctorPreference(e.target.value)}
                      placeholder="Ví dụ: BS. Nguyễn Huy Hoàng hoặc BS bất kỳ"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Mô tả triệu chứng / Ghi chú đặc biệt cho bác sĩ
                  </label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Ví dụ: Bé bị bỏ ăn 2 hôm nay, có biểu hiện nôn khan, nhát người..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Không mất phí hủy lịch · Xác nhận tự động qua email</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang gửi email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi lịch khám tới bác sĩ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
