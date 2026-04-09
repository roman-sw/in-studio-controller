module.exports = {
    root: true,
    env:  {
        browser: true,
        es2021:  true,
        node:    true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: [
        'react-refresh'
    ],
    parser: '@typescript-eslint/parser',
    rules:  {
        'no-console':  'warn',
        'no-debugger': 'warn',
        'indent':      ['error', 4],
        'quotes':      ['error', 'single'],
        'semi':        ['error', 'always'],
        'key-spacing': [
            'error',
            {
                'align': 'value'
            }
        ],
        'react-refresh/only-export-components': [
            'warn',
            {
                allowConstantExport: true
            }
        ]
    },
    ignorePatterns: [
        'dist'
    ]
};
