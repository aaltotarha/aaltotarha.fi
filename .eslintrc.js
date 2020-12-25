module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true },
        sourceType: 'module',
    },
    extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'prettier/react'],
    plugins: ['react-hooks', 'prettier'],
    rules: {
        'react/display-name': 0,
        'react/prop-types': 0,
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 1,
    },
    settings: { react: { version: 'detect' } },
}
