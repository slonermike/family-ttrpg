import { useState } from 'react'
import { enemies } from '../data/enemies'
import { useAppStore, selectFilter } from '../store/appSlice'
import { useEncounterStore, selectAliveCount, useEncounter } from '../store/encounterSlice'
import type { Enemy } from '../types/enemy'
import EnemyCard from './EnemyCard'

interface Props {
  onBack?: () => void
}

const GENERAL = 'General Use'
const TIER_ORDER: Record<string, number> = { l1: 0, l2: 1, boss: 2 }

function groupEnemies(list: Enemy[]): [string, Enemy[]][] {
  const map: Record<string, Enemy[]> = {}

  for (const enemy of list) {
    const locs = !enemy.location
      ? [GENERAL]
      : Array.isArray(enemy.location)
        ? enemy.location
        : [enemy.location]
    for (const loc of locs) {
      if (!map[loc]) map[loc] = []
      map[loc].push(enemy)
    }
  }

  for (const group of Object.values(map)) {
    group.sort((a, b) => {
      const tierDiff = (TIER_ORDER[a.tier] ?? 99) - (TIER_ORDER[b.tier] ?? 99)
      return tierDiff !== 0 ? tierDiff : a.name.localeCompare(b.name)
    })
  }

  return Object.entries(map).sort(([a], [b]) => {
    if (a === GENERAL) return -1
    if (b === GENERAL) return 1
    return a.localeCompare(b)
  })
}

const allGroups = groupEnemies(enemies)
const initialOpen = Object.fromEntries(allGroups.map(([name]) => [name, name === GENERAL]))

export default function MonsterManual({ onBack }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen)

  const filter = useAppStore(selectFilter)
  const setFilter = useAppStore((s) => s.setFilter)
  const setView = useAppStore((s) => s.setView)
  const addEnemy = useEncounterStore((s) => s.addEnemy)
  const encounter = useEncounter()
  const aliveCount = useEncounterStore(selectAliveCount)

  const isOverlay = !!onBack
  const query = filter.trim().toLowerCase()

  const visibleGroups = query
    ? allGroups
        .map(([name, group]) => [
          name,
          group.filter(
            (e) =>
              e.name.toLowerCase().includes(query) ||
              e.description.toLowerCase().includes(query),
          ),
        ] as [string, Enemy[]])
        .filter(([, group]) => group.length > 0)
    : allGroups

  function toggle(name: string) {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-28">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
        {isOverlay && (
          <button
            onClick={onBack}
            className="text-amber-500 hover:text-amber-400 text-sm font-medium shrink-0 cursor-pointer"
          >
            ← Back
          </button>
        )}
        <h1 className="text-white font-bold text-xl shrink-0">Monster Manual</h1>
        {isOverlay && encounter.length > 0 && (
          <span className="text-xs text-gray-400 ml-auto shrink-0">
            {encounter.length} in encounter
          </span>
        )}
      </header>

      <div className="px-4 pt-3 pb-1">
        <input
          className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2.5 border border-gray-600 focus:border-gray-400 outline-none placeholder:text-gray-600"
          placeholder="Filter by name or description…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="p-4 space-y-6">
        {visibleGroups.length === 0 && (
          <p className="text-gray-600 text-sm text-center py-8">No enemies match "{filter}"</p>
        )}

        {visibleGroups.map(([groupName, groupEnemies]) => (
          <section key={groupName}>
            <button
              onClick={() => toggle(groupName)}
              className="w-full flex items-center justify-between gap-3 mb-3 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-gray-200 font-bold text-sm tracking-widest uppercase">
                  {groupName}
                </h2>
                <span className="text-xs text-gray-600 font-mono">{groupEnemies.length}</span>
              </div>
              <span
                className={`text-gray-500 text-xs transition-transform ${open[groupName] || query ? '' : '-rotate-90'}`}
              >
                ▼
              </span>
            </button>

            {(open[groupName] || query) && (
              <div className="space-y-3">
                {groupEnemies.map((enemy) => (
                  <EnemyCard key={enemy.name} enemy={enemy} filter={query} onAdd={addEnemy} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {!isOverlay && encounter.length > 0 && (
        <button
          onClick={() => setView('encounter')}
          className="fixed bottom-4 left-4 right-4 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          View Encounter ({aliveCount} alive / {encounter.length} total) →
        </button>
      )}
    </div>
  )
}
