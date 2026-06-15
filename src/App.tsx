import { useAppStore, selectView } from './store/appSlice'
import MonsterManual from './components/MonsterManual'
import EncounterView from './components/EncounterView'
import RegionView from './components/RegionView'

function TabBar() {
  const view = useAppStore(selectView)
  const setView = useAppStore((s) => s.setView)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-gray-950 border-t border-gray-800 flex">
      <button
        onClick={() => setView('regions')}
        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
          view === 'regions' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        World
      </button>
      <button
        onClick={() => setView('manual')}
        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
          view === 'manual' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        Monsters
      </button>
    </nav>
  )
}

export default function App() {
  const view = useAppStore(selectView)

  if (view === 'encounter') return <EncounterView />

  return (
    <div>
      {view === 'regions' ? <RegionView /> : <MonsterManual />}
      <TabBar />
    </div>
  )
}
