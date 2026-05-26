'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellIcon, ChevronDownIcon } from '@/components/icons/NavIcons';
import { useSessionStore } from '@/store/useSessionStore';

function UserAvatar({ initials = 'JD' }: { initials?: string }) {
  return (
    <div className="w-[30px] h-[30px] rounded-full overflow-hidden border border-[#e0e0e0] shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold">
      {initials}
    </div>
  );
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, onClose, active]);
}

export default function HeaderActions({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { userName, isLoggedIn, notifications, unreadCount, markAllRead, markRead, logout, login } =
    useSessionStore();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen);
  useClickOutside(userRef, () => setUserOpen(false), userOpen);

  const unread = unreadCount();
  const initials = userName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'JD';

  const handleLogout = () => {
    setUserOpen(false);
    logout();
    router.push('/assignments?loggedOut=1');
  };

  const handleLogin = () => {
    setUserOpen(false);
    login();
    router.refresh();
  };

  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      {/* Notifications */}
      <div ref={notifRef} className="relative">
        <button
          type="button"
          id="topnav-bell-btn"
          onClick={() => {
            setNotifOpen((v) => !v);
            setUserOpen(false);
          }}
          className="w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-gray-200 transition-colors relative"
          aria-label="Notifications"
          aria-expanded={notifOpen}
        >
          <BellIcon size={20} />
          {unread > 0 && (
            <span
              aria-label={`${unread} new notifications`}
              className="absolute top-[9px] right-[9px] w-[7px] h-[7px] rounded-full bg-red-500 border-[1.5px] border-white"
            />
          )}
        </button>

        {notifOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+8px)] w-[320px] max-w-[90vw] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#e8e8e8] z-[100] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
              <span className="text-sm font-bold text-[#111]">Notifications</span>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-xs font-medium text-[#555] hover:text-[#111] bg-transparent border-none cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
            <ul className="max-h-[280px] overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="px-4 py-6 text-sm text-[#777] text-center">No notifications</li>
              ) : (
                notifications.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => markRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors border-none cursor-pointer ${
                        n.read ? 'bg-white' : 'bg-[#faf9f7]'
                      }`}
                    >
                      <p className="text-sm font-semibold text-[#111]">{n.title}</p>
                      <p className="text-xs text-[#666] mt-0.5 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] text-[#999] mt-1">{n.time}</p>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* User menu */}
      <div ref={userRef} className="relative">
        <button
          type="button"
          id="topnav-user-menu"
          onClick={() => {
            setUserOpen((v) => !v);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 pr-2 rounded-xl hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
          aria-label="User menu"
          aria-expanded={userOpen}
        >
          <UserAvatar initials={initials} />
          {!compact && (
            <span className="text-[13px] font-semibold text-[#111] max-w-[120px] truncate">
              {userName}
            </span>
          )}
          <ChevronDownIcon size={16} />
        </button>

        {userOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+8px)] min-w-[180px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#e8e8e8] z-[100] overflow-hidden py-1"
          >
            <div className="px-4 py-2.5 border-b border-[#f0f0f0]">
              <p className="text-sm font-bold text-[#111] truncate">{userName}</p>
              <p className="text-xs text-[#888]">{isLoggedIn ? 'Teacher account' : 'Signed out'}</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setUserOpen(false);
                router.push('/settings');
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-[#111] hover:bg-[#f8f8f8] border-none bg-transparent cursor-pointer"
            >
              Settings
            </button>
            {isLoggedIn ? (
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 font-medium hover:bg-red-50 border-none bg-transparent cursor-pointer border-t border-[#f5f5f5]"
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                role="menuitem"
                onClick={handleLogin}
                className="w-full px-4 py-2.5 text-left text-sm text-[#111] font-medium hover:bg-[#f8f8f8] border-none bg-transparent cursor-pointer border-t border-[#f5f5f5]"
              >
                Sign in as John Doe
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
