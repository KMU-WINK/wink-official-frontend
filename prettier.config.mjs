export default {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  printWidth: 100,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react',
    '^next',

    '^@/app',
    '^@/component',
    '^@/context',
    '^@/store',
    '^@/hook',
    '^@/guard',
    '^@/api',
    '^@/style',
    '^@/util',
    '^@/',

    '^[./]',

    '<THIRD_PARTY_MODULES>',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
