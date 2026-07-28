import { create } from 'zustand'

interface Commodity {
  id: string
  name: string
  price: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  status: 'success' | 'warning' | 'danger'
  icon: string
}

interface PriceState {
  commodities: Commodity[]
  setCommodities: (commodities: Commodity[]) => void
}

export const usePriceStore = create<PriceState>((set) => ({
  commodities: [],
  setCommodities: (commodities) => set({ commodities }),
}))

interface UIState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
