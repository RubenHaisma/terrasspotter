import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  decrementUnreadCount: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      setUnreadCount: (count) => set({ unreadCount: count }),
      incrementUnreadCount: () =>
        set((state) => ({ unreadCount: state.unreadCount + 1 })),
      decrementUnreadCount: () =>
        set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
    }),
    {
      name: 'notification-storage',
    }
  )
);

interface FilterState {
  priceRange: [number, number];
  capacity: number;
  amenities: string[];
  setPriceRange: (range: [number, number]) => void;
  setCapacity: (capacity: number) => void;
  setAmenities: (amenities: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  priceRange: [0, 100],
  capacity: 1,
  amenities: [],
  setPriceRange: (range) => set({ priceRange: range }),
  setCapacity: (capacity) => set({ capacity }),
  setAmenities: (amenities) => set({ amenities }),
  resetFilters: () =>
    set({ priceRange: [0, 100], capacity: 1, amenities: [] }),
}));