import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            // No TS parser installed in this project yet.
            '**/*.{ts,tsx}',
        ],
    },
    {
        files: ['**/*.{js,jsx}'],
        ...js.configs.recommended,
        languageOptions: {
            ...js.configs.recommended.languageOptions,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-hooks/refs': 'off',
            'react-hooks/set-state-in-effect': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
]
