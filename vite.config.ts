import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import matter from 'gray-matter'

// Transforms *.md files into typed JS modules at build time (Node.js).
// Each file becomes: export default { ...frontmatterFields, description: bodyText }
// This runs in Node.js where gray-matter works correctly — no browser Buffer issue.
function mdFrontmatter(): Plugin {
  return {
    name: 'md-frontmatter',
    transform(src, id) {
      if (!id.endsWith('.md')) return
      const { data, content } = matter(src)
      return {
        code: `export default ${JSON.stringify({ ...data, description: content.trim() })}`,
        map: null,
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), mdFrontmatter()],
})
