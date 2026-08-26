import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// One definition, overridable per environment. Both dev and preview proxy here.
const API_TARGET = process.env.API_TARGET ?? 'http://localhost:8777';


/**
 * When the API is not running, Vite's proxy answers with a bare HTML 500.
 * The client then tried to JSON.parse it and reported a syntax error, which is
 * how "the backend is down" turned into "Unexpected token 'I'". The dev proxy
 * now fails in the same envelope the API itself uses.
 */
const apiProxy = (target: string) => ({
  target,
  changeOrigin: true,
  configure: (proxy: { on: (e: string, cb: (err: Error, req: unknown, res: unknown) => void) => void }) => {
    proxy.on('error', (err, _req, res) => {
      const response = res as {
        writeHead?: (code: number, headers: Record<string, string>) => void;
        end?: (body: string) => void;
        writableEnded?: boolean;
      };
      if (!response?.writeHead || response.writableEnded) return;
      response.writeHead(503, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({
        error: {
          code: 'api_unreachable',
          message: `Cannot reach the API at ${target}. Start it with: cd backend && ./start.sh`,
          status: 503,
          detail: err.message,
        },
      }));
    });
  },
});

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', { target: '19' }],
        ],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  preview: {
    port: 4173,
    proxy: { '/api': apiProxy(API_TARGET) },
  },
  server: {
    port: 5173,
    proxy: { '/api': apiProxy(API_TARGET) },
  },
  build: {
    // Was '../dist' — a sub-app writing build artefacts into the parent repo,
    // which is why a 1.6 MB bundle kept appearing in the root git status.
    // A module's output belongs inside the module.
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Three chunks with genuinely different change rates, so a content edit
        // does not invalidate the editor and a React upgrade does not
        // invalidate the drills.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-icons': ['lucide-react'],
          'vendor-web-llm': ['@mlc-ai/web-llm'],
          'vendor-editor': [
            '@uiw/react-codemirror', '@codemirror/state', '@codemirror/view',
            '@codemirror/language', '@codemirror/lang-css',
            '@codemirror/lang-javascript', '@codemirror/lang-html',
            '@codemirror/autocomplete', '@codemirror/commands',
            '@codemirror/lint', '@codemirror/search',
          ],
        },
      },
    },
  },
});
