import react from 'eslint-plugin-react';
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['**/webpack.config.js', '**/node_modules/'],
  },
  {
    plugins: {
      react: fixupPluginRules(react),
    },

    linterOptions: {
      // noInlineConfig: true,
    },

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'no-use-before-define': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'arrow-body-style': 'error',
      'default-case': 'error',
    },
  },
];
