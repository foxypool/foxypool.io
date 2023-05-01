module.exports = {
  env: {
    browser: true,
  },
  root: true,
  reportUnusedDisableDirectives: true,
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: [
        '*.ts',
      ],
      parserOptions: {
        project: [
          'tsconfig.json'
        ],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates'
      ],
      rules: {
        '@angular-eslint/component-selector': [
          'error',
          {
            prefix: 'app',
            style: 'kebab-case',
            type: 'element'
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            prefix: 'app',
            style: 'camelCase',
            type: 'attribute'
          }
        ],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/prefer-readonly': 'error',
        'semi': ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      },
    },
    {
      files: [
        '*.html'
      ],
      extends: [
        'plugin:@angular-eslint/template/recommended'
      ],
      rules: {}
    }
  ]
}
