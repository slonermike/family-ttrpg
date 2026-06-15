import { useState } from 'react'
import { useEncounterStore } from '../store/encounterSlice'
import type { EncounterEnemy } from '../types/enemy'

interface Props {
  entry: EncounterEnemy
}

export default function EncounterEntry({ entry }: Props) {
  const [editingLabel, setEditingLabel] = useState(false)
  const updateEntry = useEncounterStore((s) => s.updateEntry)
  const duplicateEntry = useEncounterStore((s) => s.duplicateEntry)
  const removeEntry = useEncounterStore((s) => s.removeEntry)

  const defeated = entry.currentHp <= 0

  function update(patch: Partial<EncounterEnemy>) {
    updateEntry(entry.id, { ...entry, ...patch })
  }

  function handleHpClick(index: number) {
    const isFilled = index < entry.currentHp
    update({ currentHp: isFilled ? index : index + 1 })
  }

  return (
    <div
      className={`bg-gray-900 border rounded-lg p-4 transition-opacity ${
        defeated ? 'border-gray-800 opacity-40' : 'border-gray-600'
      }`}
    >
      {/* Header: label + action buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          {editingLabel ? (
            <input
              ref={(el) => el?.focus()}
              className="bg-gray-800 text-white font-bold text-base rounded px-2 py-0.5 w-full border border-amber-500 outline-none"
              value={entry.label}
              onChange={(e) => update({ label: e.target.value })}
              onBlur={() => setEditingLabel(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') setEditingLabel(false)
              }}
            />
          ) : (
            <button
              className="text-white font-bold text-base text-left hover:text-amber-400 transition-colors truncate max-w-full cursor-pointer"
              onClick={() => setEditingLabel(true)}
              title="Tap to rename"
            >
              {entry.label}
              {defeated && (
                <span className="ml-2 text-xs text-gray-500 font-normal italic">Defeated</span>
              )}
            </button>
          )}
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => duplicateEntry(entry.id)}
            title="Duplicate"
            className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer"
          >
            ⧉
          </button>
          <button
            onClick={() => removeEntry(entry.id)}
            title="Remove"
            className="text-sm bg-gray-800 hover:bg-red-950 text-gray-300 hover:text-red-300 w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* HP dots + Armor */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {Array.from({ length: entry.base.hp }, (_, i) => (
            <button
              key={i}
              onClick={() => handleHpClick(i)}
              title={i < entry.currentHp ? `Damage to ${i} HP` : `Heal to ${i + 1} HP`}
              className={`w-7 h-7 rounded-full border-2 transition-colors cursor-pointer ${
                i < entry.currentHp
                  ? 'bg-red-500 border-red-400 hover:bg-red-700 hover:border-red-700'
                  : 'bg-transparent border-gray-600 hover:border-gray-400'
              }`}
            />
          ))}
          <span className="text-sm text-gray-300 font-mono font-bold ml-1">
            {entry.currentHp}
            <span className="text-gray-500 font-normal">/{entry.base.hp}</span>
          </span>
        </div>

        {entry.base.armor && (
          <button
            onClick={() => update({ armorIntact: !entry.armorIntact })}
            title={entry.armorIntact ? 'Armor intact — tap to flip' : 'Armor flipped — tap to restore'}
            className={`text-sm px-2.5 py-1 rounded border font-bold transition-colors cursor-pointer ${
              entry.armorIntact
                ? 'bg-blue-950 border-blue-600 text-blue-300 hover:bg-blue-900'
                : 'bg-gray-800 border-gray-600 text-gray-500 hover:border-gray-500 hover:text-gray-400'
            }`}
          >
            🛡 {entry.armorIntact ? 'Armor' : 'Flipped'}
          </button>
        )}
      </div>

      {/* Stat reference badges */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 bg-sky-950 border border-sky-700 rounded px-2.5 py-1 text-xs">
          <span className="text-sky-400 font-bold tracking-wide">DEF</span>
          <span className="text-sky-100 font-mono font-bold text-sm">{entry.base.defense_threshold}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 bg-orange-950 border border-orange-700 rounded px-2.5 py-1 text-xs">
          <span className="text-orange-400 font-bold tracking-wide">ATK</span>
          <span className="text-orange-100 font-mono font-bold text-sm">{entry.base.attack_threshold}</span>
        </span>
        {entry.base.resistances.map((r) => (
          <span
            key={r}
            className="inline-flex items-center bg-purple-950 border border-purple-700 text-purple-200 px-2.5 py-1 rounded text-xs font-semibold"
          >
            RESISTS {r}
          </span>
        ))}
      </div>

      {/* Notes */}
      <input
        className="mt-3 w-full bg-gray-800 text-gray-200 text-sm rounded px-3 py-2 border border-gray-600 focus:border-gray-400 outline-none placeholder:text-gray-600"
        placeholder="Notes — location, condition, etc."
        value={entry.notes}
        onChange={(e) => update({ notes: e.target.value })}
      />
    </div>
  )
}
