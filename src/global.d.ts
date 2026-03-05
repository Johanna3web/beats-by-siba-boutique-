// Image modules
declare module '*.jpg' { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.png' { const src: string; export default src; }
declare module '*.gif' { const src: string; export default src; }
declare module '*.webp' { const src: string; export default src; }
declare module '*.svg' { const src: string; export default src; }

// Common packages used in the project — stubbed to avoid installing types
declare module 'framer-motion';
declare module '@tanstack/react-query';
declare module 'react-router-dom';
declare module 'sonner';
declare module '@supabase/supabase-js';
declare module '@radix-ui/*';
declare module '@hookform/*';
declare module 'react-day-picker';
declare module 'react-resizable-panels';
declare module 'embla-carousel-react';
declare module 'recharts';

// Path aliases
declare module '@/*';
declare module '@/assets/*';

// Minimal React/JSX runtime stubs
declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

declare module 'react' {
  export type ReactNode = any;
  export type ComponentType<P = any> = (props: P) => any;
  export function useState<T = any>(initial?: T): [T, (v: any) => void];
  export function useEffect(fn: () => void | (() => void), deps?: any[]): void;
  const React: any;
  export default React;
}

declare module 'react-dom' {
  const ReactDOM: any;
  export default ReactDOM;
}

// Catch-all fallback: any untyped module resolves to `any`
declare module '*'
{
  const value: any;
  export default value;
}

export {};

declare namespace JSX {
  // Allow any intrinsic elements and attributes
  interface IntrinsicElements {
    [elemName: string]: any;
  }

  interface Element { }
  interface ElementClass { }
  interface ElementAttributesProperty { }
  interface ElementChildrenAttribute { }
}

// Provide a global React namespace for type references like `React.FormEvent`.
declare namespace React {
  type ReactNode = any;
  type ComponentProps<T = any> = any;
  type FormEvent = any;
  interface PropsWithChildren<T = any> { children?: ReactNode };
}

// Vite import.meta.env shim
interface ImportMetaEnv {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
