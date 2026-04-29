/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE44_API_KEY: string
  readonly VITE_BASE44_BASE_URL: string
  readonly VITE_BASE44_MODEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
