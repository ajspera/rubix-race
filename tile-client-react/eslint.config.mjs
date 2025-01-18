import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['.next/*'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      'eqeqeq': 2,
      'semi': ['error', 'always'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-trailing-spaces': 2,
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/quotes': ['error', 'single']
    },
  }
];

export default eslintConfig;
