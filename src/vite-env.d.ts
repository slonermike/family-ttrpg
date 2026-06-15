/// <reference types="vite/client" />

declare module '*.md' {
  const data: Record<string, unknown>
  export default data
}
