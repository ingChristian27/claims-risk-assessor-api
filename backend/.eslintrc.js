module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:prettier/recommended'],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js', 'lib/', 'node_modules/'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

