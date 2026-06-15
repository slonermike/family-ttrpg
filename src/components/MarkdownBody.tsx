import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkDirective from 'remark-directive'
import { remarkGmBlocks } from '../lib/remarkGmBlocks'

const Blockquote = ({ children, node }: { children?: React.ReactNode; node?: any }) => {
  const classes: string[] = Array.isArray(node?.properties?.className)
    ? node.properties.className
    : []

  if (classes.includes('gm-block-dialog')) {
    return (
      <div className="not-prose bg-amber-950/40 border-l-2 border-amber-500 rounded-r px-3 py-2 my-2">
        <div className="text-amber-100 text-sm leading-relaxed [&_strong]:text-amber-300 [&_strong]:font-semibold">
          {children}
        </div>
      </div>
    )
  }

  if (classes.includes('gm-block-narration')) {
    return (
      <div className="not-prose bg-slate-800 border-l-2 border-sky-500 rounded-r px-3 py-2 my-2">
        <p className="text-xs text-sky-500 uppercase tracking-widest mb-1 font-medium">Narration</p>
        <div className="italic text-slate-100 text-sm leading-relaxed">{children}</div>
      </div>
    )
  }

  return (
    <div className="not-prose border-l-2 border-gray-700 pl-3 my-2 text-gray-400 text-sm italic">
      {children}
    </div>
  )
}

const Details = ({
  children,
  title,
  subtitle,
  node: _node,
}: {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  node?: unknown
}) => (
  <details className="not-prose my-3 border border-gray-800 rounded group">
    <summary className="list-none cursor-pointer px-3 py-2 select-none hover:bg-gray-900/50 transition-colors rounded-t">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-gray-400 transition-transform group-open:rotate-90 shrink-0">▶</span>
        <div>
          <span className="text-xs text-gray-200 uppercase tracking-widest font-medium group-open:text-gray-500 transition-colors">
            {title || 'Details'}
          </span>
          {subtitle && (
            <p className="text-xs text-gray-400 normal-case tracking-normal font-normal mt-0.5 group-open:text-gray-600 transition-colors">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </summary>
    <div className="px-3 pb-3 pt-2 border-t border-gray-800 prose prose-invert prose-sm max-w-none prose-p:my-1">
      {children}
    </div>
  </details>
)

const components: Components = {
  blockquote: Blockquote as Components['blockquote'],
  details: Details as unknown as Components['details'],
}

const remarkPlugins = [remarkDirective, remarkGmBlocks]

interface Props {
  children: string
  className?: string
}

export default function MarkdownBody({ children, className = '' }: Props) {
  return (
    <div className={`prose prose-invert prose-sm max-w-none prose-p:my-1 ${className}`}>
      <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
