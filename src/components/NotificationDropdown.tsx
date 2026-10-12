import React from 'react';
import { Bell, HeartHandshake, UserPlus, Heart, MessageSquare, Check, X } from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'adoption' | 'friend' | 'like' | 'comment';
  title: string;
  desc: string;
  time: string;
  avatar: string;
  read: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onAcceptFriend: (notifId: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onAcceptFriend,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-12 top-16 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-900">Thông báo cộng đồng</h4>
        </div>
        <button
          onClick={onMarkAllAsRead}
          className="text-[11px] font-semibold text-blue-600 hover:underline"
        >
          Đánh dấu đã đọc
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
              !notif.read ? 'bg-blue-50/30' : ''
            }`}
          >
            <div className="relative shrink-0">
              <img
                src={notif.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white">
                {notif.type === 'adoption' && '🐾'}
                {notif.type === 'friend' && '👥'}
                {notif.type === 'like' && '❤️'}
                {notif.type === 'comment' && '💬'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-800 leading-snug">
                <span className="font-bold">{notif.title}</span> {notif.desc}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>

              {notif.type === 'friend' && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => onAcceptFriend(notif.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    <span>Đồng ý</span>
                  </button>
                  <button
                    onClick={() => onAcceptFriend(notif.id)}
                    className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
