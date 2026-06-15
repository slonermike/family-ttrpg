import { useState } from 'react'
import { locations } from '../data/locations'
import MarkdownBody from './MarkdownBody'
import { npcMap } from '../data/npcs'
import type { Location, Scene } from '../types/location'
import type { Npc } from '../types/npc'
import NpcOverlay from './NpcOverlay'

const STATUS_BADGE: Record<string, string> = {
  'occupied-by-Dorogh': 'bg-red-900 text-red-300',
  visited: 'bg-gray-700 text-gray-300',
  'inaccessible-after-ceremony': 'bg-gray-800 text-gray-500',
}

export function LocationCard({ loc, onClick }: { loc: Location; onClick: () => void }) {
  const badge = STATUS_BADGE[loc.status] ?? 'bg-gray-700 text-gray-400'
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-bold text-base">{loc.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${badge}`}>
              {loc.status.replace(/-/g, ' ')}
            </span>
          </div>
          {loc.tagline && (
            <p className="text-gray-400 text-sm mt-1 leading-snug">{loc.tagline}</p>
          )}
          <p className="text-gray-600 text-xs mt-1.5 uppercase tracking-wider">{loc.type}</p>
        </div>
      </div>
    </button>
  )
}

export function SceneSection({
  scene,
  onNpcClick,
}: {
  scene: Scene
  onNpcClick: (npc: Npc) => void
}) {
  const [open, setOpen] = useState(false)

  const resolvedNpcs = scene.npcs
    .map((slug) => npcMap[slug])
    .filter((n): n is Npc => !!n)

  const sceneTypeBadge: Record<string, string> = {
    explorable: 'text-sky-500',
    event: 'text-violet-400',
    combat: 'text-red-400',
    approach: 'text-amber-500',
  }

  return (
    <section className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between px-4 py-3 bg-gray-900 hover:bg-gray-850 cursor-pointer text-left"
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-gray-200 font-bold text-sm tracking-wide">{scene.name}</h3>
            {scene.type && (
              <span className={`text-xs font-medium uppercase tracking-wider ${sceneTypeBadge[scene.type] ?? 'text-gray-500'}`}>
                {scene.type}
              </span>
            )}
          </div>
          {scene.tagline && !open && (
            <p className="text-gray-500 text-xs mt-0.5 leading-snug">{scene.tagline}</p>
          )}
        </div>
        <span className={`text-gray-500 text-xs transition-transform shrink-0 mt-0.5 ${open ? '' : '-rotate-90'}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 bg-gray-950 space-y-3">
          {scene.tagline && (
            <p className="text-amber-400/80 text-sm italic leading-snug">{scene.tagline}</p>
          )}

          {scene.description && (
            <MarkdownBody className="prose-p:text-gray-400 prose-strong:text-gray-200 prose-em:text-gray-400">
              {scene.description}
            </MarkdownBody>
          )}

          {scene.gm_notes && (
            <div className="border-l-2 border-amber-900 pl-3 mt-3">
              <p className="text-xs text-amber-700 uppercase tracking-widest mb-1.5 font-medium">GM</p>
              <MarkdownBody className="prose-p:text-amber-200/60 prose-strong:text-amber-200/80 prose-em:text-amber-200/60 prose-li:text-amber-200/60">
                {scene.gm_notes}
              </MarkdownBody>
            </div>
          )}

          {resolvedNpcs.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {resolvedNpcs.map((npc) => (
                <button
                  key={npc.slug}
                  onClick={() => onNpcClick(npc)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer"
                >
                  {npc.name}
                  {npc.status === 'imprisoned' && (
                    <span className="ml-1.5 text-amber-500 text-xs">⛓</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {scene.encounters && scene.encounters.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {scene.encounters.map((enc) => (
                <div
                  key={enc.name}
                  className="text-xs text-gray-600 border border-gray-800 rounded px-2 py-1"
                >
                  ⚔ {enc.name}{' '}
                  <span className="text-gray-700">
                    ({enc.enemies.map((e) => `${e.count}× ${e.slug}`).join(', ')})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export function LocationDetail({
  loc,
  onBack,
  backLabel = 'Locations',
}: {
  loc: Location
  onBack: () => void
  backLabel?: string
}) {
  const [activeNpc, setActiveNpc] = useState<Npc | null>(null)

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium shrink-0 cursor-pointer"
        >
          ← {backLabel}
        </button>
        <h1 className="text-white font-bold text-xl">{loc.name}</h1>
      </header>

      {loc.tagline && (
        <div className="px-4 pt-4 pb-0">
          <p className="text-amber-400/80 text-sm italic leading-snug">{loc.tagline}</p>
        </div>
      )}

      <div className="p-4 space-y-3">
        {loc.scenes.map((scene) => (
          <SceneSection key={scene.name} scene={scene} onNpcClick={setActiveNpc} />
        ))}
      </div>

      {loc.description && (
        <div className="mx-4 mb-4 border-l-2 border-gray-700 pl-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">Overview</p>
          <MarkdownBody className="prose-p:text-gray-400 prose-strong:text-gray-300 prose-headings:text-gray-400">
            {loc.description}
          </MarkdownBody>
        </div>
      )}

      {activeNpc && <NpcOverlay npc={activeNpc} onClose={() => setActiveNpc(null)} />}
    </div>
  )
}

export default function LocationsView() {
  const [selected, setSelected] = useState<Location | null>(null)

  if (selected) {
    return <LocationDetail loc={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3">
        <h1 className="text-white font-bold text-xl">Locations</h1>
      </header>

      <div className="p-4 space-y-3">
        {locations.map((loc) => (
          <LocationCard key={loc.slug} loc={loc} onClick={() => setSelected(loc)} />
        ))}
      </div>
    </div>
  )
}
