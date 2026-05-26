import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Assignment ready',
    message: 'Your generated question paper is ready to view.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 'n2',
    title: 'Due date reminder',
    message: 'An assignment is due in 3 days.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 'n3',
    title: 'Welcome to VedaAI',
    message: 'Create your first AI-powered assessment from the sidebar.',
    time: 'Yesterday',
    read: true,
  },
];

interface SessionState {
  userName: string;
  isLoggedIn: boolean;
  notifications: NotificationItem[];
  unreadCount: () => number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  logout: () => void;
  login: (name?: string) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      userName: 'John Doe',
      isLoggedIn: true,
      notifications: DEFAULT_NOTIFICATIONS,

      unreadCount: () => get().notifications.filter((n) => !n.read).length,

      markAllRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      markRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      logout: () =>
        set({
          isLoggedIn: false,
          userName: 'Guest',
          notifications: DEFAULT_NOTIFICATIONS.map((n) => ({ ...n, read: true })),
        }),

      login: (name = 'John Doe') =>
        set({
          isLoggedIn: true,
          userName: name,
          notifications: DEFAULT_NOTIFICATIONS,
        }),
    }),
    { name: 'vedaai-session' }
  )
);
