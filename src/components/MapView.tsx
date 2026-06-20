import { useParams, useNavigate } from 'react-router-dom'
import { maps, mapMap } from '../data/maps'
import { MapCanvas } from './MapCanvas'

export function MapListView() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-xl font-bold text-white">Maps</h1>
      </div>
      <div className="px-4 flex flex-col gap-3 mt-2">
        {maps.length === 0 && (
          <p className="text-gray-500 text-sm italic">No maps yet.</p>
        )}
        {maps.map((map) => (
          <button
            key={map.slug}
            onClick={() => navigate(`/maps/${map.slug}`)}
            className="w-full text-left bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 hover:border-gray-600 transition-colors cursor-pointer"
          >
            <p className="text-white font-semibold">{map.name}</p>
            {map.description && (
              <p className="text-gray-400 text-sm mt-0.5 line-clamp-2">{map.description}</p>
            )}
            <p className="text-gray-600 text-xs mt-1">
              {map.width}×{map.height} · {map.layers.length} layer{map.layers.length !== 1 ? 's' : ''}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export function MapDetailView() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const map = slug ? mapMap[slug] : undefined

  if (!map) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-gray-500">Map not found.</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-950 border-b border-gray-800 shrink-0 z-10">
        <button
          onClick={() => navigate('/maps')}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Maps
        </button>
        <h1 className="text-white font-semibold text-sm">{map.name}</h1>
      </div>
      {/* Full-screen canvas */}
      <div className="flex-1 relative">
        <MapCanvas map={map} />
      </div>
    </div>
  )
}
