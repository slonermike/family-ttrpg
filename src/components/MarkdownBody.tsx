import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

const Blockquote = ({ children }: { children?: React.ReactNode }) => (
  <div className="bg-slate-800 border-l-2 border-sky-500 rounded-r px-3 py-2 my-2 not-italic">
    <p className="text-xs text-sky-500 uppercase tracking-widest mb-1 font-medium">Narration</p>
    <div className="italic text-slate-100 text-sm leading-relaxed">{children}</div>
  </div>
)

const components: Components = {
  blockquote: Blockquote as Components['blockquote'],
}

interface Props {
  children: string
  className?: string
}

export default function MarkdownBody({ children, className = '' }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  )
}
