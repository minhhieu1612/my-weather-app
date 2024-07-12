import react from 'eslint-plugin-react';
import { fixupPluginRules, includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { ROOT_DIRECTORY } from './config.js';
import path from 'path';

const gitignorePath = path.resolve(ROOT_DIRECTORY, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
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
