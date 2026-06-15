import { create } from 'zustand'

export type View = 'manual' | 'encounter'

interface AppState {
  view: View
  filter: string
}

interface AppActions {
  setView: (view: View) => void
  setFilter: (filter: string) => void
}

export const useAppStore = create<AppState & AppActions>()((set) => ({
  view: 'manual',
  filter: '',
  setView: (view) => set({ view }),
  setFilter: (filter) => set({ filter }),
}))

export const selectView = (s: AppState & AppActions) => s.view
export const selectFilter = (s: AppState & AppActions) => s.filter
