import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import MonsterManual from './components/MonsterManual'
import EncounterView from './components/EncounterView'
import RegionView, { RegionDetailRoute } from './components/RegionView'
import { LocationDetailRoute } from './components/LocationsView'
import NpcPage from './components/NpcOverlay'
import EnemyPage from './components/EnemyOverlay'

// Module-level: remember last visited path within each section
let lastWorldPath = '/world'
let lastMonstersPath = '/monsters'

function TabBar() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const fullPath = pathname + search

  if (pathname.startsWith('/world')) lastWorldPath = fullPath
  if (pathname.startsWith('/monsters')) lastMonstersPath = fullPath

  const isWorld = pathname.startsWith('/world') || pathname.startsWith('/npc')
  const isMonsters = pathname.startsWith('/monsters')

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-gray-950 border-t border-gray-800 flex">
      <button
        onClick={() => navigate(lastWorldPath)}
        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
          isWorld ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        World
      </button>
      <button
        onClick={() => navigate(lastMonstersPath)}
        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
          isMonsters ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        Monsters
      </button>
    </nav>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const hideTab = pathname === '/encounter'

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/world" replace />} />
        <Route path="/world" element={<RegionView />} />
        <Route path="/world/:regionSlug" element={<RegionDetailRoute />} />
        <Route path="/world/:regionSlug/:locationSlug" element={<LocationDetailRoute />} />
        <Route path="/npc/:slug" element={<NpcPage />} />
        <Route path="/monsters" element={<MonsterManual />} />
        <Route path="/monsters/:slug" element={<EnemyPage />} />
        <Route path="/encounter" element={<EncounterView />} />
      </Routes>
      {!hideTab && <TabBar />}
    </div>
  )
}
