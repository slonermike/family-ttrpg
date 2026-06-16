import { useNavigate } from 'react-router-dom'
import { useEncounterStore, useEncounter, selectAliveCount } from '../store/encounterSlice'
import EncounterEntry from './EncounterEntry'

export default function EncounterView() {
  const navigate = useNavigate()
  const encounter = useEncounter()
  const aliveCount = useEncounterStore(selectAliveCount)

  return (
    <div className="min-h-screen bg-gray-950 pb-28">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/monsters')}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium cursor-pointer"
        >
          ← Monsters
        </button>
        <h1 className="text-white font-bold text-lg">
          Encounter
          <span className="text-gray-600 font-normal text-sm ml-2">
            {aliveCount} alive / {encounter.length} total
          </span>
        </h1>
        <div className="w-16" />
      </header>

      <div className="p-4 space-y-3">
        {encounter.length === 0 ? (
          <p className="text-gray-700 text-center py-16 text-sm">
            No enemies yet. Tap below to add some.
          </p>
        ) : (
          encounter.map((entry) => <EncounterEntry key={entry.id} entry={entry} />)
        )}
      </div>

      <button
        onClick={() => navigate('/monsters')}
        className="fixed bottom-4 left-4 right-4 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
      >
        + Add Enemy
      </button>
    </div>
  )
}
