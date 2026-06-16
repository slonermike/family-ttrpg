import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Enemy } from '../types/enemy'
import EnemyStats from './EnemyStats'

interface Props {
  enemy: Enemy
  filter: string
  onAdd: (enemy: Enemy) => void
}

const tierStyle: Record<string, string> = {
  l1: 'bg-green-950 border border-green-700 text-green-300',
  l2: 'bg-yellow-950 border border-yellow-700 text-yellow-300',
  boss: 'bg-red-950 border border-red-700 text-red-300',
}

const tierLabel: Record<string, string> = {
  l1: 'L1',
  l2: 'L2',
  boss: 'BOSS',
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

export default function EnemyCard({ enemy, filter, onAdd }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          <Link
            to={`/monsters/${enemy.slug}`}
            className="text-white font-bold text-base leading-tight hover:text-amber-300 transition-colors"
          >
            {highlight(enemy.name, filter)}
          </Link>
          <span
            className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${tierStyle[enemy.tier] ?? 'bg-gray-800 border border-gray-600 text-gray-300'}`}
          >
            {tierLabel[enemy.tier] ?? enemy.tier.toUpperCase()}
          </span>
        </div>
        <button
          onClick={() => onAdd(enemy)}
          className="shrink-0 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white text-sm font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer"
        >
          + Add
        </button>
      </div>

      {enemy.description && (
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          {highlight(enemy.description, filter)}
        </p>
      )}

      <EnemyStats enemy={enemy} />
    </div>
  )
}
