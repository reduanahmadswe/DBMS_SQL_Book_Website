/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const MDXContent: ComponentType<{ components?: Record<string, ComponentType<never>> }>;
  export default MDXContent;
}

declare module '*.sql?raw' {
  const content: string;
  export default content;
}

declare module 'sql.js/dist/sql-wasm-browser.wasm?url' {
  const url: string;
  export default url;
}
