import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import type { Item, PrintItem } from '../types/item'

interface PrintState {
  print: PrintItem[]
}

interface PrintActions {
  addItem: (item: Item) => void
  setQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clearPrint: () => void
}

export const usePrintStore = create<PrintState & PrintActions>()((set) => ({
  print: [],

  addItem: (item) =>
    set((s) => {
      const existing = s.print.find((p) => p.base.slug === item.slug)
      if (existing) {
        return {
          print: s.print.map((p) =>
            p.base.slug === item.slug ? { ...p, qty: p.qty + 1 } : p
          ),
        }
      }
      return {
        print: [
          ...s.print,
          { id: crypto.randomUUID(), base: item, qty: 1 },
        ],
      }
    }),

  setQty: (id, qty) =>
    set((s) => ({
      print: s.print.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)),
    })),

  removeItem: (id) =>
    set((s) => ({ print: s.print.filter((p) => p.id !== id) })),

  clearPrint: () => set({ print: [] }),
}))

export const selectPrint = (s: PrintState & PrintActions) => s.print
export const selectPrintCount = (s: PrintState & PrintActions) =>
  s.print.reduce((sum, p) => sum + p.qty, 0)

export const usePrint = () => usePrintStore(useShallow(selectPrint))
