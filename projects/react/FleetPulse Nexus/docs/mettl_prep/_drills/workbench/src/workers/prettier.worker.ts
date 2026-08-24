import * as Comlink from 'comlink';

declare function importScripts(...urls: string[]): void;

importScripts('/vendor/prettier-standalone.js');
importScripts('/vendor/prettier-babel.js');
importScripts('/vendor/prettier-estree.js');
importScripts('/vendor/prettier-postcss.js');

declare const prettier: {
  format(code: string, opts: Record<string, unknown>): Promise<string>;
};
declare const prettierPlugins: Record<string, unknown>;

const api = {
  async format(code: string, parser: string): Promise<string> {
    try {
      return await prettier.format(code, {
        parser,
        plugins: Object.values(prettierPlugins),
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        tabWidth: 2,
      });
    } catch {
      return code; // Return original on error
    }
  },
};

Comlink.expose(api);
