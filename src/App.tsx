import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import MonsterManual from './components/MonsterManual'
import EncounterView from './components/EncounterView'
import RegionView, { RegionDetailRoute } from './components/RegionView'
import { LocationDetailRoute } from './components/LocationsView'
import NpcPage from './components/NpcOverlay'
import EnemyPage from './components/EnemyOverlay'
import ItemsView from './components/ItemsView'
import ItemPage from './components/ItemPage'
import PrintView from './components/PrintView'
import { MapListView, MapDetailView } from './components/MapView'

// Module-level: remember last visited path within each section
let lastWorldPath = '/world'
let lastMapsPath = '/maps'
let lastItemsPath = '/items'
let lastMonstersPath = '/monsters'

function TabBar() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const fullPath = pathname + search

  if (pathname.startsWith('/world')) lastWorldPath = fullPath
  if (pathname.startsWith('/maps')) lastMapsPath = fullPath
  if (pathname.startsWith('/items')) lastItemsPath = fullPath
  if (pathname.startsWith('/monsters')) lastMonstersPath = fullPath

  const isWorld = pathname.startsWith('/world') || pathname.startsWith('/npc')
  const isMaps = pathname.startsWith('/maps')
  const isItems = pathname.startsWith('/items')
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
        onClick={() => navigate(lastMapsPath)}
        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
          isMaps ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        Maps
      </button>
      <button
        onClick={() => navigate(lastItemsPath)}
        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
          isItems ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        Items
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
  const hideTab = pathname === '/encounter' || pathname === '/print' || pathname.startsWith('/maps/')

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/world" replace />} />
        <Route path="/world" element={<RegionView />} />
        <Route path="/world/:regionSlug" element={<RegionDetailRoute />} />
        <Route path="/world/:regionSlug/:locationSlug" element={<LocationDetailRoute />} />
        <Route path="/npc/:slug" element={<NpcPage />} />
        <Route path="/items" element={<ItemsView />} />
        <Route path="/items/:slug" element={<ItemPage />} />
        <Route path="/print" element={<PrintView />} />
        <Route path="/monsters" element={<MonsterManual />} />
        <Route path="/monsters/:slug" element={<EnemyPage />} />
        <Route path="/encounter" element={<EncounterView />} />
        <Route path="/maps" element={<MapListView />} />
        <Route path="/maps/:slug" element={<MapDetailView />} />
      </Routes>
      {!hideTab && <TabBar />}
    </div>
  )
}
