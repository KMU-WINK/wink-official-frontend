import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.js', '**/*.mjs', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended, prettierRecommended],
  rules: {
    ...prettierConfig.rules,
    'no-console': 'warn',
  },
});
