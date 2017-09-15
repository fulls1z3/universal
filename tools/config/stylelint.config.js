module.exports = {
  'extends': 'stylelint-config-standard',
  'rules': {
    /**
     * Possible errors
     */
    // selector
    'selector-type-no-unknown': false,
    // at-rule
    'at-rule-no-unknown': false,
    // general / sheet
    'max-nesting-depth': [
      2,
      {'ignore': ['blockless-at-rules']}
    ],
    'no-descending-specificity': true,
    'no-duplicate-selectors': true,
    'no-unknown-animations': true,

    /**
     * Limit language features
     */
    // colors
    'color-named': [
      'never',
      {'ignore': ['inside-function']}
    ],
    'color-no-hex': true,
    // number
    'number-max-precision': 3,
    // time
    'time-min-milliseconds': 100,
    // unit
    'unit-whitelist': [
      'em',
      'rem',
      '%',
      'px',
      's',
      'ms',
      'vw',
      'vh',
      'deg'
    ],
    // value
    'value-no-vendor-prefix': true,
    // property
    'property-no-vendor-prefix': true,
    // declaration
    'declaration-no-important': true,
    // selector
    'selector-max-class': 2,
    'selector-max-combinators': 2,
    'selector-max-compound-selectors': 3,
    'selector-max-specificity': '0,3,0',
    'selector-max-type': [
      2,
      {
        'ignore': [
          'child',
          'compounded',
          'descendant'
        ]
      }
    ],
    'selector-max-universal': 2,
    'selector-no-qualifying-type': [
      true,
      {'ignore': ['attribute']}
    ],
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-whitelist': [
      'active',
      'after',
      'before',
      'focus',
      'hover',
      'host',
      'not',
      '/^first-/',
      '/^last-/',
      '/^nth-/',
      '/^only-/'
    ],
    // media feature
    'media-feature-name-no-vendor-prefix': true,
    // at-rule
    'at-rule-no-vendor-prefix': true,

    /**
     * Stylistic issues
     */
    // font family
    'font-family-name-quotes': 'always-where-required',
    // font weight
    'font-weight-notation': [
      'named-where-possible',
      {'ignore': ['relative']}
    ],
    // function
    'function-parentheses-newline-inside': 'never-multi-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',
    // string
    'string-quotes': 'single',
    // selector
    'selector-attribute-quotes': 'always',
    // rule
    'rule-empty-line-before': [
      'always',
      {
        'except': [
          'after-single-line-comment',
          'inside-block-and-after-rule',
          'first-nested'
        ],
        'ignore': [
          'after-comment',
          'inside-block'
        ]
      }
    ],
    // at-rule
    'at-rule-empty-line-before': [
      'always',
      {
        'except': [
          'inside-block',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless',
          'first-nested'
        ],
        'ignore': [
          'after-comment',
          'inside-block',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless'
        ]
      }
    ],
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-semicolon-space-before': 'never',
    // general / sheet
    'max-line-length': [
      140,
      {'ignore': 'non-comments'}
    ]
  }
};
