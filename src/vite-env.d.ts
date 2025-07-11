/// <reference types="vite/client" />

// SCSS modules type declarations
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

// Environment variables type declarations
interface ImportMetaEnv {
  readonly VITE_AIRTABLE_API_KEY: string
  readonly VITE_AIRTABLE_BASE_ID: string
  readonly VITE_AIRTABLE_TABLE_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 