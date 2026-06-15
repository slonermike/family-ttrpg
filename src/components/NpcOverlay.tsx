import { useEffect } from 'react'
import type { Npc } from '../types/npc'
import MarkdownBody from './MarkdownBody'

interface Props {
  npc: Npc
  onClose: () => void
}

const STATUS_COLOR: Record<string, string> = {
  active: 'text-emerald-400',
  imprisoned: 'text-amber-400',
  dead: 'text-red-500',
  missing: 'text-gray-500',
}

export default function NpcOverlay({ npc, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const statusColor = STATUS_COLOR[npc.status] ?? 'text-gray-400'

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/70 cursor-default"
        aria-label="Close"
      />

      <div className="relative mt-auto bg-gray-900 rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl border-t border-gray-700">
        <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-gray-800">
          <div>
            <h2 className="text-white font-bold text-xl leading-tight">{npc.name}</h2>
            {npc.tagline && (
              <p className="text-amber-400/80 text-sm italic mt-0.5 leading-snug">{npc.tagline}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 text-2xl leading-none ml-4 mt-0.5 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
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
            {npc.role && (
              <span className="text-gray-500">{npc.role}</span>
            )}
            {npc.fruit && (
              <span className="text-amber-300">
                <span className="text-gray-600 mr-1">fruit</span>
                {npc.fruit}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
