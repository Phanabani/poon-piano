module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    camelcase: 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'prettier/prettier': ['warn'],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
    'import/extensions': ['.ts', '.tsx'],
  },
};
