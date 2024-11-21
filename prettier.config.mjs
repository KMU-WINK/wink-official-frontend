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

    '^@/.*?/(_constant)',
    '^@/.*?/(_component)',

    '^@/ui',
    '^@/layout',
    '^@/modal',
    '^@/api',
    '^@/guard',
    '^@/store',
    '^@/util',
    '^@/public',
    '^@/',

    '^[./]',

    '<THIRD_PARTY_MODULES>',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
