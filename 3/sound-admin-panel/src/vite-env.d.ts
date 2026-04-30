/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@primevue/themes/aura' {
  const Aura: any
  export default Aura
}

declare module 'primevue/password' {
  const Password: any
  export default Password
}

declare module '*.css' {
  const content: string
  export default content
}

interface ImportMetaEnv {
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
