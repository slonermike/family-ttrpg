import { useNavigate } from 'react-router-dom'
import { usePrintStore, usePrint } from '../store/printSlice'
import { typeStyle, typeLabel } from './ItemCard'

export default function PrintView() {
  const navigate = useNavigate()
  const print = usePrint()
  const setQty = usePrintStore((s) => s.setQty)
  const removeItem = usePrintStore((s) => s.removeItem)
  const clearPrint = usePrintStore((s) => s.clearPrint)

  return (
    <div className="min-h-screen bg-gray-950 pb-8 print:bg-white print:pb-0">
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-700 px-4 py-3 flex items-center justify-between print:hidden">
        <button
          onClick={() => navigate('/items')}
          className="text-amber-500 hover:text-amber-400 text-sm font-medium cursor-pointer"
        >
          ← Items
        </button>
        <h1 className="text-white font-bold text-lg">Print Sheet</h1>
        <div className="flex items-center gap-2">
          {print.length > 0 && (
            <button
              onClick={clearPrint}
              className="text-gray-500 hover:text-gray-300 text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Print
          </button>
        </div>
      </header>

      {print.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center print:hidden">
          <p className="text-gray-600 text-sm">No items yet.</p>
          <p className="text-gray-700 text-xs mt-1">Browse items and tap + Add to Print.</p>
          <button
            onClick={() => navigate('/items')}
            className="mt-6 text-amber-500 hover:text-amber-400 text-sm cursor-pointer"
          >
            Browse Items →
          </button>
        </div>
      ) : (
        <>
          {/* Screen view: editable queue */}
          <div className="p-4 space-y-3 print:hidden">
            {print.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-start gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold text-base">{entry.base.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${typeStyle[entry.base.type] ?? 'bg-gray-800 border border-gray-600 text-gray-300'}`}
                    >
                      {typeLabel[entry.base.type] ?? entry.base.type.toUpperCase()}
                    </span>
                    {entry.base.consumable && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-400 font-mono">
                        CONSUMABLE
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-1 leading-snug">{entry.base.effect}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeItem(entry.id)}
                    className="text-gray-600 hover:text-gray-400 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(entry.id, entry.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded cursor-pointer text-sm"
                    >
                      −
                    </button>
                    <span className="text-white text-sm font-mono w-4 text-center">{entry.qty}</span>
                    <button
                      onClick={() => setQty(entry.id, entry.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded cursor-pointer text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Print view: card grid */}
          <div className="hidden print:block p-4">
            <div className="grid grid-cols-3 gap-3">
              {print.flatMap((entry) =>
                Array.from({ length: entry.qty }, (_, i) => (
                  <div
                    key={`${entry.id}-${i}`}
                    className="border border-gray-400 rounded p-3 break-inside-avoid aspect-square"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-bold text-sm text-black leading-tight">{entry.base.name}</span>
                      <span className="text-xs font-mono text-gray-600 uppercase shrink-0">
                        {typeLabel[entry.base.type] ?? entry.base.type}
                      </span>
                    </div>
                    {entry.base.consumable && (
                      <span className="text-xs text-gray-600 uppercase tracking-wide">Consumable · </span>
                    )}
                    <p className="text-xs text-gray-800 leading-snug mt-1">{entry.base.effect}</p>
                    {entry.base.tagline && (
                      <p className="text-xs text-gray-500 italic mt-1 leading-snug">{entry.base.tagline}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
