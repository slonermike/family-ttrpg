import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { items } from '../data/items'
import { usePrintStore, selectPrintCount } from '../store/printSlice'
import type { Item } from '../types/item'
import ItemCard from './ItemCard'

type FilterType = 'all' | 'consumable' | 'weapon' | 'armor' | 'legendary' | 'story'

const TYPE_ORDER: FilterType[] = ['consumable', 'weapon', 'armor', 'legendary', 'story']

const TYPE_LABELS: Record<FilterType, string> = {
  all: 'All',
  consumable: 'Consumable',
  weapon: 'Weapon',
  armor: 'Armor',
  legendary: 'Legendary',
  story: 'Story',
}

function groupItems(list: Item[]): [string, Item[]][] {
  const map: Record<string, Item[]> = {}
  for (const item of list) {
    if (!map[item.type]) map[item.type] = []
    map[item.type].push(item)
  }
  for (const group of Object.values(map)) {
    group.sort((a, b) => a.name.localeCompare(b.name))
  }
  return TYPE_ORDER.filter((t) => map[t]).map((t) => [t, map[t]])
}

const allGroups = groupItems(items)
const initialOpen = Object.fromEntries(allGroups.map(([name]) => [name, true]))

export default function ItemsView() {
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen)
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const navigate = useNavigate()
  const addItem = usePrintStore((s) => s.addItem)
  const printCount = usePrintStore(selectPrintCount)

  const query = filter.trim().toLowerCase()

  const visibleGroups = allGroups
    .filter(([type]) => typeFilter === 'all' || type === typeFilter)
    .map(([type, group]) => [
      type,
      group.filter(
        (i) =>
          !query ||
          i.name.toLowerCase().includes(query) ||
          i.effect.toLowerCase().includes(query) ||
          i.tagline.toLowerCase().includes(query),
      ),
    ] as [string, Item[]])
    .filter(([, group]) => group.length > 0)

  function toggle(type: string) {
    setOpen((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-28">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3">
        <h1 className="text-white font-bold text-xl">Items</h1>
      </header>

      <div className="px-4 pt-3 pb-1 space-y-2">
        <input
          className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2.5 border border-gray-600 focus:border-gray-400 outline-none placeholder:text-gray-600"
          placeholder="Filter by name or effect…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          {(['all', ...TYPE_ORDER] as FilterType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                typeFilter === t
                  ? 'bg-amber-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {visibleGroups.length === 0 && (
          <p className="text-gray-600 text-sm text-center py-8">No items match "{filter}"</p>
        )}

        {visibleGroups.map(([type, groupItems]) => (
          <section key={type}>
            <button
              onClick={() => toggle(type)}
              className="w-full flex items-center justify-between gap-3 mb-3 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-gray-200 font-bold text-sm tracking-widest uppercase">
                  {TYPE_LABELS[type as FilterType] ?? type}
                </h2>
                <span className="text-xs text-gray-600 font-mono">{groupItems.length}</span>
              </div>
              <span
                className={`text-gray-500 text-xs transition-transform ${open[type] || query ? '' : '-rotate-90'}`}
              >
                ▼
              </span>
            </button>

            {(open[type] || query) && (
              <div className="space-y-3">
                {groupItems.map((item) => (
                  <ItemCard key={item.slug} item={item} filter={query} onAdd={addItem} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {printCount > 0 && (
        <button
          onClick={() => navigate('/print')}
          className="fixed bottom-16 left-4 right-4 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          View Print Sheet ({printCount} {printCount === 1 ? 'item' : 'items'}) →
        </button>
      )}
    </div>
  )
}
