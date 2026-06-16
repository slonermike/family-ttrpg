import { useParams, useNavigate } from 'react-router-dom'
import { useEncounterStore } from '../store/encounterSlice'
import { enemyMap } from '../data/enemies'
import EnemyStats from './EnemyStats'
import MarkdownBody from './MarkdownBody'

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

export default function EnemyPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const addEnemy = useEncounterStore((s) => s.addEnemy)
  const enemy = slug ? enemyMap[slug] : null

  if (!enemy) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">Enemy not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-28">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium shrink-0 cursor-pointer"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-white font-bold text-xl leading-tight">{enemy.name}</h1>
          <span
            className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${tierStyle[enemy.tier] ?? 'bg-gray-800 border border-gray-600 text-gray-300'}`}
          >
            {tierLabel[enemy.tier] ?? enemy.tier.toUpperCase()}
          </span>
        </div>
      </header>

      <div className="px-5 py-4 space-y-4">
        <EnemyStats enemy={enemy} />

        {enemy.description && (
          <MarkdownBody className="prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-100 prose-em:text-gray-300 prose-li:text-gray-300">
            {enemy.description}
          </MarkdownBody>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-gray-950 border-t border-gray-800">
        <button
          onClick={() => { addEnemy(enemy); navigate('/encounter') }}
          className="w-full bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
        >
          + Add to Encounter
        </button>
      </div>
    </div>
  )
}
