/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form endpoint, e.g. https://formspree.io/f/xxxxxxxx */
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  /** Web3Forms access key, e.g. 4f1c...-...-... */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
