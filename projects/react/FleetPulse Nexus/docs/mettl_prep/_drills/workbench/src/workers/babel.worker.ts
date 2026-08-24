import * as Comlink from 'comlink';

declare function importScripts(...urls: string[]): void;

// Load Babel from the vendored file (one directory up from workbench)
importScripts('/vendor/babel.min.js');

declare const Babel: {
  transform(code: string, opts: Record<string, unknown>): { code: string };
};

const IMPORT_RE = /^import\s+.*?from\s+['"]([^'"]+)['"]/gm;
const EXPORT_RE = /export\s+default\s+/;

const ALLOWED: Record<string, string> = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-dom/client': 'ReactDOM',
};

function resolveImports(code: string): string {
  return code.replace(IMPORT_RE, (match, mod: string) => {
    const global = ALLOWED[mod];
    if (!global) return `/* blocked: ${mod} */`;
    // Convert `import X from 'mod'` → `const X = globalThis.mod`
    const names = match
      .replace(/^import\s+/, '')
      .replace(/\s+from\s+['"][^'"]+['"]$/, '');
    if (names.startsWith('{')) {
      // named imports
      return `const ${names} = ${global};`;
    }
    return `const ${names.split(',')[0].trim()} = ${global};`;
  });
}

function extractDefault(code: string): string {
  return code.replace(EXPORT_RE, 'const __DEFAULT__ = ');
}

const api = {
  compile(code: string): { code?: string; error?: string } {
    try {
      let processed = resolveImports(code);
      processed = extractDefault(processed);

      const result = Babel.transform(processed, {
        presets: ['react'],
        filename: 'component.jsx',
      });

      let out = result.code;
      // Append a render call if the component was exported
      if (code.match(EXPORT_RE)) {
        out += '\n;__DEFAULT__;';
      }

      return { code: out };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { error: msg };
    }
  },
};

Comlink.expose(api);
