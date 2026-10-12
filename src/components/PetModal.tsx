import React, { useState } from 'react';
import { X, PawPrint, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { Pet } from '../types';

interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePet: (petData: Omit<Pet, 'id' | 'userId'>) => void;
  initialPet?: Pet | null;
}

export const PetModal: React.FC<PetModalProps> = ({
  isOpen,
  onClose,
  onSavePet,
  initialPet,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(initialPet?.name || '');
  const [species, setSpecies] = useState<'dog' | 'cat' | 'other'>(initialPet?.species || 'cat');
  const [breed, setBreed] = useState(initialPet?.breed || '');
  const [age, setAge] = useState(initialPet?.age || '');
  const [gender, setGender] = useState<'male' | 'female'>(initialPet?.gender || 'female');
  const [weight, setWeight] = useState(initialPet?.weight || '4 kg');
  const [vaccinated, setVaccinated] = useState(initialPet?.vaccinated ?? true);
  const [neutered, setNeutered] = useState(initialPet?.neutered ?? true);
  const [notes, setNotes] = useState(initialPet?.notes || '');
  const [avatar, setAvatar] = useState(
    initialPet?.avatar ||
      (species === 'cat'
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=200&auto=format&fit=crop&q=80')
  );

  const sampleAvatars = [
    { label: 'Mèo ALN', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&auto=format&fit=crop&q=80' },
    { label: 'Corgi', url: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=200&auto=format&fit=crop&q=80' },
    { label: 'Poodle', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop&q=80' },
    { label: 'Mèo vàng', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&auto=format&fit=crop&q=80' },
    { label: 'Golden', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSavePet({
      name: name.trim(),
      species,
      breed: breed.trim() || (species === 'cat' ? 'Mèo cưng' : 'Cún cưng'),
      age: age.trim() || '1 tuổi',
      gender,
      weight,
      vaccinated,
      neutered,
      notes: notes.trim(),
      avatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-blue-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <PawPrint className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {initialPet ? 'Cập nhật hồ sơ thú cưng' : 'Thêm thú cưng mới (Pet Passport)'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Quản lý sổ sức khỏe, tiêm phòng và kết bạn cho bé
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

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Avatar selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-2">
              Ảnh đại diện của bé:
            </label>
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt="Selected Avatar"
                className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-100 shrink-0"
              />
              <div className="flex flex-wrap gap-2">
                {sampleAvatars.map((samp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(samp.url)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                      avatar === samp.url
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {samp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Tên bé thú cưng:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Miu, Bobby, Mochi..."
                className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Loài:
              </label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden"
              >
                <option value="cat">Mèo cưng</option>
                <option value="dog">Chó cưng</option>
                <option value="other">Thú cưng khác</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Giống loài:
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Mèo Anh lông ngắn, Corgi..."
                className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Độ tuổi:
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="2 tuổi, 8 tháng..."
                className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Giới tính:
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden"
              >
                <option value="female">Cái</option>
                <option value="male">Đực</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Cân nặng:
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="4.2 kg"
                className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={vaccinated}
                onChange={(e) => setVaccinated(e.target.checked)}
                className="rounded-sm text-blue-600"
              />
              <span>Đã tiêm phòng vắc-xin</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={neutered}
                onChange={(e) => setNeutered(e.target.checked)}
                className="rounded-sm text-blue-600"
              />
              <span>Đã triệt sản</span>
            </label>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Thói quen & Sở thích của bé:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thích ăn pate cá hồi, quấn người, thích đi dạo..."
              className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-hidden focus:bg-white focus:border-blue-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20"
            >
              Lưu thú cưng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
