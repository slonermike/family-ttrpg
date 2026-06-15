import type { ReactNode } from 'react'
import type { Enemy } from '../types/enemy'

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
          <h3 className="text-white font-bold text-base leading-tight">
            {highlight(enemy.name, filter)}
          </h3>
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

      <div className="flex gap-2 mt-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 bg-sky-950 border border-sky-700 rounded px-2.5 py-1 text-xs">
          <span className="text-sky-400 font-bold tracking-wide">DEF</span>
          <span className="text-sky-100 font-mono font-bold text-sm">{enemy.defense_threshold}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 bg-orange-950 border border-orange-700 rounded px-2.5 py-1 text-xs">
          <span className="text-orange-400 font-bold tracking-wide">ATK</span>
          <span className="text-orange-100 font-mono font-bold text-sm">{enemy.attack_threshold}</span>
        </span>

        <span className="inline-flex items-center gap-2 bg-red-950 border border-red-800 rounded px-2.5 py-1 text-xs">
          <span className="text-red-400 font-bold tracking-wide">HP</span>
          <span className="flex gap-1">
            {Array.from({ length: enemy.hp }, (_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-red-400 block shrink-0" />
            ))}
          </span>
          <span className="text-red-200 font-mono font-bold">{enemy.hp}</span>
        </span>

        {enemy.armor && (
          <span className="inline-flex items-center gap-1.5 bg-blue-950 border border-blue-700 rounded px-2.5 py-1 text-xs text-blue-300 font-bold">
            🛡 ARMOR
          </span>
        )}
      </div>

      {enemy.resistances.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center mt-2.5">
          <span className="text-xs text-gray-400 font-bold tracking-wide">RESISTS</span>
          {enemy.resistances.map((r) => (
            <span
              key={r}
              className="text-xs bg-purple-950 border border-purple-700 text-purple-200 px-2 py-0.5 rounded font-semibold"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      {enemy.loot_drop && enemy.loot_drop !== 'none' && (
        <p className="text-xs text-amber-400 mt-2 font-medium">
          <span className="text-amber-600 font-bold">LOOT</span>{' '}
          {enemy.loot_drop}
        </p>
      )}
    </div>
  )
}
