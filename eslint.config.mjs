import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    extends: [prettierRecommended],
    rules: prettierConfig.rules,
  },
);
