import { useParams, useNavigate } from 'react-router-dom'
import { usePrintStore } from '../store/printSlice'
import { itemMap } from '../data/items'
import { typeStyle, typeLabel } from './ItemCard'
import MarkdownBody from './MarkdownBody'

export default function ItemPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const addItem = usePrintStore((s) => s.addItem)
  const item = slug ? itemMap[slug] : null

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">Item not found.</p>
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
          <h1 className="text-white font-bold text-xl leading-tight">{item.name}</h1>
          <span
            className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${typeStyle[item.type] ?? 'bg-gray-800 border border-gray-600 text-gray-300'}`}
          >
            {typeLabel[item.type] ?? item.type.toUpperCase()}
          </span>
          {item.consumable && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-400 font-mono">
              CONSUMABLE
            </span>
          )}
        </div>
      </header>

      <div className="px-5 py-4 space-y-4">
        <div className="bg-amber-950/30 border border-amber-800/50 rounded-lg px-4 py-3">
          <p className="text-xs text-amber-500 uppercase tracking-widest font-medium mb-1">Effect</p>
          <p className="text-amber-100 text-sm leading-relaxed">{item.effect}</p>
        </div>

        {item.tagline && (
          <p className="text-gray-400 italic text-sm">{item.tagline}</p>
        )}

        {item.description && (
          <MarkdownBody className="prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-100 prose-em:text-gray-300 prose-li:text-gray-300">
            {item.description}
          </MarkdownBody>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-gray-950 border-t border-gray-800">
        <button
          onClick={() => { addItem(item); navigate('/print') }}
          className="w-full bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
        >
          + Add to Print
        </button>
      </div>
    </div>
  )
}
