import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  PawPrint, 
  CheckCheck, 
  Lock, 
  UserPlus, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  Building2,
  Stethoscope 
} from 'lucide-react';
import { User, ChatMessage } from '../types';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeChatUser: User | null;
  currentUser: User | null;
  allUsers: User[];
  onSelectChatUser: (user: User) => void;
  onSendFriendRequest: (userId: string) => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  activeChatUser,
  currentUser,
  allUsers,
  onSelectChatUser,
  onSendFriendRequest,
}) => {
  if (!isOpen) return null;

  const currentPartner = activeChatUser || allUsers[0];
  const isFriend = Boolean(currentPartner.isFriend);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    [currentPartner.id]: [
      {
        id: 'm1',
        senderId: currentPartner.id,
        senderName: currentPartner.name,
        senderAvatar: currentPartner.avatar,
        receiverId: currentUser?.id || 'guest',
        text: currentPartner.userType === 'vet'
          ? `Xin chào! Tôi là ${currentPartner.name} tại ${currentPartner.clinicName || 'phòng khám thú y'}. Bạn cần tư vấn sức khỏe hay đặt lịch khám cho bé ạ?`
          : `Chào bạn! Rất vui được kết nối cùng bạn trên VetTop. Bạn có câu hỏi gì về thú cưng hoặc thông tin nhận nuôi không ạ?`,
        timestamp: '10:30',
        isMine: false,
      },
    ],
  });

  const partnerMessages = messages[currentPartner.id] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !isFriend) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id || 'guest',
      senderName: currentUser?.name || 'Tôi',
      senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      receiverId: currentPartner.id,
      text: inputMessage.trim(),
      timestamp: 'Vừa xong',
      isMine: true,
    };

    setMessages((prev) => ({
      ...prev,
      [currentPartner.id]: [...(prev[currentPartner.id] || []), userMsg],
    }));
    setInputMessage('');

    // Simulate smart auto-reply from pet friend / veterinarian
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        senderId: currentPartner.id,
        senderName: currentPartner.name,
        senderAvatar: currentPartner.avatar,
        receiverId: currentUser?.id || 'guest',
        text: currentPartner.userType === 'vet'
          ? `Cảm ơn bạn đã nhắn tin. Bác sĩ đã nhận được thông tin và sẽ hỗ trợ kiểm tra tình trạng bé ngay nhé! ❤️`
          : `Dạ cảm ơn bạn! Bé nhà mình rất ngoan và quấn người ạ. Rất vui vì chúng mình đã kết bạn với nhau! ❤️🐾`,
        timestamp: 'Vừa xong',
        isMine: false,
      };
      setMessages((prev) => ({
        ...prev,
        [currentPartner.id]: [...(prev[currentPartner.id] || []), replyMsg],
      }));
    }, 1200);
  };

  const quickPrompts = currentPartner.userType === 'vet'
    ? [
        'Bác sĩ cho em hỏi lịch tiêm phòng cho chó con với ạ',
        'Phòng khám mình có làm việc cuối tuần không ạ?',
        'Bé mèo bị nôn nhẹ có cần mang đi khám ngay không bác sĩ?',
      ]
    : [
        'Bé còn nhận nuôi được không bạn?',
        'Bé đã tiêm phòng mũi mấy rồi ạ?',
        'Rất vui được kết bạn giao lưu cùng bạn!',
      ];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[540px] animate-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-3.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <img
              src={currentPartner.avatar}
              alt={currentPartner.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50 shrink-0"
            />
            {currentPartner.userType === 'vet' && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] ring-2 ring-white" title="Bác sĩ thú y">
                🩺
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-bold truncate">
                {currentPartner.name}
              </h4>
              {isFriend && (
                <span className="text-[9px] bg-emerald-500/80 px-1.5 py-0.2 rounded-full font-bold">
                  Bạn bè
                </span>
              )}
            </div>
            <p className="text-[10px] text-blue-100 truncate">
              {currentPartner.clinicName || currentPartner.role || 'Thành viên'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isFriend && (
            <button
              onClick={() => alert(`Đang kết nối cuộc gọi thoại với ${currentPartner.name}...`)}
              className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
              title="Gọi thoại"
            >
              <Phone className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Switch chat contact strip */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-100 overflow-x-auto text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase pl-1 shrink-0">Hội thoại:</span>
        {allUsers.slice(0, 5).map((u) => (
          <button
            key={u.id}
            onClick={() => onSelectChatUser(u)}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 transition-colors ${
              currentPartner.id === u.id
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            <span>{u.name.split(' ').slice(-1)[0]}</span>
            {u.isFriend && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />}
          </button>
        ))}
      </div>

      {/* Friendship Status Banner */}
      <div className={`px-3 py-1.5 text-[11px] font-medium flex items-center justify-between border-b ${
        isFriend 
          ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
          : 'bg-amber-50 text-amber-800 border-amber-200'
      }`}>
        {isFriend ? (
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Đã kết bạn · Trò chuyện trực tuyến mở khóa</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Chưa kết bạn · Chỉ nhắn tin khi đã kết bạn</span>
          </div>
        )}

        {!isFriend && (
          <button
            onClick={() => onSendFriendRequest(currentPartner.id)}
            className="text-[10px] font-bold text-blue-600 hover:underline"
          >
            {currentPartner.friendRequestSent ? 'Đã gửi lời mời' : 'Kết bạn ngay'}
          </button>
        )}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f8fafc]">
        {partnerMessages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2 ${m.isMine ? 'justify-end' : 'justify-start'}`}
          >
            {!m.isMine && (
              <img
                src={m.senderAvatar}
                alt={m.senderName}
                className="w-6 h-6 rounded-full object-cover shrink-0 mb-0.5"
              />
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-xs ${
                m.isMine
                  ? 'bg-blue-600 text-white rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
              }`}
            >
              <p>{m.text}</p>
              <div
                className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                  m.isMine ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                <span>{m.timestamp}</span>
                {m.isMine && <CheckCheck className="w-3 h-3 text-white" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FRIENDSHIP LOCK / GATEKEEPER OR MESSAGE INPUT */}
      {!isFriend ? (
        <div className="p-4 bg-amber-50/90 border-t border-amber-200 text-center space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Yêu cầu kết bạn để nhắn tin</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-snug">
            Bạn và <span className="font-bold">{currentPartner.name}</span> chưa là bạn bè. Hãy kết bạn để mở khóa tính năng trò chuyện và tư vấn riêng.
          </p>

          <div>
            {currentPartner.friendRequestSent ? (
              <div className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đã gửi lời mời kết bạn (Chờ đồng ý)</span>
              </div>
            ) : (
              <button
                onClick={() => onSendFriendRequest(currentPartner.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-98"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Gửi lời mời kết bạn với {currentPartner.name}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Unlocked Chat for Friends */
        <>
          {/* Quick Prompts */}
          <div className="px-3 pt-2 bg-white flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputMessage(prompt)}
                className="px-2 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg whitespace-nowrap text-slate-600 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Nhắn tin cho ${currentPartner.name}...`}
              className="flex-1 text-xs px-3.5 py-2 bg-slate-100 rounded-xl outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
