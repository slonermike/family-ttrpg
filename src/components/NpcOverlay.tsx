import { useParams, useNavigate } from 'react-router-dom'
import { npcMap } from '../data/npcs'
import MarkdownBody from './MarkdownBody'

const STATUS_COLOR: Record<string, string> = {
  active: 'text-emerald-400',
  imprisoned: 'text-amber-400',
  dead: 'text-red-500',
  missing: 'text-gray-500',
}

export default function NpcPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const npc = slug ? npcMap[slug] : null

  if (!npc) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">NPC not found.</p>
      </div>
    )
  }

  const statusColor = STATUS_COLOR[npc.status] ?? 'text-gray-400'

  return (
    <div className="min-h-screen bg-gray-950 pb-24">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium shrink-0 cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-white font-bold text-xl leading-tight">{npc.name}</h1>
      </header>

      <div className="px-5 py-4 space-y-4">
        {npc.tagline && (
          <p className="text-amber-400/80 text-sm italic leading-snug">{npc.tagline}</p>
        )}

        {npc.voice && (
          <div className="bg-gray-800 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Voice</p>
            <p className="text-gray-200 text-sm italic">{npc.voice}</p>
          </div>
        )}

        {npc.description && (
          <MarkdownBody className="prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-100 prose-em:text-gray-300 prose-li:text-gray-300">
            {npc.description}
          </MarkdownBody>
        )}

        <div className="flex flex-wrap gap-3 text-sm pt-1 border-t border-gray-800">
          <span className={`font-medium ${statusColor}`}>{npc.status}</span>
          {npc.role && <span className="text-gray-500">{npc.role}</span>}
          {npc.fruit && (
            <span className="text-amber-300">
              <span className="text-gray-600 mr-1">fruit</span>
              {npc.fruit}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
