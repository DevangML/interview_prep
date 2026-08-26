import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

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
    proxy: {
      '/api': 'http://localhost:8777',
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8777',
    },
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
