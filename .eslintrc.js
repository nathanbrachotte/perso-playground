module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'standard-jsx',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
    'plugin:security/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['react', 'prettier', 'standard', 'jest'],
  rules: {
    'jest/no-focused-tests': 'error',
    'import/default': 2,
    'import/no-named-default': 'off',
    camelcase: 'off',
    'max-len': [
      'off',
      {
        code: 100,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prettier/prettier': 'error',
    'standard/no-callback-literal': 'off',
    'no-unexpected-multiline': 'off',
    'no-return-await': 'off',
    'node/no-deprecated-api': 'off',
    'new-cap': 'off',
    'lines-between-class-members': 'off',

    // React
    'react/jsx-handler-names': 'off',
    // TypeScript-specific
    'no-unused-vars': 'off',
    'import/export': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, typedefs: false }],
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    semi: [2, 'never'],
  },
}
