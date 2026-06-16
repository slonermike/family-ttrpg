import { create } from 'zustand'

interface AppState {
  filter: string
}

interface AppActions {
  setFilter: (filter: string) => void
}

export const useAppStore = create<AppState & AppActions>()((set) => ({
  filter: '',
  setFilter: (filter) => set({ filter }),
}))

export const selectFilter = (s: AppState & AppActions) => s.filter
