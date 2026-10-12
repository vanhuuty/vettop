import React, { useState } from 'react';
import { 
  X, 
  PawPrint, 
  UserPlus, 
  LogIn, 
  CheckCircle2, 
  Stethoscope, 
  Building2, 
  MapPin, 
  Phone, 
  Award, 
  LogOut,
  ShieldCheck,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { User } from '../types';
import { mockUsers, currentUserInitial, clinicImg } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginAsUser: (user: User) => void;
  onRegisterNewUser: (newUser: User, initialPetName?: string, initialPetBreed?: string) => void;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginAsUser,
  onRegisterNewUser,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [userType, setUserType] = useState<'owner' | 'vet'>('owner');

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Đà Nẵng');

  // Pet Owner fields
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');

  // Veterinarian fields
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [specialty, setSpecialty] = useState('Khám chữa bệnh đa khoa & Tiêm chủng');
  const [clinicPhone, setClinicPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [clinicLogo, setClinicLogo] = useState<string>(clinicImg);
  const [customAvatar, setCustomAvatar] = useState<string>('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClinicLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [successMessage, setSuccessMessage] = useState('');

  const sampleAccounts = [
    currentUserInitial,
    ...mockUsers,
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (userType === 'vet' && (!clinicName.trim() || !clinicAddress.trim())) {
      alert('Vui lòng nhập Tên phòng khám và Địa chỉ phòng khám dành cho Bác sĩ thú y!');
      return;
    }

    const isVet = userType === 'vet';

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: isVet && !name.toLowerCase().startsWith('bs.') ? `BS. ${name.trim()}` : name.trim(),
      email: email.trim(),
      avatar: customAvatar || (isVet
        ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'),
      role: isVet ? `Bác sĩ Thú y · ${clinicName.trim()}` : (petName ? `Chủ nuôi bé ${petName}` : 'Yêu thích thú cưng'),
      userType,
      clinicName: isVet ? clinicName.trim() : undefined,
      clinicAddress: isVet ? clinicAddress.trim() : undefined,
      clinicLogo: isVet ? clinicLogo : undefined,
      specialty: isVet ? specialty.trim() : undefined,
      phone: isVet ? clinicPhone.trim() : undefined,
      licenseNumber: isVet ? (licenseNumber.trim() || `VET-${Date.now().toString().slice(-4)}`) : undefined,
      bio: isVet
        ? `Bác sĩ thú y tại ${clinicName.trim()}. Chuyên môn: ${specialty.trim()}. Sẵn sàng tư vấn cho cộng đồng.`
        : `Chào mừng bạn đến với trang cá nhân của mình! Nhà mình nuôi ${petName || 'thú cưng'}.`,
      location,
      petsCount: isVet ? 1 : (petName ? 1 : 0),
      mutualFriends: 0,
    };

    onRegisterNewUser(newUser, isVet ? undefined : petName, isVet ? undefined : petBreed);
    setSuccessMessage(`Đăng ký thành công! Chào mừng ${newUser.name} gia nhập cộng đồng VetTop.`);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = sampleAccounts.find(
      (u) => u.name.toLowerCase().includes(name.toLowerCase())
    ) || currentUserInitial;
    onLoginAsUser(found);
    setSuccessMessage(`Đăng nhập thành công với tài khoản ${found.name}!`);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-blue-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {mode === 'register' ? 'Đăng ký tài khoản VetTop' : 'Đăng nhập VetTop'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Cộng đồng kết nối chủ nuôi thú cưng & bác sĩ thú y
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

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              mode === 'register'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Đăng ký tài khoản mới
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              mode === 'login'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Đăng nhập
          </button>
        </div>

        {successMessage ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-900">{successMessage}</p>
          </div>
        ) : (
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {mode === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* 1. ROLE SELECTION (Chủ nuôi vs Bác sĩ thú y) */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Bạn tham gia với tư cách nào?
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Pet Owner Option */}
                    <div
                      onClick={() => setUserType('owner')}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        userType === 'owner'
                          ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                        userType === 'owner' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <PawPrint className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Chủ nuôi thú cưng
                      </span>
                      <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Nuôi chó, mèo, kết bạn và tìm người nhận nuôi
                      </span>
                    </div>

                    {/* Veterinarian Option */}
                    <div
                      onClick={() => setUserType('vet')}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        userType === 'vet'
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                        userType === 'vet' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Bác sĩ thú y
                      </span>
                      <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        Bác sĩ phòng khám, tư vấn và khám chữa bệnh
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Common registration fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      {userType === 'vet' ? 'Họ và tên Bác sĩ:' : 'Họ và tên của bạn:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={userType === 'vet' ? 'BS. Trần Quốc Khánh' : 'Nguyễn Văn A'}
                      className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Tỉnh / Thành phố:
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden"
                    >
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Huế">Huế</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Email đăng nhập:
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="bacsi@vettop.vn"
                      className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Mật khẩu:
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* 3. DYNAMIC SECTION FOR VETERINARIAN (Tên phòng khám, Địa chỉ phòng khám...) */}
                {userType === 'vet' ? (
                  <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200/80 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-900 text-xs font-bold">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span>Thông tin Phòng khám Thú y & Chuyên môn:</span>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Tên phòng khám / Bệnh viện thú y (* Bắt buộc):
                      </label>
                      <input
                        type="text"
                        required
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="Ví dụ: Phòng khám thú y Hòa Vang, PetCare Center..."
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Địa chỉ phòng khám (* Bắt buộc):
                      </label>
                      <input
                        type="text"
                        required
                        value={clinicAddress}
                        onChange={(e) => setClinicAddress(e.target.value)}
                        placeholder="Số nhà, đường, quận/huyện (Ví dụ: 154 Cách Mạng Tháng 8, Q. Cẩm Lệ)"
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden focus:border-indigo-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                          Chuyên khoa / Dịch vụ chính:
                        </label>
                        <input
                          type="text"
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          placeholder="Ngoại khoa, Tiêm phòng, Da liễu..."
                          className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                          Hotline phòng khám:
                        </label>
                        <input
                          type="text"
                          value={clinicPhone}
                          onChange={(e) => setClinicPhone(e.target.value)}
                          placeholder="0236 3889 xxx"
                          className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Số chứng chỉ hành nghề (Nếu có):
                      </label>
                      <input
                        type="text"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="VET-DNG-2024"
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                      />
                    </div>

                    {/* Logo phòng khám upload & presets */}
                    <div className="p-3 bg-white rounded-xl border border-indigo-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-indigo-950 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Logo Phòng Khám Thú Y:</span>
                        </label>
                        <label className="cursor-pointer px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors">
                          <Upload className="w-3 h-3" />
                          <span>Tải lên logo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleLogoUpload} 
                            className="hidden" 
                          />
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        {clinicLogo && (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
                            <img src={clinicLogo} alt="Logo preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 text-[11px] text-slate-500">
                          <p className="line-clamp-1 text-slate-700 font-semibold">
                            Logo hiển thị trên danh bạ, trang đặt lịch khám và đánh giá
                          </p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => setClinicLogo(clinicImg)}
                              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-600 font-medium"
                            >
                              Logo Hòa Vang
                            </button>
                            <button
                              type="button"
                              onClick={() => setClinicLogo('https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=150&auto=format&fit=crop&q=80')}
                              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-600 font-medium"
                            >
                              Happy Pet
                            </button>
                            <button
                              type="button"
                              onClick={() => setClinicLogo('https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=150&auto=format&fit=crop&q=80')}
                              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-600 font-medium"
                            >
                              PetCare
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SECTION FOR PET OWNER */
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
                    <p className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                      <PawPrint className="w-3.5 h-3.5" />
                      <span>Thông tin bé thú cưng nhà bạn (Không bắt buộc):</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Tên bé (VD: Bánh Bao, Miu)"
                        className="text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                      />
                      <input
                        type="text"
                        value={petBreed}
                        onChange={(e) => setPetBreed(e.target.value)}
                        placeholder="Giống loài (VD: Corgi, Mèo ALN)"
                        className="text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
                >
                  {userType === 'vet' ? 'Đăng ký Tài khoản Bác sĩ Thú y' : 'Đăng ký Tài khoản Chủ nuôi'}
                </button>
              </form>
            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Tên đăng nhập hoặc Email:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Minh hoặc BS. Trần Quốc Khánh"
                    className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
                >
                  Đăng nhập vào VetTop
                </button>
              </form>
            )}

            {/* Current user logged in status & Logout button */}
            {currentUser && onLogout && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      Đang đăng nhập: {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {currentUser.userType === 'vet' ? '🩺 Bác sĩ Thú y' : '🐾 Chủ nuôi'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}

            {/* Quick Persona Switcher for easy testing */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Chuyển nhanh tài khoản mẫu để trải nghiệm:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {sampleAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      onLoginAsUser(acc);
                      onClose();
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      currentUser?.id === acc.id
                        ? 'border-blue-500 bg-blue-50/70'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 truncate">
                        {acc.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {acc.userType === 'vet' ? '🩺 Bác sĩ Thú y' : '🐾 Chủ nuôi'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
