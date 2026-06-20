// Remark plugin: custom GM block conventions for narration, dialog, and collapsible sections.
// Run after remark-directive so containerDirective nodes are already in the tree.
//
// Blockquote syntax (single-paragraph GM speech):
//   > [!NARRATION]
//   > The streets get quieter.
//
//   > [!DIALOG]
//   > **Jorik:** "Still working."
//
// Collapsible section (multi-paragraph GM notes):
//   :::details[GM Background]
//   He arrived three years before the fog...
//
//   > [!NARRATION]
//   > The forge was already his by then.
//   :::

const BLOCKQUOTE_PREFIX = /^\[!(NARRATION|DIALOG)\]\s*/

function processBlockquote(node: any) {
  const firstParagraph = node.children?.[0]
  if (firstParagraph?.type !== 'paragraph') return

  const firstInline = firstParagraph.children?.[0]
  if (firstInline?.type !== 'text') return

  const match = firstInline.value.match(BLOCKQUOTE_PREFIX)
  if (!match) return

  const type = match[1].toLowerCase() // 'narration' | 'dialog'

  // Strip the [!TYPE] prefix from the first text node
  firstInline.value = firstInline.value.slice(match[0].length)

  // Remove any leading empty text or break nodes left after stripping
  while (firstParagraph.children.length > 0) {
    const head = firstParagraph.children[0]
    if ((head.type === 'text' && !head.value) || head.type === 'break') {
      firstParagraph.children.shift()
    } else {
      break
    }
  }

  // If the first paragraph is now empty, remove it entirely
  if (firstParagraph.children.length === 0) {
    node.children.shift()
  }

  node.data = node.data || {}
  node.data.hProperties = {
    ...(node.data.hProperties || {}),
    className: ['gm-block', `gm-block-${type}`],
  }
}

function processInlineDirective(node: any) {
  if (!['npc', 'enemy', 'item', 'map'].includes(node.name)) return
  const slug = node.children?.map((c: any) => c.value ?? '').join('').trim() ?? ''
  if (!slug) return
  node.data = node.data || {}
  const hNameMap: Record<string, string> = { npc: 'npc-pill', enemy: 'enemy-pill', item: 'item-pill', map: 'map-pill' }
  node.data.hName = hNameMap[node.name]
  node.data.hProperties = { slug }
}

function processDetailsDirective(node: any) {
  // remark-directive puts [Label] content in a directiveLabel child node
  const labelNode = node.children?.find((c: any) => c.data?.directiveLabel)
  const label = labelNode
    ? labelNode.children?.map((c: any) => c.value ?? '').join('') ?? ''
    : ''

  // Split "Title | Subtitle" on pipe — both parts are optional
  const pipeIdx = label.indexOf('|')
  const title = (pipeIdx === -1 ? label : label.slice(0, pipeIdx)).trim()
  const subtitle = (pipeIdx === -1 ? '' : label.slice(pipeIdx + 1)).trim()

  // Remove the label node — title/subtitle go into hProperties
  if (labelNode) {
    node.children.splice(node.children.indexOf(labelNode), 1)
  }

  node.data = node.data || {}
  node.data.hName = 'details'
  node.data.hProperties = { className: ['gm-details'], title, subtitle }
}

export function remarkGmBlocks() {
  return (tree: any) => {
    function walk(children: any[]) {
      for (const node of children) {
        if (node.type === 'blockquote') processBlockquote(node)
        if (node.type === 'containerDirective' && node.name === 'details') {
          processDetailsDirective(node)
        }
        if (node.type === 'textDirective') processInlineDirective(node)
        if (node.children?.length) walk(node.children)
      }
    }
    if (tree.children?.length) walk(tree.children)
  }
}
