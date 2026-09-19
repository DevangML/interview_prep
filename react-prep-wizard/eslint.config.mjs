import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

// Compatibility declaration for existing eslint-disable comments. The React
// compiler and TypeScript compiler remain the authoritative semantic checks.
const reactHooksCompat = {
  rules: {
    'exhaustive-deps': {
      meta: { type: 'problem', schema: [] },
      create: () => ({}),
    },
  },
};

/**
 * ESLint 9 flat config for the React workbench.
 * Parsing is deliberately type-aware only through TypeScript syntax; the
 * compiler and the dedicated typecheck script remain the authority for types.
 */
export default [
  {
    ignores: ['dist/**', '.tmp/**', 'backend/**', 'node_modules/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksCompat,
    },
    rules: {
      // Keep this gate focused and predictable; tsc owns type correctness.
      'no-debugger': 'error',
      'no-constant-condition': 'warn',
      // Existing source comments refer to this rule; keep it explicitly
      // defined while the compiler/typecheck remain the primary gates.
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];
