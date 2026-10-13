import React, { useState } from 'react';
import { 
  X, 
  PawPrint, 
  LogIn, 
  CheckCircle2, 
  Stethoscope, 
  Building2, 
  MapPin, 
  Phone, 
  Award, 
  LogOut, 
  Upload, 
  Image as ImageIcon,
  ShoppingBag,
  Scissors,
  Hotel,
  AlertCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { User, ToplistPlace } from '../types';
import { mockUsers, currentUserInitial, clinicImg } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  registeredUsers?: User[];
  onLoginAsUser: (user: User) => void;
  onRegisterNewUser: (
    newUser: User, 
    initialPetName?: string, 
    initialPetBreed?: string,
    createdPlace?: ToplistPlace
  ) => void;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  registeredUsers = [],
  onLoginAsUser,
  onRegisterNewUser,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [userType, setUserType] = useState<'owner' | 'vet' | 'petshop' | 'spa'>('vet');

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Đà Nẵng');

  // Login field
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Pet Owner fields
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');

  // Business Common & Clinic fields
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessLogo, setBusinessLogo] = useState<string>(clinicImg);
  const [specialty, setSpecialty] = useState('Khám chữa bệnh, Tiêm phòng & Cấp cứu 24/7');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [customAvatar, setCustomAvatar] = useState<string>('');

  // Extra service checkboxes for Clinic / Pet Shop
  const [hasPetShop, setHasPetShop] = useState(false);
  const [hasSpa, setHasSpa] = useState(false);
  const [hasPetHotel, setHasPetHotel] = useState(false);
  const [hasEmergency247, setHasEmergency247] = useState(true);
  const [hasVaccine, setHasVaccine] = useState(true);
  const [hasSurgery, setHasSurgery] = useState(true);

  // Pet Shop specific items
  const [shopProducts, setShopProducts] = useState<string[]>([
    'Thức ăn hạt dinh dưỡng & Pate nhập khẩu',
    'Phụ kiện & Đồ chơi thú cưng',
    'Cát vệ sinh & Bỉm tã',
  ]);

  const [successMessage, setSuccessMessage] = useState('');

  // Upload logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!name.trim() || !email.trim()) {
      alert('Vui lòng nhập họ tên và email đăng nhập!');
      return;
    }

    // Validation for businesses
    if (userType === 'vet' && (!businessName.trim() || !businessAddress.trim())) {
      alert('Vui lòng nhập Tên phòng khám và Địa chỉ phòng khám!');
      return;
    }
    if (userType === 'petshop' && (!businessName.trim() || !businessAddress.trim())) {
      alert('Vui lòng nhập Tên cửa hàng Pet Shop và Địa chỉ cửa hàng!');
      return;
    }
    if (userType === 'spa' && (!businessName.trim() || !businessAddress.trim())) {
      alert('Vui lòng nhập Tên cơ sở Spa / Khách sạn và Địa chỉ!');
      return;
    }

    const timestamp = Date.now();
    const userId = `user-${timestamp}`;

    // Compute services list
    const servicesList: string[] = [];
    if (userType === 'vet') {
      if (hasEmergency247) servicesList.push('Cấp cứu 24/7');
      if (hasVaccine) servicesList.push('Tiêm phòng vắc-xin');
      if (hasSurgery) servicesList.push('Phẫu thuật & Triệt sản');
      if (hasPetShop) servicesList.push('Cửa hàng Pet Shop');
      if (hasSpa) servicesList.push('Spa & Grooming');
      if (hasPetHotel) servicesList.push('Khách sạn Pet Hotel');
      servicesList.push('Siêu âm & Xét nghiệm máu');
    } else if (userType === 'petshop') {
      servicesList.push(...shopProducts);
      if (hasSpa) servicesList.push('Spa tắm sấy & cắt tỉa');
      if (hasPetHotel) servicesList.push('Trông giữ thú cưng lưu chuồng');
      servicesList.push('Tư vấn dinh dưỡng');
    } else if (userType === 'spa') {
      servicesList.push('Tắm sấy khử mùi chuyên sâu', 'Cắt tỉa lông tạo kiểu Hàn Quốc', 'Khách sạn lưu chuồng máy lạnh', 'Vệ sinh tai móng & tuyến hôi');
    }

    let roleText = 'Yêu thích thú cưng';
    let formattedName = name.trim();
    if (userType === 'vet') {
      formattedName = name.toLowerCase().startsWith('bs.') ? name.trim() : `BS. ${name.trim()}`;
      roleText = `Bác sĩ Thú y · ${businessName.trim()}`;
    } else if (userType === 'petshop') {
      roleText = `Chủ cửa hàng Pet Shop · ${businessName.trim()}`;
    } else if (userType === 'spa') {
      roleText = `Quản lý Spa & Hotel · ${businessName.trim()}`;
    } else if (petName) {
      roleText = `Chủ nuôi bé ${petName}`;
    }

    const defaultAvatar = 
      userType === 'vet' 
        ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
        : userType === 'petshop'
        ? 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&auto=format&fit=crop&q=80'
        : userType === 'spa'
        ? 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

    const newUser: User = {
      id: userId,
      name: formattedName,
      email: email.trim(),
      password: password.trim() || '123456',
      avatar: customAvatar || businessLogo || defaultAvatar,
      role: roleText,
      userType,
      businessType: userType === 'owner' ? undefined : (userType as any),
      businessName: userType !== 'owner' ? businessName.trim() : undefined,
      clinicName: userType === 'vet' ? businessName.trim() : (userType !== 'owner' ? businessName.trim() : undefined),
      clinicAddress: userType !== 'owner' ? businessAddress.trim() : undefined,
      clinicLogo: userType !== 'owner' ? businessLogo : undefined,
      hasPetShop: userType === 'vet' ? hasPetShop : (userType === 'petshop' ? true : false),
      hasSpa: userType === 'vet' ? hasSpa : (userType === 'spa' ? true : hasSpa),
      hasPetHotel: userType === 'vet' ? hasPetHotel : (userType === 'spa' ? true : hasPetHotel),
      services: servicesList,
      specialty: userType === 'vet' ? specialty.trim() : undefined,
      phone: businessPhone.trim() || '0236 3889 999',
      licenseNumber: userType === 'vet' ? (licenseNumber.trim() || `VET-${Date.now().toString().slice(-4)}`) : undefined,
      bio: userType === 'vet'
        ? `Bác sĩ thú y tại ${businessName.trim()} (${businessAddress.trim()}). Chuyên môn: ${specialty.trim()}. Sẵn sàng tiếp nhận bệnh nhân và đặt lịch khám trực tuyến.`
        : userType === 'petshop'
        ? `Cửa hàng ${businessName.trim()} tại ${businessAddress.trim()}. Chuyên cung cấp thức ăn, phụ kiện và dịch vụ chăm sóc thú cưng chính hãng.`
        : userType === 'spa'
        ? `Dịch vụ Spa & Khách sạn lưu trú thú cưng tại ${businessAddress.trim()}. Chăm sóc và làm đẹp toàn diện cho thú cưng của bạn.`
        : `Chào mừng bạn đến với trang cá nhân của mình! Nhà mình nuôi ${petName || 'thú cưng'}.`,
      location,
      petsCount: userType === 'owner' ? (petName ? 1 : 0) : 1,
      mutualFriends: 0,
      isRealRegistered: true,
    };

    // If business, create a ToplistPlace item as well!
    let createdPlace: ToplistPlace | undefined;
    if (userType !== 'owner') {
      const categoryType = 
        userType === 'vet' ? 'clinic' :
        userType === 'petshop' ? 'petshop' :
        hasPetHotel ? 'hotel' : 'spa';

      createdPlace = {
        id: `place-${timestamp}`,
        name: businessName.trim(),
        category: categoryType,
        rating: 5.0,
        reviewsCount: 1,
        city: location,
        address: businessAddress.trim(),
        phone: businessPhone.trim() || '0236 3889 999',
        email: email.trim(),
        doctorName: userType === 'vet' ? formattedName : `Quản lý: ${name.trim()}`,
        logoUrl: businessLogo,
        imageUrl: businessLogo,
        isOpen: true,
        isSaved: false,
        priceRange: userType === 'vet' ? '100.000đ - 1.000.000đ' : '50.000đ - 650.000đ',
        services: servicesList,
        description: newUser.bio,
        hasPetShop: userType === 'petshop' || hasPetShop,
        hasSpa: userType === 'spa' || hasSpa,
        hasPetHotel: hasPetHotel,
        isRealRegistered: true,
        ownerId: userId,
      };
    }

    onRegisterNewUser(
      newUser, 
      userType === 'owner' ? petName : undefined, 
      userType === 'owner' ? petBreed : undefined,
      createdPlace
    );

    setSuccessMessage(`Đăng ký thành công! Đã đăng nhập với tư cách ${newUser.name}. Dữ liệu cơ sở đã được cập nhật trực tiếp lên Trang chủ.`);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const query = loginInput.trim().toLowerCase();
    if (!query) {
      setLoginError('Vui lòng nhập Email, Tên tài khoản hoặc Tên phòng khám / Pet Shop!');
      return;
    }

    // Search through all available registered users and sample accounts
    const allUsersPool = [
      ...registeredUsers,
      ...mockUsers,
      currentUserInitial,
    ];

    // Priority 1: exact email match
    let found = allUsersPool.find(
      (u) => u.email && u.email.toLowerCase() === query
    );

    // Priority 2: exact or partial name match
    if (!found) {
      found = allUsersPool.find(
        (u) => u.name.toLowerCase() === query
      );
    }

    // Priority 3: clinic or business name match
    if (!found) {
      found = allUsersPool.find(
        (u) =>
          (u.clinicName && u.clinicName.toLowerCase().includes(query)) ||
          (u.businessName && u.businessName.toLowerCase().includes(query))
      );
    }

    // Priority 4: partial match on name
    if (!found) {
      found = allUsersPool.find(
        (u) => u.name.toLowerCase().includes(query)
      );
    }

    if (!found) {
      setLoginError(
        `Không tìm thấy tài khoản với thông tin "${loginInput.trim()}". Vui lòng kiểm tra lại chính xác email/tên hoặc bấm tab "Đăng ký tài khoản mới" ở trên để đăng ký.`
      );
      return;
    }

    // Successful login with the REAL found user!
    onLoginAsUser(found);
    setSuccessMessage(`Đăng nhập thành công! Chào mừng ${found.name} trở lại VetTop.`);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  // Combine real registered users and default accounts for persona switcher
  const combinedAccounts = [
    ...registeredUsers.filter((u) => u.isRealRegistered),
    ...mockUsers.filter((u) => u.clinicName === 'Phòng khám thú y Hòa Vang' || u.userType === 'vet'),
    currentUserInitial,
    ...mockUsers.slice(0, 2),
  ].filter((u, index, self) => index === self.findIndex((t) => t.id === u.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {mode === 'register' ? 'Đăng ký tài khoản thật trên VetTop' : 'Đăng nhập VetTop'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Dành cho Phòng khám thú y · Cửa hàng Pet Shop · Spa Grooming · Chủ nuôi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 shrink-0">
          <button
            onClick={() => {
              setMode('register');
              setLoginError('');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              mode === 'register'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Đăng ký tài khoản mới (Thật)
          </button>
          <button
            onClick={() => {
              setMode('login');
              setLoginError('');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              mode === 'login'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Đăng nhập tài khoản
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {successMessage ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-900 max-w-md mx-auto leading-relaxed">{successMessage}</p>
            </div>
          ) : mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* 1. ROLE SELECTION WITH 4 ROLES: Owner, Clinic/Vet, Pet Shop, Spa/Hotel */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  1. Chọn loại hình tài khoản bạn muốn đăng ký:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Bác sĩ & Phòng khám */}
                  <div
                    onClick={() => {
                      setUserType('vet');
                      if (!businessName) setBusinessName('Phòng khám thú y Hòa Vang');
                    }}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                      userType === 'vet'
                        ? 'border-indigo-600 bg-indigo-50/90 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                      userType === 'vet' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Phòng khám thú y
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Khám & Đặt lịch
                    </span>
                  </div>

                  {/* Cửa hàng Pet Shop */}
                  <div
                    onClick={() => {
                      setUserType('petshop');
                      if (!businessName) setBusinessName('Hòa Vang Pet Shop & Phụ kiện');
                    }}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                      userType === 'petshop'
                        ? 'border-amber-600 bg-amber-50/90 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                      userType === 'petshop' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Cửa hàng Pet Shop
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Thức ăn & Phụ kiện
                    </span>
                  </div>

                  {/* Spa & Khách sạn thú cưng */}
                  <div
                    onClick={() => {
                      setUserType('spa');
                      if (!businessName) setBusinessName('Hòa Vang Pet Spa & Hotel');
                    }}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                      userType === 'spa'
                        ? 'border-rose-600 bg-rose-50/90 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                      userType === 'spa' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Scissors className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Spa & Pet Hotel
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Tắm tỉa & Lưu chuồng
                    </span>
                  </div>

                  {/* Chủ nuôi thú cưng */}
                  <div
                    onClick={() => setUserType('owner')}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                      userType === 'owner'
                        ? 'border-blue-600 bg-blue-50/90 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                      userType === 'owner' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <PawPrint className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Chủ nuôi thú cưng
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Nuôi pet & Nhận nuôi
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. DYNAMIC BUSINESS INFORMATION SECTION */}
              {userType !== 'owner' ? (
                <div className={`p-4 rounded-xl border space-y-3.5 ${
                  userType === 'vet' ? 'bg-indigo-50/60 border-indigo-200' :
                  userType === 'petshop' ? 'bg-amber-50/60 border-amber-200' :
                  'bg-rose-50/60 border-rose-200'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    {userType === 'vet' && <Building2 className="w-4 h-4 text-indigo-600" />}
                    {userType === 'petshop' && <ShoppingBag className="w-4 h-4 text-amber-600" />}
                    {userType === 'spa' && <Scissors className="w-4 h-4 text-rose-600" />}
                    <span>
                      {userType === 'vet' ? 'Thông tin Phòng khám Thú y:' :
                       userType === 'petshop' ? 'Thông tin Cửa hàng Pet Shop:' :
                       'Thông tin Cơ sở Spa & Pet Hotel:'}
                    </span>
                  </div>

                  {/* Tên cơ sở */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      {userType === 'vet' ? 'Tên phòng khám thú y (* Bắt buộc):' :
                       userType === 'petshop' ? 'Tên cửa hàng Pet Shop (* Bắt buộc):' :
                       'Tên cơ sở Spa & Hotel (* Bắt buộc):'}
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={
                        userType === 'vet' ? 'VD: Phòng khám thú y Hòa Vang' :
                        userType === 'petshop' ? 'VD: Cửa hàng thú cưng Hòa Vang Pet Shop' :
                        'VD: Hòa Vang Pet Spa & Hotel'
                      }
                      className="w-full text-xs p-2.5 bg-white rounded-xl border border-slate-200 outline-hidden focus:border-blue-500 font-semibold text-slate-900 shadow-2xs"
                    />
                  </div>

                  {/* Địa chỉ cơ sở */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Địa chỉ cụ thể (* Bắt buộc):
                    </label>
                    <input
                      type="text"
                      required
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện (VD: 154 Cách Mạng Tháng 8, Cẩm Lệ, Đà Nẵng)"
                      className="w-full text-xs p-2.5 bg-white rounded-xl border border-slate-200 outline-hidden focus:border-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Hotline & Tỉnh thành */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Hotline liên hệ / Đặt hẹn:
                      </label>
                      <input
                        type="text"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        placeholder="0236 3889 999"
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Tỉnh / Thành phố:
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full text-xs p-2 bg-white rounded-lg border border-slate-200 outline-hidden cursor-pointer"
                      >
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Huế">Huế</option>
                      </select>
                    </div>
                  </div>

                  {/* CRITICAL USER REQUIREMENT:
                      "đăng ký phòng khám hỏi phòng khám có thêm petshop, spa hay pet hotel" */}
                  {userType === 'vet' && (
                    <div className="p-3 bg-white rounded-xl border border-indigo-200 space-y-2">
                      <p className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Phòng khám của bạn có kèm thêm dịch vụ nào sau đây?</span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        (Tích chọn để phòng khám được hiển thị thêm trong các danh mục tương ứng trên Trang chủ & Toplist)
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {/* Has Pet Shop */}
                        <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                          hasPetShop ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={hasPetShop}
                            onChange={(e) => setHasPetShop(e.target.checked)}
                            className="rounded text-amber-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-xs flex items-center gap-1">
                            <span>🛍️</span>
                            <span>Có kèm Pet Shop</span>
                          </span>
                        </label>

                        {/* Has Spa */}
                        <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                          hasSpa ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={hasSpa}
                            onChange={(e) => setHasSpa(e.target.checked)}
                            className="rounded text-rose-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-xs flex items-center gap-1">
                            <span>✂️</span>
                            <span>Có kèm Spa Grooming</span>
                          </span>
                        </label>

                        {/* Has Pet Hotel */}
                        <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                          hasPetHotel ? 'border-indigo-500 bg-indigo-50 text-indigo-950 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={hasPetHotel}
                            onChange={(e) => setHasPetHotel(e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-xs flex items-center gap-1">
                            <span>🏨</span>
                            <span>Có kèm Pet Hotel</span>
                          </span>
                        </label>
                      </div>

                      {/* Professional Vet Services */}
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-600 border-t border-slate-100">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasEmergency247}
                            onChange={(e) => setHasEmergency247(e.target.checked)}
                            className="rounded text-indigo-600"
                          />
                          <span>Cấp cứu 24/7</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasVaccine}
                            onChange={(e) => setHasVaccine(e.target.checked)}
                            className="rounded text-indigo-600"
                          />
                          <span>Tiêm vắc-xin</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasSurgery}
                            onChange={(e) => setHasSurgery(e.target.checked)}
                            className="rounded text-indigo-600"
                          />
                          <span>Phẫu thuật & Triệt sản</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Pet Shop specific options */}
                  {userType === 'petshop' && (
                    <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                      <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                        <span>Dịch vụ đi kèm tại cửa hàng Pet Shop:</span>
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                          hasSpa ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold' : 'border-slate-200 text-slate-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={hasSpa}
                            onChange={(e) => setHasSpa(e.target.checked)}
                            className="rounded text-rose-600"
                          />
                          <span>✂️ Có kèm Spa tắm tỉa</span>
                        </label>
                        <label className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                          hasPetHotel ? 'border-indigo-500 bg-indigo-50 text-indigo-950 font-bold' : 'border-slate-200 text-slate-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={hasPetHotel}
                            onChange={(e) => setHasPetHotel(e.target.checked)}
                            className="rounded text-indigo-600"
                          />
                          <span>🏨 Có kèm Trông giữ Hotel</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Logo upload & preview */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>Logo / Hình ảnh đại diện cơ sở:</span>
                      </label>
                      <label className="cursor-pointer px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Tải logo lên</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      {businessLogo && (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
                          <img src={businessLogo} alt="Logo preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 text-[11px] text-slate-500">
                        <p className="line-clamp-1 text-slate-700 font-semibold">
                          Logo xuất hiện tại Trang chủ, Toplist và trang đặt lịch
                        </p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => setBusinessLogo(clinicImg)}
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700 font-medium"
                          >
                            Logo Hòa Vang
                          </button>
                          <button
                            type="button"
                            onClick={() => setBusinessLogo('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&auto=format&fit=crop&q=80')}
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700 font-medium"
                          >
                            Logo Pet Shop
                          </button>
                          <button
                            type="button"
                            onClick={() => setBusinessLogo('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=150&auto=format&fit=crop&q=80')}
                            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700 font-medium"
                          >
                            Logo Spa 5-Sao
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Pet Owner Section */
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 space-y-2">
                  <p className="text-[11px] font-bold text-blue-800 flex items-center gap-1">
                    <PawPrint className="w-3.5 h-3.5" />
                    <span>Thông tin bé thú cưng nhà bạn (Tùy chọn):</span>
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

              {/* 3. Account Owner Details (Họ tên, Email, Mật khẩu) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    {userType === 'vet' ? 'Họ tên Bác sĩ / Đại diện:' :
                     userType === 'petshop' ? 'Họ tên Chủ shop / Quản lý:' :
                     userType === 'spa' ? 'Họ tên Master Groomer / Quản lý:' :
                     'Họ và tên của bạn:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={userType === 'vet' ? 'BS. Nguyễn Huy Hoàng' : 'Nguyễn Văn Hữu'}
                    className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Email đăng nhập (Nhận thông báo):
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vanhuutyk42@gmail.com"
                    className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Mật khẩu đăng nhập:
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>
                  {userType === 'vet' ? 'Đăng ký Phòng khám thú y thật & Hiển thị Trang chủ' :
                   userType === 'petshop' ? 'Đăng ký Cửa hàng Pet Shop & Hiển thị Trang chủ' :
                   userType === 'spa' ? 'Đăng ký Spa & Pet Hotel & Hiển thị Trang chủ' :
                   'Đăng ký Tài khoản Chủ nuôi'}
                </span>
              </button>
            </form>
          ) : (
            /* REAL LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{loginError}</p>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Email đăng nhập, Tên người dùng hoặc Tên cơ sở:
                </label>
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => {
                    setLoginInput(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Ví dụ: vanhuutyk42@gmail.com hoặc Phòng khám thú y Hòa Vang"
                  className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-500 font-medium text-slate-900"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Bạn có thể nhập email thật vừa đăng ký hoặc tên cơ sở phòng khám / petshop để đăng nhập trực tiếp.
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Mật khẩu:
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-hidden focus:bg-white focus:border-blue-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập vào VetTop</span>
              </button>
            </form>
          )}

          {/* Current user status & Logout */}
          {currentUser && onLogout && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Đang đăng nhập: {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {currentUser.clinicName || currentUser.role || 'Thành viên'}
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

          {/* QUICK SWITCHER - Showing real registered users first! */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Danh sách tài khoản (Bấm để chuyển nhanh):</span>
              <span className="text-[10px] text-blue-600 lowercase font-normal">{combinedAccounts.length} tài khoản</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {combinedAccounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    onLoginAsUser(acc);
                    onClose();
                  }}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    currentUser?.id === acc.id
                      ? 'border-blue-500 bg-blue-50/80 ring-1 ring-blue-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {acc.name}
                      </p>
                      {acc.isRealRegistered && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 rounded font-bold shrink-0">
                          Thật
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">
                      {acc.clinicName || acc.role || (acc.userType === 'vet' ? '🩺 Bác sĩ Thú y' : '🐾 Chủ nuôi')}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
