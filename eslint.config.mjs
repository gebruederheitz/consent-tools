// import {} from 'eslint';
import prettier from 'eslint-plugin-prettier';
import babel from '@babel/eslint-plugin';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    js.configs.recommended,
    prettierRecommended,
    {
        files: ['js/*.m?js', 'js/**/*.m?js'],
        ignores: ['dist/*', 'node_modules/*'],
        plugins: {
            prettier,
            '@babel': babel,
        },

        languageOptions: {
            parser: babelParser,
            ecmaVersion: 2021,
            sourceType: 'module',

            parserOptions: {
                babelOptions: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                window: true,
                console: true,
            },
        },
    },
    {
        rules: {
            indent: ['error', 4, { SwitchCase: 1 }],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'prettier/prettier': 'error',
        },
    },
];
