import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...nextConfig,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      // Auto-fixable unused import removal
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
