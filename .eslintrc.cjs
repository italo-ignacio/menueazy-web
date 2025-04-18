module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:all',
    'plugin:@typescript-eslint/all',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:eslint-comments/recommended',
    'plugin:eslint-plugin/all',
    'plugin:flowtype/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: './'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'flowtype',
    'import',
    'prettier',
    'react',
    'react-hooks',
    'sort-imports-es6-autofix',
    'sort-keys-fix',
    'unused-imports'
  ],
  rules: {
    /* Typescript Eslint - Default */
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    '@typescript-eslint/class-literal-property-style': 'error',
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/comma-spacing': 'error',
    '@typescript-eslint/consistent-generic-constructors': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/consistent-type-exports': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/default-param-last': 'error' /* Enforce default parameters to be last */,
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/init-declarations': 'error',
    '@typescript-eslint/keyword-spacing': 'error',
    '@typescript-eslint/lines-between-class-members': 'error',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/naming-convention': ['off'],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-meaningless-void-operator': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: true,
          attributes: false
        }
      }
    ],
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-restricted-imports': ['error', { patterns: ['../'] }],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        allowAliases: 'always',
        allowCallbacks: 'always',
        allowConditionalTypes: 'never',
        allowConstructors: 'never',
        allowGenerics: 'always',
        allowLiterals: 'always',
        allowMappedTypes: 'always',
        allowTupleTypes: 'never'
      }
    ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
    ],
    '@typescript-eslint/parameter-properties': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/prefer-return-this-type': 'off',
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true }
    ] /* Enforce the consistent use of either backticks, double, or single quotes */,
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/require-await':
      'error' /* This rule warns async functions which have no await expression. */,
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/space-before-blocks': 'error',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/space-infix-ops': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/typedef': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/unified-signatures': 'error',

    /* Comments - Default */
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',

    /* Eslint Plugin - Default */
    'eslint-plugin/prefer-message-ids': 'off',
    'eslint-plugin/require-meta-docs-description': 'off',
    'eslint-plugin/require-meta-docs-url': 'off',
    'eslint-plugin/require-meta-type': 'off',
    'eslint-plugin/require-meta-schema': 'off',

    /* Flowtype - Default */
    'flowtype/array-style-complex-type': 'error',
    'flowtype/array-style-simple-type': 'error',
    'flowtype/arrow-parens': 'off',
    'flowtype/boolean-style': ['error', 'boolean'],
    'flowtype/define-flow-type': 'off',
    'flowtype/delimiter-dangle': 'off',
    'flowtype/enforce-line-break': 'off',
    'flowtype/generic-spacing': 'off',
    'flowtype/interface-id-match': ['error', '^([A-Z][a-z0-9]+)+Type$'],
    'flowtype/no-dupe-keys': 'off',
    'flowtype/no-duplicate-type-union-intersection-members': [
      'error',
      { checkIntersections: true }
    ],
    'flowtype/no-mixed': 'error',
    'flowtype/no-mutable-array': 'off',
    'flowtype/no-primitive-constructor-types': 'error',
    'flowtype/no-types-missing-file-annotation': 'off',
    'flowtype/no-unused-expressions': 'off',
    'flowtype/no-weak-types': 'error',
    'flowtype/object-type-curly-spacing': 'off',
    'flowtype/object-type-delimiter': 'off',
    'flowtype/quotes': 'off',
    'flowtype/require-compound-type-alias': 'off',
    'flowtype/require-exact-type': ['error', 'always'],
    'flowtype/require-indexer-name': 'off',
    'flowtype/require-inexact-type': 'off',
    'flowtype/require-parameter-type': 'off',
    'flowtype/require-readonly-react-props': 'error',
    'flowtype/require-return-type': 'off',
    'flowtype/require-types-at-top': ['error', 'always'],
    'flowtype/require-valid-file-annotation': 'off',
    'flowtype/require-variable-type': 'off',
    'flowtype/semi': 'off',
    'flowtype/sort-keys': ['error', 'asc'],
    'flowtype/sort-type-union-intersection-members': [
      'error',
      {
        groupOrder: [
          'keyword',
          'named',
          'literal',
          'function',
          'object',
          'tuple',
          'intersection',
          'union',
          'nullish'
        ]
      }
    ],
    'flowtype/space-after-type-colon': ['error', 'always'],
    'flowtype/space-before-generic-bracket': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/spread-exact-type': 'off',
    'flowtype/type-id-match': ['error', '^([A-Z][a-z0-9]*)+Type$'],
    'flowtype/type-import-style': 'off',
    'flowtype/union-intersection-spacing': ['error', 'always'],
    'flowtype/use-flow-type': 'error',
    'flowtype/use-read-only-spread': 'off',
    'flowtype/valid-syntax': 'error',

    /* Import Plugin - Default */
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': 'off',
    'import/prefer-default-export': 'off',

    /* JSX - Default */
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',

    /* Prettier - Default */
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        printWidth: 100,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
      }
    ],

    /* React Hooks - Default */
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',

    /* React - Default */
    'eslint-plugin/prefer-object-rule': 'off',
    'react/boolean-prop-naming': 'off',
    'react/button-has-type': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/destructuring-assignment': ['error', 'always'],
    'react/display-name': ['error', { ignoreTranspilerName: false }],
    'react/forbid-component-props': 'off',
    'react/forbid-dom-props': 'off',
    'react/forbid-elements': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }
    ],
    'react/hook-use-state': ['error', { allowDestructuredState: false }],
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': 'off',
    'react/jsx-child-element-spacing': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'never', propElementValues: 'always', props: 'always' }
    ],
    'react/jsx-curly-newline': 'off',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-fragments': 'error',
    'react/jsx-handler-names': [
      'error',
      {
        checkInlineFunction: false,
        checkLocalVariables: false,
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on'
      }
    ],
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-key': ['error', { checkFragmentShorthand: false }],
    'react/jsx-max-depth': ['error', { max: 8 }],
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-newline': [
      'error',
      { allowMultilines: true, prevent: true }
    ] /* Require or prevent a new line after jsx elements and expressions */,
    'react/jsx-no-bind': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-leaked-render': 'error',
    'react/jsx-no-script-url': [
      'error',
      [
        { name: 'Link', props: ['to'] },
        { name: 'Foo', props: ['href', 'to'] }
      ]
    ],
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-pascal-case': [
      'error',
      { allowAllCaps: false, allowLeadingUnderscore: false, allowNamespace: false }
    ],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-props-no-spreading': 'error',
    'react/jsx-sort-default-props': 'off',
    'react/jsx-sort-props': ['error', { reservedFirst: ['key'] }],
    'react/jsx-space-before-closing': 'off',
    'react/jsx-tag-spacing': [
      'error',
      {
        afterOpening: 'never',
        beforeClosing: 'allow',
        beforeSelfClosing: 'always',
        closingSlash: 'never'
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        arrow: 'parens',
        assignment: 'parens',
        condition: 'ignore',
        declaration: 'parens',
        logical: 'ignore',
        prop: 'ignore',
        return: 'parens'
      }
    ],
    'react/no-access-state-in-setstate': 'error',
    'react/no-adjacent-inline-elements': 'error',
    'react/no-array-index-key': 'error',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'error' /* Disallow multiple component definition per file */,
    'react/no-namespace': 'error',
    'react/no-object-type-as-default-prop':
      'error' /* Disallow usage of referential-type variables as default param in functional component */,
    'react/no-redundant-should-component-update': 'error',
    'react/no-render-return-value': 'error',
    'react/no-set-state': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '"', "'", '}'] }],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/no-unresolved': 'off',
    'react/no-unsafe': 'error',
    'react/no-unstable-nested-components': 'off',
    'react/no-unused-class-component-methods': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-exact-props': 'error',
    'react/prefer-read-only-props': 'off',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/require-optimization': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/sort-comp': 'error',
    'react/sort-default-props': 'error',
    'react/sort-prop-types': 'error',
    'react/state-in-constructor': ['error', 'always'],
    'react/static-property-placement': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',

    /* Sort Imports - Default */
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],

    /* Sort Keys Fix - Default */
    'sort-keys-fix/sort-keys-fix': 'error',

    /* Unused Imports - Default */
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { args: 'after-used', caughtErrors: 'all', vars: 'all' }
    ],

    /* EsLint - Default */
    'accessor-pairs': 'off',
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': 'error',
    'array-callback-return': 'error',
    'array-element-newline': ['error', 'consistent'],
    'arrow-body-style': 'off', // ["error", "as-needed"]
    'arrow-parens': 'off',
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'brace-style': 'off',
    camelcase: 'error',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'comma-style': ['error', 'last'],
    complexity: ['error', 20],
    'computed-property-spacing': 'error',
    'consistent-return': 'error',
    'consistent-this': 'error',
    'constructor-super': 'error',
    curly: ['error', 'multi'],
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'off',
    'dot-location': ['error', 'property'],
    'dot-notation': 'off',
    'eol-last': 'error',
    eqeqeq: 'error',
    'for-direction': 'error',
    'func-call-spacing': 'off',
    'func-name-matching': 'error',
    'func-names': ['error', 'always'],
    'func-style': [
      'error',
      'expression'
    ] /* Enforce the consistent use of either function declarations or expressions */,
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': 'off',
    'generator-star-spacing': 'error',
    'getter-return': 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'id-denylist': ['error'] /* Disallow specified identifiers */,
    'id-length': ['off', { min: 2 }],
    'id-match': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'init-declarations': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'keyword-spacing': 'off',
    'line-comment-position': [
      'error',
      { position: 'above' }
    ] /* Enforce position of line comments */,
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': 'off',
    'lines-between-class-members': 'off',
    'logical-assignment-operators': ['error', 'always'],
    'max-classes-per-file': ['error', 1],
    'max-depth': ['error', 40],
    'max-len': [
      'error',
      100,
      {
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true
      }
    ],
    'max-lines': ['error', 5000],
    'max-lines-per-function': ['error', 5000],
    'max-nested-callbacks': ['error', 30],
    'max-params': ['error', 500],
    'max-statements': ['error', 200],
    'max-statements-per-line': ['error', { max: 1 }],
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': 'off',
    'no-alert': 'error',
    'no-array-constructor': 'off',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-confusing-arrow': 'off',
    'no-console': 'warn',
    'no-const-assign': 'error',
    'no-constant-binary-expression': 'error',
    'no-constant-condition': 'error',
    'no-constructor-return': 'error',
    'no-continue': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'off',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'off',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty': ['error', { allowEmptyCatch: false }],
    'no-empty-character-class': 'error',
    'no-empty-function': 'off',
    'no-empty-pattern': 'error',
    'no-empty-static-block': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'off',
    'no-extra-semi': 'off',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'off',
    'no-import-assign': 'error',
    'no-inline-comments': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'off',
    'no-loss-of-precision': 'off',
    'no-magic-numbers': 'off',
    'no-misleading-character-class': 'error',
    'no-mixed-operators': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': 'error' /* Disallow the unary operators ++ and -- */,
    'no-process-exit': 'off',
    'no-promise-executor-return': 'error',
    'no-proto': 'error',
    'no-prototype-builtins':
      'error' /* Disallow calling some Object.prototype methods directly on objects */,
    'no-redeclare': 'off',
    'no-regex-spaces': 'error',
    'no-restricted-exports': ['error', { restrictedNamedExports: [] }],
    'no-restricted-globals': [
      'error',
      { message: 'Use local parameter instead.', name: 'event' },
      { message: 'Do not commit fdescribe. Use describe instead.', name: 'fdescribe' }
    ],
    'no-restricted-imports': ['error', 'underscore'],
    'no-restricted-properties': [
      'error',
      { message: 'Use .slice instead of .substring.', property: 'substring' },
      { message: 'Use .slice instead of .substr.', property: 'substr' },
      {
        message: 'Use assert.strictEqual instead of assert.equal.',
        object: 'assert',
        property: 'equal'
      },
      {
        message: 'Use assert.notStrictEqual instead of assert.notEqual.',
        object: 'assert',
        property: 'notEqual'
      },
      {
        message: 'Use assert.deepStrictEqual instead of assert.deepEqual.',
        object: 'assert',
        property: 'deepEqual'
      },
      {
        message: 'Use assert.notDeepStrictEqual instead of assert.notDeepEqual.',
        object: 'assert',
        property: 'notDeepEqual'
      }
    ],
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-setter-return': 'error',
    'no-shadow': 'off',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-cycle': 'off',
    'no-this-before-super': 'error',
    'no-throw-literal': 'off',
    'no-trailing-spaces': 'error',
    'no-undef': ['error', { typeof: true }],
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-expressions': 'off',
    'no-unused-labels': 'error',
    'no-unused-private-class-members': 'error',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-backreference': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error' /* Require let or const instead of var */,
    'no-void': 'error',
    'no-warning-comments': 'error',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': ['error', { consistent: true, multiline: true }],
    'object-curly-spacing': 'off',
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
    'one-var': 'off',
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'operator-linebreak': 'off',
    'padded-blocks': 'off' /* Require or disallow padding within blocks */,
    'padding-line-between-statements': 'off',
    'prefer-arrow-callback': 'error',
    'prefer-const':
      'error' /* Require const declarations for variables that are never reassigned after declared */,
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: { array: true, object: false },
        VariableDeclarator: { array: false, object: true }
      },
      { enforceForRenamedProperties: false }
    ] /* Require destructuring from arrays and/or objects */,
    'prefer-exponentiation-operator': 'error',
    'prefer-named-capture-group': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-object-has-own': 'off',
    'prefer-object-spread':
      'error' /* Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead */,
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': 'error' /* Require quotes around object literal property names */,
    quotes: 'off',
    radix: 'error',
    'require-atomic-updates': ['error', { allowProperties: false }],
    'require-await': 'off' /* This rule warns async functions which have no await expression. */,
    'require-unicode-regexp': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': 'error',
    semi: 'off',
    'semi-spacing': ['error', { after: true, before: false }],
    'semi-style': 'error',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-vars': ['error', { ignoreCase: false }],
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'error',
    'space-infix-ops': 'off',
    'space-unary-ops': ['error', { nonwords: false, words: true }],
    'spaced-comment': ['error', 'always', { exceptions: ['-'] }],
    strict: ['error', 'global'],
    'switch-colon-spacing': 'error',
    'symbol-description': 'error',
    'template-curly-spacing': 'off',
    'template-tag-spacing': 'error',
    'unicode-bom': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'vars-on-top': 'error',
    'wrap-iife': 'error',
    'wrap-regex': 'off',
    'yield-star-spacing': 'error',
    yoda: ['error', 'never', { exceptRange: true }]
  },
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    {
      files: ['vite.config.ts', '.eslintrc.cjs', 'tailwind.config.cjs'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off'
      }
    },
    {
      files: ['**/*.d.{ts,tsx}'],
      rules: {
        'spaced-comment': 'off'
      }
    },
    {
      files: ['**/*.{enum,enums}.{ts,tsx}', '**/{enum,enums}/**/*.{ts,tsx}'],
      rules: { '@typescript-eslint/no-magic-numbers': 'off' }
    },
    {
      files: ['**/*.{spec,test}.{ts,tsx}', 'test/**/*'],
      rules: {
        'no-undef': 'off',
        'init-declarations': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/unbound-method': 'off'
      }
    },
    {
      files: ['**/*.{js,cjs}'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['src/@types/resources.d.ts'],
      rules: {
        'prettier/prettier': 'off',
        '@typescript-eslint/quotes': 'off'
      }
    },
    {
      files: [
        '**/{atomic-component,atomic-components}/{atoms,atom,molecules,molecule}/**/*.{ts,tsx}'
      ],
      rules: { 'react/jsx-props-no-spreading': 'off' }
    },
    {
      files: ['src/data/**/*.tsx'],
      rules: {
        'react/jsx-no-constructed-context-values': 'off'
      }
    },
    {
      files: ['src/store/**/*.ts'],
      rules: {
        'no-param-reassign': 'off'
      }
    }
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    },
    'import/ignore': ['express'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  ignorePatterns: [
    '*.log',
    '*.local',
    '*.config.js',
    '*.json',
    '**/migrations/*',
    '/build/**',
    '/coverage/**',
    '/dist/**',
    '/docs/**',
    '/logs/**',
    '/log/**',
    '/templates/**',
    '/tmp/**',
    '/node_modules'
  ]
};
