import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Item } from '../types/item'

interface Props {
  item: Item
  filter: string
  onAdd: (item: Item) => void
}

export const typeStyle: Record<string, string> = {
  consumable: 'bg-sky-950 border border-sky-700 text-sky-300',
  weapon: 'bg-orange-950 border border-orange-700 text-orange-300',
  armor: 'bg-slate-800 border border-slate-600 text-slate-300',
  legendary: 'bg-purple-950 border border-purple-700 text-purple-300',
  story: 'bg-emerald-950 border border-emerald-700 text-emerald-300',
  'tool-of-justice': 'bg-amber-950 border border-amber-600 text-amber-300',
}

export const typeLabel: Record<string, string> = {
  consumable: 'ITEM',
  weapon: 'WEAPON',
  armor: 'ARMOR',
  legendary: 'LEGENDARY',
  story: 'STORY',
  'tool-of-justice': 'TOOL OF JUSTICE',
}

function highlight(text: string, query: string): ReactNode {
  if (!query) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    part.toLowerCase() === query ? (
      <mark key={i} className="bg-amber-400 text-gray-900 rounded px-0.5 not-italic">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function ItemCard({ item, filter, onAdd }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          <Link
            to={`/items/${item.slug}`}
            className="text-white font-bold text-base leading-tight hover:text-amber-300 transition-colors"
          >
            {highlight(item.name, filter)}
          </Link>
          <span
            className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${typeStyle[item.type] ?? 'bg-gray-800 border border-gray-600 text-gray-300'}`}
          >
            {typeLabel[item.type] ?? item.type.toUpperCase()}
          </span>
          {item.consumable && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-400 font-mono">
              CONSUMABLE
            </span>
          )}
        </div>
        <button
          onClick={() => onAdd(item)}
          className="shrink-0 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white text-sm font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer"
        >
          + Add
        </button>
      </div>

      {item.tagline && (
        <p className="text-sm text-gray-400 mt-1.5 italic leading-snug">
          {highlight(item.tagline, filter)}
        </p>
      )}

      {item.effect && (
        <p className="text-sm text-gray-300 mt-1 leading-relaxed">
          {highlight(item.effect, filter)}
        </p>
      )}
    </div>
  )
}
