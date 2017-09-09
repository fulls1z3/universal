module.exports = {
  'rules': {
    'color-hex-case': 'lower', // auto-fix
    'color-hex-length': 'short', // auto-fix
    'color-named': ['never', {
      'ignore': ['inside-function']
    }],
    'color-no-hex': true,
    'color-no-invalid-hex': true,

    'font-family-name-quotes': 'always-where-required',
    //"font-weight-notation": "numeric", // smart-disable

    'function-calc-no-unspaced-operator': true,
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-newline-before': 'never-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'never-multi-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',

    'number-leading-zero': 'always', // auto-fix
    'number-max-precision': 2,

    'string-no-newline': true,
    'string-quotes': 'single', // auto-fix

    'length-zero-no-unit': true, // auto-fix

    //"time-no-imperceptible": true,

    'unit-case': 'lower',
    'unit-no-unknown': true,
    'unit-whitelist': ['%', 'px', 's'], // TODO use ignoreProperties

    'value-keyword-case': 'lower',
    'value-no-vendor-prefix': true,

    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,

    'custom-property-empty-line-before': ['always', {
      'except': ['after-custom-property', 'first-nested'],
      'ignore': ['after-comment', 'inside-single-line-block']
    }],

    'property-case': 'lower',
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,

    'keyframe-declaration-no-important': true,

    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-newline-after': 'always-multi-line',
    'declaration-colon-space-after': 'always', // auto-fix
    'declaration-colon-space-before': 'never', // auto-fix
    'declaration-empty-line-before': ['always', {
      'except': ['after-declaration', 'first-nested'],
      'ignore': ['after-comment', 'inside-single-line-block']
    }],
    'declaration-no-important': true,

    'declaration-block-no-duplicate-properties': [true, {
      'ignore': ['consecutive-duplicates-with-different-values']
    }],
    'declaration-block-no-ignored-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-properties-order': ['position', 'top', 'right', 'bottom', 'left', 'z-index', 'display', 'align-content', 'align-items', 'align-self', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'justify-content', 'order', 'float', 'width', 'height', 'max-width', 'max-height', 'min-width', 'min-height', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'margin-collapse', 'margin-top-collapse', 'margin-right-collapse', 'margin-bottom-collapse', 'margin-left-collapse', 'overflow', 'overflow-x', 'overflow-y', 'clip', 'clear', 'font', 'font-family', 'font-size', 'font-smoothing', 'osx-font-smoothing', 'font-style', 'font-weight', 'hyphens', 'src', 'line-height', 'letter-spacing', 'word-spacing', 'color', 'text-align', 'text-decoration', 'text-indent', 'text-overflow', 'text-rendering', 'text-size-adjust', 'text-shadow', 'text-transform', 'word-break', 'word-wrap', 'white-space', 'vertical-align', 'list-style', 'list-style-type', 'list-style-position', 'list-style-image', 'pointer-events', 'cursor', 'background', 'background-attachment', 'background-clip', 'background-color', 'background-image', 'background-position', 'background-repeat', 'background-size', 'border', 'border-collapse', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-color', 'border-image', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'border-spacing', 'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', 'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'border-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius', 'border-radius-topright', 'border-radius-bottomright', 'border-radius-bottomleft', 'border-radius-topleft', 'content', 'quotes', 'outline', 'outline-offset', 'outline-width', 'outline-style', 'outline-color', 'opacity', 'filter', 'visibility', 'size', 'zoom', 'transform', 'transform-origin', 'box-align', 'box-flex', 'box-orient', 'box-pack', 'box-shadow', 'box-sizing', 'table-layout', 'animation', 'animation-delay', 'animation-duration', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'animation-fill-mode', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'backface-visibility', 'resize', 'appearance', 'user-select', 'interpolation-mode', 'direction', 'marks', 'page', 'set-link-source', 'unicode-bidi', 'speak'], // auto-fix
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',

    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always', // auto-fix
    'block-closing-brace-newline-before': 'always-multi-line', // auto-fix
    //"block-closing-brace-space-after": "always-multi-line",
    'block-closing-brace-space-before': 'always-single-line',
    'block-no-empty': true,
    'block-no-single-line': true,
    'block-opening-brace-newline-after': 'always-multi-line', // auto-fix
    //"block-opening-brace-newline-before": "never-single-line", // auto-fix
    'block-opening-brace-space-after': 'always-single-line',//"always", // auto-fix
    'block-opening-brace-space-before': 'always', // auto-fix

    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always', // auto-fix
    'selector-combinator-space-before': 'always', // auto-fix
    'selector-descendant-combinator-no-non-space': true,
    //"selector-max-compound-selectors": 3, // TODO: enable prod
    //"selector-max-specificity": "0,2,0", // TODO: enable prod
    //"selector-nested-pattern": "^&:?:(hover|focus|(first|last|nth|only)-*(.+)|not|before|after)$", // TODO: enable prod
    'selector-no-empty': true,
    'selector-no-id': true,
    //"selector-no-qualifying-type": [true, {
    //	"ignore": ["attribute"]
    //}], // TODO: enable prod
    //"selector-no-type": [true, {
    //	"ignore": ["descendant"]
    //}], // TODO: enable prod
    'selector-no-universal': true,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-class-whitelist': ['hover', 'focus', 'not', '/^first-/', '/^last-/', '/^only-/', '/^nth-/'],
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'selector-root-no-composition': true,
    'selector-type-case': 'lower',
    'selector-type-no-unknown': true,
    'selector-max-empty-lines': 0,

    'selector-list-comma-newline-after': 'always', // auto-fix
    'selector-list-comma-space-before': 'never', // auto-fix

    'root-no-standard-properties': true,

    'rule-nested-empty-line-before': ['always-multi-line', {
      'except': ['first-nested'],
      'ignore': ['after-comment']
    }],
    'rule-non-nested-empty-line-before': ['always-multi-line', {
      'ignore': ['after-comment']
    }],

    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-no-missing-punctuation': true,
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-newline-before': 'never-multi-line',
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',

    'at-rule-empty-line-before': ['always', {
      'except': ['blockless-after-same-name-blockless', 'blockless-group', 'first-nested'],
      'ignore': ['after-comment'],
      'ignoreAtRules': ['extends', 'include']
    }], // auto-fix
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-name-space-after': 'always',
    'at-rule-no-vendor-prefix': true,
    'at-rule-semicolon-newline-after': 'always', // auto-fix

    'comment-empty-line-before': ['always', {
      'except': ['first-nested'],
      'ignore': ['stylelint-commands']
    }],
    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',

    'indentation': 2, // auto-fix

    'max-empty-lines': 1,
    'max-line-length': [130, {
      'ignore': 'non-comments'
    }],
    //"max-nesting-depth": [3, {
    //	"ignore": ["at-rules-without-declaration-blocks"]
    //}], // TODO: enable prod

    //"no-browser-hacks": true, // force-disable
    //"no-descending-specificity": true, // TODO: enable prod
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-eol-whitespace': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'no-missing-end-of-source-newline': true,
    'no-unknown-animations': true
  }
};
