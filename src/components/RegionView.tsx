import { useState } from 'react'
import { regions } from '../data/regions'
import { locations } from '../data/locations'
import type { Region } from '../types/region'
import type { Location } from '../types/location'
import type { Npc } from '../types/npc'
import { LocationCard, LocationDetail, SceneSection } from './LocationsView'
import NpcOverlay from './NpcOverlay'

type Nav =
  | { level: 'list' }
  | { level: 'region'; region: Region }
  | { level: 'location'; region: Region; location: Location }

function RegionCard({ region, onClick }: { region: Region; onClick: () => void }) {
  const locationCount = locations.filter((l) => l.region === region.slug).length

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer"
    >
      <h3 className="text-white font-bold text-base">{region.name}</h3>
      {region.tagline && (
        <p className="text-gray-400 text-sm mt-1 leading-snug">{region.tagline}</p>
      )}
      <p className="text-gray-600 text-xs mt-1.5">
        {locationCount} location{locationCount !== 1 ? 's' : ''} · {region.scenes.length} regional scene{region.scenes.length !== 1 ? 's' : ''}
      </p>
    </button>
  )
}

function RegionDetail({
  region,
  onBack,
  onLocationClick,
}: {
  region: Region
  onBack: () => void
  onLocationClick: (loc: Location) => void
}) {
  const [activeNpc, setActiveNpc] = useState<Npc | null>(null)
  const regionLocations = locations.filter((l) => l.region === region.slug)

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium shrink-0 cursor-pointer"
        >
          ← Regions
        </button>
        <h1 className="text-white font-bold text-xl">{region.name}</h1>
      </header>

      {region.tagline && (
        <div className="px-4 pt-4 pb-0">
          <p className="text-amber-400/80 text-sm italic leading-snug">{region.tagline}</p>
        </div>
      )}

      {region.scenes.length > 0 && (
        <div className="p-4 space-y-3">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1">Regional Scenes</p>
          {region.scenes.map((scene) => (
            <SceneSection key={scene.name} scene={scene} onNpcClick={setActiveNpc} />
          ))}
        </div>
      )}

      {regionLocations.length > 0 && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-medium px-1 mt-1">Locations</p>
          {regionLocations.map((loc) => (
            <LocationCard key={loc.slug} loc={loc} onClick={() => onLocationClick(loc)} />
          ))}
        </div>
      )}

      {region.description && (
        <div className="mx-4 mb-4 border-l-2 border-gray-800 pl-4">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-2 font-medium">Overview</p>
          <p className="text-gray-500 text-sm leading-relaxed">{region.description}</p>
        </div>
      )}

      {activeNpc && <NpcOverlay npc={activeNpc} onClose={() => setActiveNpc(null)} />}
    </div>
  )
}

export default function RegionView() {
  const [nav, setNav] = useState<Nav>({ level: 'list' })

  if (nav.level === 'location') {
    return (
      <LocationDetail
        loc={nav.location}
        onBack={() => setNav({ level: 'region', region: nav.region })}
        backLabel={nav.region.name}
      />
    )
  }

  if (nav.level === 'region') {
    return (
      <RegionDetail
        region={nav.region}
        onBack={() => setNav({ level: 'list' })}
        onLocationClick={(loc) => setNav({ level: 'location', region: nav.region, location: loc })}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3">
        <h1 className="text-white font-bold text-xl">World</h1>
      </header>

      <div className="p-4 space-y-3">
        {regions.map((region) => (
          <RegionCard
            key={region.slug}
            region={region}
            onClick={() => setNav({ level: 'region', region })}
          />
        ))}
      </div>
    </div>
  )
}
