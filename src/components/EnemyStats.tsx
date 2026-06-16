import type { Enemy } from '../types/enemy'

interface Props {
  enemy: Enemy
}

export default function EnemyStats({ enemy }: Props) {
  return (
    <>
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
    </>
  )
}
