import globals from 'globals'
import js from '@eslint/js'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {languageOptions: { globals: globals.browser }},
  {
    // ignores: ['**/*.{ts,tsx,cts,mts}'],
    ...js.configs.recommended,
    rules: {
      'max-lines': ['error', { max: 650, skipBlankLines: true, skipComments: true }],
      'jsx-quotes': ['error', 'prefer-double'] // 强制在 JSX 属性中一致使用双引号或单引号
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      // @ts-expect-error workaround until upstream update
      '@typescript-eslint': typescriptPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
      }
    },
    rules: {
      ...typescriptPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off', // 禁止不返回值的异步函数中有等待的 Promise
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn' // Require comment
    }
  },
]